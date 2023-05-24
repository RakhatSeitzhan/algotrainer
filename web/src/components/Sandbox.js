import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from 'react'
import db from '../firebase.js'
import { doc, setDoc, addDoc, collection, getDocs,updateDoc} from "firebase/firestore";
import { executeCode2 } from "../utils/executeCode.js"; 
export default function Sandbox(){
    const editorRef = useRef()
    const [testcases, setTestCases] = useState([])
    const [inputValues, setInputValues] = useState([''])
    const [argNames, setArgNames] = useState(['arg1'])
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [sections, setSections] = useState([])
    const [DBTags, setDBTags] = useState([])
    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor; 
    }
    useEffect(() => {
        const getDBTags = async () => {
            const query = await getDocs(collection(db,"tags"))
            setDBTags(query.docs.map(doc => ({id: doc.id, ...doc.data()})))
        }
        getDBTags()
        
    }, [])
    const changeInput = (e, index) => {
        let temp = [...inputValues]
        temp[index] = e.target.value
        setInputValues(temp)
    }
    const changeArgNames = (e, index) => {
        let temp = [...argNames]
        temp[index] = e.target.value
        setArgNames(temp)
    }
    const addTestCase = async() => {
        let a = {}
        argNames.forEach((arg, i) => a[arg] = inputValues[i])
        let t = {case: a}
        const solutionCode = editorRef.current.getValue()    
        const {result, logs, runtime, error} = await executeCode2(solutionCode, t, 10000)
        t = {...t, result: JSON.stringify(result)}
        if (error) new Error(error)
        console.log(t)
        setTestCases([...testcases, t])
        setInputValues(inputValues.map(i => ''))
    }
    const addSection = () => {
        setSections([...sections, {type: 'text', source: ''}])
    }
    const changeSectionType = (e, id) => {
        let temp = [...sections]
        temp[id].type = e.target.value
        setSections(temp)
    }
    const changeSectionSource = (e, id) => {
        let temp = [...sections]
        temp[id].source = e.target.value
        setSections(temp)
    }
    const onSectionEditorChange = (newVal, id) => { 
        let temp = [...sections]
        temp[id].source = newVal
        setSections(temp)
    }
    const exportProblem = async () => {
        let problemObj = {}
        console.log(testcases)
        problemObj.testcases = testcases
        problemObj.solution = editorRef.current.getValue()
        problemObj.description = description
        problemObj.tags = tags.split(',')
        problemObj.title = title
        problemObj.lowercaseTitle = title.replace(/\s/g,'').toLowerCase()
        problemObj.difficulty = Number(difficulty)
        problemObj.sections = sections
        console.log(problemObj)
        addDoc(collection(db, "problems"), problemObj);
        tags.split(',').forEach(tag => {
            let inDB = false
            for(var i = 0; i < DBTags.length; i++){
                if (DBTags[i].name == tag) {
                    inDB = true
                    updateDoc(doc(db, "tags", DBTags[i].id), {
                        numOfProblems: DBTags[i].numOfProblems + 1
                    });
                }
            }
            if (!inDB){
                addDoc(collection(db, "tags"), {name: tag, numOfProblems: 1});
            } 
        })
    }
    const updateTestCaseResults = async () => {
        const solutionCode = editorRef.current.getValue()   
        let newTestcases = [...testcases]
        for (var i = 0; i < testcases.length; i++){
            const {result, logs, runtime, error} = await executeCode2(solutionCode, testcases[i], 10000)
            if (error) new Error(error)
            newTestcases[i].result = JSON.stringify(result)
        }
        setTestCases(newTestcases)
    }
    const defaultCode = `function solve(){\n   let answer = []\n   return answer\n}`
    return (
        <div className="Sandbox">
            <Editor
                className='Editor'
                height="50vh"
                width="50vw"
                defaultLanguage="javascript"
                defaultValue={defaultCode}
                
                onMount={handleEditorDidMount}
            />
            <button onClick={exportProblem}>Export</button>
            <div>
                <div>Title</div>
                <input value={title} onChange = {e => setTitle(e.target.value)}></input>
            </div>
            <div>
                <div>Description</div>
                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <div>Tags</div>
                <div>Available tags:</div>
                <ul>
                    {DBTags.map(item => 
                    <li>{item.name}</li>
                    )}
                </ul>
                <input value={tags} onChange = {e => setTags(e.target.value)}></input>
            </div>
            <div>
                <div>Difficulty</div>
                <input value = {difficulty} type = 'number' onChange={e => setDifficulty(e.target.value)}></input>
            </div>
            <div>
                <div>Number of arguments: {inputValues.length}</div>
                <button onClick={e => setInputValues(inputValues.filter((item,index) => index != inputValues.length-1))}>-</button>
                <button onClick={e => setInputValues([...inputValues, ''])}>+</button>
            </div>
            <div>Testcases</div>
            {testcases.map((item, index) => 
            <div className="testcase">
                <div>Testcase {index+1}</div>
                <div>
                    {Object.keys(item.case).map(key=><div>{key} = {item.case[key]}</div>)}
                    <div>Result: {item.result}</div>
                </div>
            </div>
            )}
            {inputValues.map((value, index) => 
                <div>
                    <input value={value} onChange = {e => changeInput(e, index)}/>
                    <input value={argNames[index]} onChange = {e => changeArgNames(e, index)}/>
                </div>
            )}
            <button onClick={() => addTestCase()}>Add testcase</button>
            <button onClick={updateTestCaseResults}>Update testcase results</button>
            {sections.map((section, sectionId) => 
            <div>
                <select value={section.type} onChange = {e => changeSectionType(e, sectionId)}>
                    <option value='text'>Text</option>
                    <option value='code'>Code</option>
                    <option value='video'>Video</option>
                </select>
                {section.type == 'text' ? 
                <textarea value={section.source} onChange= {e => changeSectionSource(e, sectionId)}/>
                : section.type == 'code' ?
                <Editor
                    className='Editor'
                    height="20vh"
                    width="50vw"
                    defaultLanguage="javascript"
                    defaultValue='// write here your code...'
                    onChange={(newVal, e) => onSectionEditorChange(newVal, sectionId)}
                />
                : section.type == 'video' &&
                <input placeholder="Insert url" value={section.source} onChange= {e => changeSectionSource(e, sectionId)}/>
                }
                
            </div>
            )}
            <button onClick={addSection}>Add explanation section</button>
        </div>
    )
}

import Editor from "@monaco-editor/react";
import { useRef, useState } from 'react'
import db from '../firebase.js'
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
export default function Sandbox(){
    const editorRef = useRef()
    const [testcases, setTestCases] = useState([])
    const [inputValues, setInputValues] = useState([''])
    const [argNames, setArgNames] = useState(['arg1'])
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [title, setTitle] = useState('')
    const [difficulty, setDifficulty] = useState('')
    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor; 
    }
    const runCode = () => {
        const mainCode = editorRef.current.getValue()
        const mainCodeFunction = new Function(`return ${mainCode}`)();
        setTestCases(testcases.map(item => {
            // arguments are passed to the function in the order of argNames
            // const argsToPass = argNames.map(arg => JSON.parse(item.case[arg]))
            // return {...item, result: JSON.stringify(mainCodeFunction(...argsToPass))}
            return {...item, result: mainCodeFunction(...Object.keys(item.case).map(i => item.case[i]))}
        }))
    }
    const normalizeTestCases = (ts) => {
        let res = [...ts]
        res.map(t=> {
            // check if a testcase has nested object: example: [[],[]]
            // "normalize" it to the following form to store in firebase: [{0: []},{1:[]}]
            // make an inverse normalizer fucnction


            // or alternative solution would be to store stringified testcases 
            return 
        })
        return 
    }
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
    const addTestCase = () => {
        let a = {}
        argNames.forEach((arg, i) => a[arg] = inputValues[i])
        const t = {case: a}
        setTestCases([...testcases, t])
        setInputValues(inputValues.map(i => ''))
    }
    const exportProblem = () => {
        let problemObj = {}
        console.log(testcases)
        problemObj.testcases = testcases
        problemObj.solution = editorRef.current.getValue()
        problemObj.description = description
        problemObj.tags = tags.split(',')
        problemObj.title = title
        problemObj.difficulty = Number(difficulty)
        console.log(problemObj)
        addDoc(collection(db, "problems"), problemObj);
    }
    return (
        <div className="Sandbox">
            <Editor
                className='Editor'
                height="50vh"
                width="50vw"
                defaultLanguage="javascript"
                defaultValue="// write a code "
                
                onMount={handleEditorDidMount}
            />
            <button onClick={runCode}>Run test cases</button>
            <button onClick={exportProblem}>Export</button>
            <button onClick={e => setInputValues(inputValues.filter((item,index) => index != inputValues.length-1))}>-</button>
            <button onClick={e => setInputValues([...inputValues, ''])}>+</button>
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
                <input value={tags} onChange = {e => setTags(e.target.value)}></input>
            </div>
            <div>
                <div>Difficulty</div>
                <input value = {difficulty} type = 'number' onChange={e => setDifficulty(e.target.value)}></input>
            </div>
            <div>
                <div>Number of arguments</div>
                <input type="number" value = {inputValues.length} onChange = {e => setInputValues([...inputValues, ''])}/>
            </div>
            <div>Current testcases</div>
            {testcases.map(item => 
            <div className="testcase">
                {Object.keys(item.case).map(key=><>{item.case[key]}</>)}
            </div>
            )}
            {inputValues.map((value, index) => 
                <div>
                    <input value={value} onChange = {e => changeInput(e, index)}/>
                    <input value={argNames[index]} onChange = {e => changeArgNames(e, index)}/>
                </div>
            )}
            <button onClick={() => addTestCase()}>Add testcase</button>
        </div>
    )
}

function generateTestcase(pattern){
    // a testcase: {case: {arg1: *, arg2: *, arg3: *}, result: *}
    // patterm: [{argName: String, argType: *}]
    // a pattern: {name: str, type: list, obj}
    // basecases: number, string
    // instructionsType: random, a set, a repetetive set
    // instructions: {type: str, set: []}

    switch (pattern.type){
        case "list":

            break;
    }
}

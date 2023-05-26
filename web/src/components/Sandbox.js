import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from 'react'
import db from '../firebase.js'
import { doc,getDoc, setDoc,deleteDoc, addDoc, collection, getDocs,updateDoc} from "firebase/firestore";
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
    const setConvertedProblem = () => {
        const res = convertStringToProblem(prob1)
        console.log(res.testcases)
        setTitle(res.title)
        setSections(res.sections)
        setDescription(res.description)
        setTags(res.tags.join(','))
        const args = Object.keys(res.testcases[0].case)
        setArgNames(args)
        setInputValues(args.map(i => ''))
        setTestCases(res.testcases)
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
    const [problemid, setProblemid] = useState('')
    const defaultCode = `function solve(){\n   let answer = []\n   return answer\n}`
    return (
        <div className="Sandbox">
            <input onChange={e => setProblemid(e.target.value)} value = {problemid}></input>
            <button onClick={() => deleteProblem(problemid, DBTags)}>Delete problem</button>
            <Editor
                className='Editor'
                height="50vh"
                width="50vw"
                defaultLanguage="javascript"
                defaultValue={defaultCode}
                onMount={handleEditorDidMount}
            />
            <button onClick={exportProblem}>Export</button>
            <button onClick={setConvertedProblem}>Convert string problem</button>
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
                    <div>Result: {item?.result}</div>
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
                    value={sections[sectionId].source}
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

function convertStringToProblem  (str) {
    const title = str.split('#title\n')[1].replace('\n','')
    const description = str.split('#description\n')[1]
    const tags = str.split('#tags\n')[1].replace('\n','').split(',')
    const testcases = extractTestCases(str)
    const sections = extractSections(str)
    return {title,description,tags,testcases,sections}
}
function extractTestCases(str){
    let res = str.split('#testcases\n')[1].replace(/\s/g,'')
    res = res.split('#testcase').reduce((res, cur, index) => index%2 != 0 ? [...res, cur] : res,[])
    return res.map(item => {
        let a = {}
        const vars = item.split(';')
        vars.forEach(v => {
            const [name, value] = v.split('=')
            if (name != '')
            a[name] = value
        })
        return {case: a}
    })
}
function extractSections (str){
    let res = str.split('#sections\n')[1]
    res = res.split('#section').reduce((res, cur, index) => index%2 != 0 ? [...res, cur] : res,[])
    res = res.map(item => {
        let a = {}
        const [type, source] = item.split(';\n')
        a.type = type.replace(/\s/g,'')
        a.source = source
        return a
    })
    return res
}
async function deleteProblem (problemid, DBTags){
    const docSnap = await getDoc(doc(db, 'problems', problemid))
    if (docSnap.exists()){
        const problem = docSnap.data()
        problem.tags.forEach(tag => {
            const res = DBTags.find(item => item.name == tag)
            if (res){
                updateDoc(doc(db, "tags", res.id), {
                    numOfProblems: res.numOfProblems - 1
                });
            }else {
                console.error('No tag with such name was found in DBTags list!')
            }
        })
        deleteDoc(doc(db, 'problems', problemid))
    } else {
        console.error('There is no such document in the database!')
    }
    
    // deleteDoc(doc(db, 'problems', problemid))
    // updateDoc(doc(db, "tags", DBTags[i].id), {
    //     numOfProblems: DBTags[i].numOfProblems + 1
    // });
}
const prob1 = `
#title
Reachable cities
#title
#description
Imagine a network of cities connected with undirected roads given as 
an array of city names and connections. “cityNames” array consists of 
all the cities, whereas “cons” list stores all the connections between 
cities in the following format: 'city1-city2'. Write a function that 
determines whether it is possible to get from city A to city B with 
the given network of roads.
#description
#tags
search,graph,path
#tags
#testcases
#testcase
cityNames = ['Almaty', 'Astana', 'Shymkent', 'Tashkent','Balqash','Taldykorgan', 'Sidney'];
cons = ['Almaty-Taldykorgan','Taldykorgan-Astana', 'Almaty-Shymkent','Taldykorgan-Balqash','Shymkent-Tashkent'];
start = 'Almaty';
dest = 'Astana';
#testcase
#testcase
cityNames = ['Almaty', 'Astana', 'Shymkent', 'Tashkent','Balqash','Taldykorgan', 'Sidney'];
cons = ['Almaty-Taldykorgan','Taldykorgan-Astana', 'Almaty-Shymkent','Taldykorgan-Balqash','Shymkent-Tashkent'];
start = 'Almaty';
dest = 'Sidney';
#testcase
#testcase
cityNames = ['Almaty', 'Astana', 'Shymkent', 'Tashkent','Balqash','Taldykorgan', 'Sidney'];
cons = ['Almaty-Taldykorgan','Taldykorgan-Astana', 'Almaty-Shymkent','Taldykorgan-Balqash','Shymkent-Tashkent'];
start = 'Taldykorgan';
dest = 'Tashkent';
#testcase
#testcase
cityNames = ['Almaty', 'Astana', 'Shymkent', 'Tashkent','Balqash','Taldykorgan', 'Sidney'];
cons = ['Almaty-Taldykorgan','Taldykorgan-Astana', 'Almaty-Shymkent','Taldykorgan-Balqash','Shymkent-Tashkent'];
start = 'Shymkent';
dest = 'Astana';
#testcase
#testcases
#sections
#section
text;
This problem can be solved in various ways, and in this solution, we utilize the Breadth-First Search (BFS) algorithm. For a better understanding of the solution, we recommend watching the following video: [link]
#section

#section
video;
https://www.youtube.com/embed/xlVX7dXLS64
#section

#section
text;
To represent a city, we create a city object with name and connections attributes, enabling us to keep track of connections between cities. 
#section

#section
code;
class City {
    constructor(name){
        this.connections = []
        this.name = name
    }
}
#section

#section
text;
We initialize a cities library, which stores all the city objects by their name attributes. Each string in the citiesName list is converted into a city instance and stored in the cities library.
#section

#section
code;
let cities = {}
cityNames.forEach(city => cities[city] = new City(city))
#section

#section
text;
Next, we establish connections for each city by iterating through the items in the cons list. By using the split function on the 'city1-city2' format, we extract the individual city names using array destructuring.
#section

#section
code;
cons.forEach(item => {
    const [city1, city2] = item.split('-')
    cities[city1].connections.push(city2)
    cities[city2].connections.push(city1)
})
#section

#section
text;
With the completion of the cities library, we proceed to solve the problem. Two lists are defined: "visited" and "stack." The "visited" list accumulates the cities that the algorithm has checked, while the "stack" list holds city instances to be visited in the next iteration.
#section

#section 
code;
let stack = [cities[start]]
let visited = []
#section

#section
text;
The city with the name stored in the start variable becomes the first element of the stack array, allowing the following code to be executed.
#section

#section
text;
To traverse through all the cities, a while loop is utilized, terminating when there are no cities left to visit (i.e., the length of the stack list is 0). In each iteration, the first element in the stack array becomes the current city. If the current city matches the destination city, the loop is terminated. Otherwise, the current city is appended to the "visited" list and removed from the "stack" list. The final step involves adding all the cities connected to the current city to the stack array. It's important to note that if a city is already in the visited list, it should not be added to the stack list.
#section

#section
code;
while(stack.length > 0){
    const current = stack[0]
    if (current.name == dest) return true
    visited.push(current.name)
    current.connections.forEach(item => {
        if (visited.indexOf(item) == -1) stack.push(cities[item])
    })
    stack.shift()
}
return false
#section

#section
text;
If the loop is terminated and the destination is not found, the function returns false.
#section
#sections
`
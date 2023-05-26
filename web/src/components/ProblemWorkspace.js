import { useParams } from "react-router-dom";
import db from '../firebase.js'
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from 'react'
import "../styles/ProblemWorkspace.css"
import { BsFillSendFill, BsFillPlayFill, BsGear ,BsArrowClockwise } from 'react-icons/bs'
import ProblemDescription from "./ProblemDescription.js";
import CarouselComponent from "./CarouselComponent.js";
import Solution from "./Solution.js";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import TestcaseEditor from "./TestcaseEditor.js";
import Skeleton from "react-loading-skeleton";
import { executeCode, executeCode2 } from "../utils/executeCode.js";
import RunResult from "./RunResult.js";
import CustomEditor from "./CustomEditor.js";
import Submission from "./Submission.js";
export default function ProblemWorkspace(){
    const editorRef = useRef();
    const monacoRef = useRef();
    const { problemid } = useParams();
    const [runResult, setRunResult] = useState('')
    const [submissionResult, setSubmissionResult] = useState([])
    const [problem, setProblem] = useState()
    const [ executingCode, setExecutingCode] = useState(false)
    const [ customTestcase, setCustomTestcase ] = useState()
    const runTimeLimit = 1000 // ms
    
    async function requestProblem (){
        const docRef = doc(db, "problems", problemid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const problemData = docSnap.data()
            setProblem(problemData)
            setCustomTestcase(structuredClone(problemData.testcases[0]) )
            const data = getLocalStorageData()
            const newDefaultCode = `function solve(${Object.keys(problemData.testcases[0].case).sort().join(', ')}){\n   let answer = []\n   return answer\n}`
            setDefaultCode(newDefaultCode)
            if (data) editorRef.current.setValue(data.code)
            else {
                editorRef.current.setValue(newDefaultCode)
            }
        } else {
            console.log("No such document! You should have been redirected to problems page!");
        }
    }
   
    useEffect(() => {
        requestProblem()
    },[])
    const [defaultCode, setDefaultCode] = useState(`function solve(){\n   let answer = []\n   return answer\n}`)
 
    const handleRun = async () => {
        setExecutingCode(true)
        const editorCode =  editorRef.current.getValue()
        let tempRunResult = {}
        const validSolution = await executeCode2(problem.solution, customTestcase, runTimeLimit)
        const output = await executeCode2(editorCode ,customTestcase, runTimeLimit)
        const state =  output.error ? 'error' : JSON.stringify(output.result) == JSON.stringify(validSolution.result) ? 'correct' : 'incorrect'
        const logs = output.error ? [...output.logs, output.error] : output.logs
        tempRunResult = {state: state, result: output.result, logs: logs, runtime: output.runtime,error: output.error, validSolution: validSolution}
        setExecutingCode(false)
        setRunResult(tempRunResult)
        setCarouselState(1)
        saveCodeToLocalStorage('unsolved')
    }
    const handleSubmit2 = async () => {
        let submissions = problem.testcases.map(() => ({isExecuting: false, status: 'none', runtime: undefined}))
        setSubmissionResult([...submissions]) 
        let passedAllTestcases = true
        const editorCode =  editorRef.current.getValue()
        for(var i = 0; i < problem.testcases.length; i++){
            const testcase = problem.testcases[i]
            submissions[i].isExecuting = true
            setSubmissionResult([...submissions])
            const {result, logs, runtime, error} = await executeCode2(editorCode, testcase, 10000)
            const status = !error ? JSON.stringify(result) == testcase.result ? 'correct' : 'incorrect' : 'error' 
            if (status != 'correct') passedAllTestcases = false
            submissions[i] = {runtime, error, logs, status, logs, isExecuting: false}
            setSubmissionResult([...submissions])
        }
        if (passedAllTestcases) problemSolved()
        setCarouselState(2)
    }
    const getLocalStorageData = () => {
        return JSON.parse(localStorage.getItem(problemid))
    }
    const saveCodeToLocalStorage = (status) => {
        localStorage.setItem(problemid, JSON.stringify({status: status, code: editorRef.current.getValue()}))
    }
    const deleteFromLocalStorage = () => {
        localStorage.removeItem(problemid);
    }
    const problemSolved = () => {
        saveCodeToLocalStorage('solved')
    }
    const reset = () => {
        editorRef.current.setValue(defaultCode)
        deleteFromLocalStorage()
    }
    const [carouselState, setCarouselState ]= useState(0)
    return (
    <div className="ProblemWorkspace">
        <div className="ProblemWorkspace__container1">
            <CarouselComponent>
                <div>
                    <div>Description</div>
                    <div><ProblemDescription problem={problem}/></div>
                </div>
                <div>
                    <div>Solution</div>
                    <div><Solution problem={problem}/></div>
                </div>
            </CarouselComponent>
        </div>
        <div className="ProblemWorkspace__container2">
            <div className="ProblemWorkspace__nav2">
                <div className="ProblemWorkspace__nav2Item" onClick={reset} data-tooltip-id = '1' data-tooltip-content="Reset">
                    <BsArrowClockwise size={14} strokeWidth={0.5}/>
                    <Tooltip id="1" />
                </div>
                <div className="ProblemWorkspace__nav2Item" data-tooltip-id = '2'  data-tooltip-content="Options">
                    <BsGear size={14} strokeWidth={0.5}/>
                    <Tooltip id="2"/>
                </div>
            </div>
            <div>
                <CustomEditor editorRef = {editorRef} monacoRef = {monacoRef}/>
                <div className="ProblemWorkspace__buttons">
                    <button className="CustomButton-1" onClick={handleRun}><BsFillPlayFill size = {18}/> Run</button>
                    <button className="CustomButton-2" onClick={handleSubmit2}><BsFillSendFill size = {12}/> Submit</button>
                </div>
            </div>
            <CarouselComponent state = {carouselState} setState = {setCarouselState}>
                <div>
                    <div>Testcase</div>
                    <div>{customTestcase && <TestcaseEditor value = {customTestcase} setValue = {setCustomTestcase} problem={problem} /> || <Skeleton count={2} style={{marginLeft: '1.5rem', marginTop:'1rem'}} borderRadius='0.5rem' width='10rem' height = '2rem'/>}</div>
                </div>
                <div>
                    <div>Result</div>
                    <div><RunResult runResult={runResult} executingCode = {executingCode}/></div>
                </div>
                <div>
                    <div>Submission</div>
                    <div><Submission submissionResult = {submissionResult}/></div>
                </div>
            </CarouselComponent>
        </div>
    </div>)
}
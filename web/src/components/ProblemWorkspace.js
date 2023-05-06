import { useParams } from "react-router-dom";
import db from '../firebase.js'
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from 'react'
import Editor from "@monaco-editor/react";
import "../styles/ProblemWorkspace.css"
import { BsFillSendFill, BsFillPlayFill, BsGear ,BsArrowClockwise } from 'react-icons/bs'
import ProblemDescription from "./ProblemDescription.js";
import CarouselComponent from "./CarouselComponent.js";
import Solution from "./Solution.js";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import TestcaseEditor from "./TestcaseEditor.js";
import CodeDisplay from "./CodeDisplay.js";
import Skeleton from "react-loading-skeleton";
import { RotatingLines } from 'react-loader-spinner'

export default function ProblemWorkspace(){
    const editorRef = useRef();
    const monacoRef = useRef();
    const { problemid } = useParams();
    const [runResult, setRunResult] = useState('')
    const [problem, setProblem] = useState()
    const [consoleLogs, setConsoleLogs] = useState([])
    const [ executingCode, setExecutingCode] = useState(false)
    const [ customTestcase, setCustomTestcase ] = useState()
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
        monacoRef.current = monaco
    }
    async function requestProblem (){
        const docRef = doc(db, "problems", problemid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const problemData = docSnap.data()
            setProblem(problemData)
            
            editorRef.current.setValue(`function solve(${Object.keys(problemData.testcases[0].case).join(', ')}){\n   let answer = []\n   return answer\n}`)
            // testcaseEditorRef.current.setValue(Object.keys(problemData.testcases[0].case).map(key => problemData.testcases[0].case[key]).join('; \n'))
          
            setCustomTestcase(structuredClone(problemData.testcases[0]) )
        } else {
            console.log("No such document! You should have been redirected to problems page!");
        }
    }
   
    useEffect(() => {
        requestProblem()
    },[])
   
    const editorOptions = {
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        autoIndent: true,
        formatOnPaste: true,
        formatOnType: true,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: {
            vertical: 'hidden'
        },
        overviewRulerBorder: false,
    }
    const defaultCode = `function solve(){\n   let answer = []\n   return answer\n}`
    const bl = getComputedStyle(document.documentElement).getPropertyValue('--bl').slice(1);
    const gray = getComputedStyle(document.documentElement).getPropertyValue('--gray-t1').slice(1);
    const purdark = getComputedStyle(document.documentElement).getPropertyValue('--pur-dark').slice(1);
    const handleWillMount = (monaco) => {
        monaco.editor.defineTheme('custom-theme', {
          base: 'vs', 
          inherit: true, 
          rules: [
            { token: 'keyword', foreground: purdark },
            { token: 'number', foreground: bl }
          ],
          colors: {
            'editorLineNumber.foreground': bl,
          }
        });
    }
    const handleRun = () => {
        setExecutingCode(true)
        executeCode(customTestcase).then(result => {
            setExecutingCode(false)
            setRunResult(result.result)
            setConsoleLogs(result.logs)
        }).catch(err => {
            setExecutingCode(false)
            setConsoleLogs([err.message])
        }) 
        
    }
    const getValidSolution = () => {
        problem.solution
        customTestcase
    }
    function runInSeparateThread(fn, timeLimit) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(URL.createObjectURL(new Blob([`
                const fn = ${fn.toString()};
                let result;
                let environmentLogs = []
                const customConsole = {
                    log: (msg) => environmentLogs.push(msg)
                }
                try {
                result = {result: fn(customConsole), logs: environmentLogs};
                self.postMessage({ type: 'result', result });
                } catch (error) {
                self.postMessage({ type: 'error', error: error.message });
                }
            `], { type: 'text/javascript' })));
      
            const timeout = setTimeout(() => {
                worker.terminate();
                reject(new Error(`Function exceeded time limit of ${timeLimit}ms`));
            }, timeLimit);
        
            worker.onmessage = (event) => {
                if (event.data.type === 'result') {
                    clearTimeout(timeout);
                    resolve(event.data.result);
                } else if (event.data.type === 'error') {
                    clearTimeout(timeout);
                    reject(new Error(event.data.error));
                }
            };
        });
      }
    const executeCode = (testcase) => {
        const mainCode = editorRef.current.getValue()
        const runTimeLimit = 1000 // ms
        const args = Object.keys(testcase.case).map(key => testcase.case[key])
        const mainCodeFunction = Function('console', mainCode + `return solve(${args.join(', ')});`)
        return runInSeparateThread(mainCodeFunction, runTimeLimit)
    }
    const handleSubmit = async () => {
        let environmentLogs = []
        const customConsole = {
            log: (msg) => environmentLogs.push(msg)
        }
        let testInfo = []
        for (const i of problem.testcases){
            const argsArr = Object.keys(i.case).map(key => i.case[key])
            const mainCode = editorRef.current.getValue() + `return solve(${argsArr.join(', ')});`
            const mainCodeFunction = Function('console', mainCode)
            
            const startTime = performance.now()
            let passed = false
            try {
                const res = await mainCodeFunction(customConsole)
                passed = JSON.stringify(res) == i.result
            } catch(err) {
                console.log(err)
            }
            const endTime = performance.now()
            const runtime = endTime - startTime
            testInfo.push({passed: passed, runtime: Math.round(runtime*10)/10})
        }
        setCarouselState(1)
        const avgRuntime = testInfo.reduce((count, current) => count + current.runtime,0) / testInfo.length
        const numOfPassed = testInfo.reduce((count, current) => current.passed ? count + 1 : count,0) 
        setRunResult({avgRuntime, numOfPassed})
    }
    
    const reset = () => {
        editorRef.current.setValue(defaultCode)
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
            <div>
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
                    <Editor
                        className='ProblemWorkspace__editor'
                        height="50vh"
                        width="100%"
                        defaultLanguage="javascript"
                        defaultValue={defaultCode}
                        onMount={handleEditorDidMount}
                        beforeMount={handleWillMount}
                        options = {editorOptions}
                        theme = 'custom-theme'
                    />
                    <div className="ProblemWorkspace__buttons">
                        <button className="CustomButton-1" onClick={handleRun}><BsFillPlayFill size = {18}/> Run</button>
                        <button className="CustomButton-2" onClick={handleSubmit}><BsFillSendFill size = {12}/> Submit</button>
                    </div>
                </div>
            </div>
            <CarouselComponent state = {carouselState} setState = {setCarouselState}>
                <div>
                    <div>Testcase</div>
                    <div>{customTestcase && <TestcaseEditor value = {customTestcase} setValue = {setCustomTestcase} problem={problem} /> || <Skeleton count={2} style={{marginLeft: '1.5rem', marginTop:'1rem'}} borderRadius='0.5rem' width='10rem' height = '2rem'/>}</div>
                </div>
                <div>
                    <div>Result</div>
                    <div>
                        {executingCode && 
                        <div>
                            <RotatingLines
                                strokeColor={gray}
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="96"
                                visible={true}
                            />
                        </div>}
                        <div>Output</div>
                        <div style={{backgroundColor: gray, borderRadius: '0.5rem', margin: '1rem 1.5rem', padding: '1rem'}}>
                            <CodeDisplay code = {JSON.stringify(runResult)}/>
                        </div>
                        {/* <div>Expected</div>
                        <div style={{backgroundColor: gray, borderRadius: '0.5rem', margin: '1rem 1.5rem', padding: '1rem'}}>
                            <CodeDisplay code = {customTestcase.result}/>
                        </div> */}
                        {consoleLogs && consoleLogs.length >0 &&
                            <div>
                                <div style={{margin: '1rem 1.5rem 0 1.5rem'}}>Console</div>
                                <div style={{backgroundColor: gray, borderRadius: '0.5rem', margin: '1rem 1.5rem', padding: '1rem'}}>
                                <CodeDisplay code ={consoleLogs.map(i => typeof i != 'string' ? JSON.stringify(i) : i).join('\n')}/>
                                </div>
                            </div>
                     }
                    </div>
                </div>
            </CarouselComponent>
        </div>
    </div>)
}
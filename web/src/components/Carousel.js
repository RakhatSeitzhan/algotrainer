import { useState } from "react"
import StaticMonaco from "./StaticMonaco"
import Editor from "@monaco-editor/react"
import Console from "./Console"
import CodeDisplay from "./CodeDisplay"

import TestcaseEditor from "./TestcaseEditor"
export default function Carousel({state, setState, editorRef, consoleLogs, runResult, problem }){
    
    const testcaseEditorOptions = {
        scrollbar: {
            vertical: 'hidden'
        },
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        minimap: { enabled: false },
        renderLineHighlight: 'none',
        lineNumbers: 'off',
    }
    
    const testcaseEditorValue = problem && Object.keys(problem.testcases[0].case).map(key => key + ' = ' + problem.testcases[0].case[key]).join('\n')
    
    return( 
    <div className="Carousel">
        <div className="CarouselNav">
            <div className={`CarouselNav__item ${state == 0 && 'CarouselNav__selected'}`} onClick={() => setState(0)}>
                Testcase
            </div>
            <div className={`CarouselNav__item ${state == 1 && 'CarouselNav__selected'}`} onClick={() => setState(1)}>
                Result
            </div>
        </div>
        <div className="Carousel">
            { state == 0 &&
            <div className="Carousel__item">
                <Editor
                    height="10vh"
                    width="100%"
                    defaultLanguage="javascript"
                    onMount={(editor) => editorRef.current = editor}
                    options = {testcaseEditorOptions}
                    theme = 'custom-theme'
                    value={testcaseEditorValue}
                />
                {problem && <TestcaseEditor problem={problem} />}
            </div>}
            { state == 1 &&
            <div className="Carousel__item" style ={{paddingLeft: '26px'}}>

                <CodeDisplay code = {JSON.stringify(runResult)}/>
                {consoleLogs && <CodeDisplay code ={consoleLogs.map(i => typeof i != 'string' ? JSON.stringify(i) : i).join('\n')}/>}
            </div>}
        </div>
    </div>)
}
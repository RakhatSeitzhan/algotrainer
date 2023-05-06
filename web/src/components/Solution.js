import "../styles/Solution.css"
// import CodeDisplay from "./CodeDisplay"
import Editor from "@monaco-editor/react";

export default function Solution({ problem }){
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
    return (
    <div className="Solution">
        {problem.solution &&
            <Editor
            className='ProblemWorkspace__editor'
            height="50vh"
            width="100%"
            defaultLanguage="javascript"
            value={problem.solution}
            // defaultValue={defaultCode}
            // onMount={handleEditorDidMount}
            options = {editorOptions}
        />}
        
        {/* <div style={customStyle}>Example text asdf;kasjdfklja;lskdjf</div> */}
        {/* {problem && <CodeHighlighter codeString = {problem.solution}/>} */}
    </div>)
}
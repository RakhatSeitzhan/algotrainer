import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function Console({ logs }){
    const editorRef = useRef()
    const options = {
        lineNumbers: 'off',
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        minimap: { enabled: false },
        renderLineHighlight: 'none',
    } 
    const onEditorMount = (editor, monaco) => {
        editorRef.current = editor
    }
    return (
        <div className="Console">
            <div>Console</div>
            <Editor
                height="10vh"
                width="100%"
                defaultLanguage="javascript"
                onMount={onEditorMount}
                options = {options}
                value = {logs.map(i => typeof i != 'string' ? JSON.stringify(i) : i).join('\n')}
                // theme = 'custom-theme'
            />
        </div>
    )
}
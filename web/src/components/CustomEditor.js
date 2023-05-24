import Editor from "@monaco-editor/react";
export default function CustomEditor({ editorRef, monacoRef}){
    
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
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
        monacoRef.current = monaco
    }
    const defaultCode = `function solve(){\n   let answer = []\n   return answer\n}`
    const bl = getComputedStyle(document.documentElement).getPropertyValue('--bl');
    const purdark = getComputedStyle(document.documentElement).getPropertyValue('--pur-dark');
    const handleWillMount = (monaco) => {
        monaco.editor.defineTheme('custom-theme', {
          base: 'vs', inherit: true, 
          rules: [
            { token: 'keyword', foreground: purdark },
            { token: 'number', foreground: bl }
          ],
          colors: {
            'editorLineNumber.foreground': bl,
          }
        });
    }
    return <Editor
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
}
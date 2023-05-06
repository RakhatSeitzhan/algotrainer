import "../styles/StaticMonaco.css"
import Editor from "@monaco-editor/react";
import { useRef, useState } from 'react'
export default function StaticMonaco({ value }){
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [ editorHeight, setEditorHeight] = useState()
  const setHight = (editor, monaco) => {
    const model = editor.getModel();
    const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
    const lineCount = model.getLineCount();
    const height = lineHeight * lineCount;
    editor.layout({ height: `${height*10}px` });
    setEditorHeight(height) // in px
  }
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
    monacoRef.current = monaco; 
    setHight(editor, monaco)
    editor.onDidChangeCursorPosition(e => {
        // editor.setPosition({lineNumber: 1, column: 1})
    });
    
  }
  const graycolor = getComputedStyle(document.documentElement).getPropertyValue('--gray-t1');
  const handleWillMount = (monaco) => {
    // monaco.editor.defineTheme('my-dark', themeData);
    monaco.editor.defineTheme('custom-theme', {
      base: 'vs', // Use the 'vs-dark' theme as a base
      inherit: true, // Inherit any existing settings from the base theme
      rules: [
        // { token: 'findMatch', background: '#5D576B' },
        // { token: 'keyword', foreground: '#ff7e70' },
        // { token: 'findMatchHighlight', background: '#ffffff20' },
        // { token: 'hoverHighlight', background: '#ffffff20' },
        // { token: 'wordHighlight', background: '#ffffff20' },
        // { token: 'wordHighlightStrongt', background: '#ffffff20' },
        
      ],
      colors: {
        // 'editor.background': '#5d576b',
        // 'editor.foreground': '#ffffff', 
        // 'editorLineNumber.foreground': '#ffffff',
        // 'editor.lineHighlightBackground': '#524b62',
        // 'editorCursor.foreground': '#F8F8F0',
        // 'editor.selectionBackground': '#ffffff20',
        // 'editor.selectionHighlightBackground': '#ffffff20',
        // 'editor.inactiveSelectionBackground': '#ffffff20'
        'editor.background': graycolor.slice(1),
      }
    });
    
  }

  const editorOptions = {
    readOnly: true,
    domReadOnly: true,
    hover: false,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    autoIndent: true,
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    selectionHighlight: false,
    renderLineHighlight: 'none',
    matchBrackets: false,
    scrollbar: {
        vertical:"hidden",
        handleMouseWheel:false,
        horizontalScrollbarSize: 2,
        horizontalSliderSize: 2,
    },
    lineNumbers: 'off',
    }   

  return (
    <div className="StaticMonaco__container">
      <Editor
        className="StaticMonaco"
        language="javascript"
        value= {value}
        onMount={handleEditorDidMount}
        // onChange= {handleEditorChange}
        beforeMount = {handleWillMount}
        options = {editorOptions}
        height = {editorHeight}
        // theme = 'custom-theme'
      />
    </div>
    
  );
}


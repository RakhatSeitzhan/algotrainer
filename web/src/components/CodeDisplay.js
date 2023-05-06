import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import "../styles/CodeDisplay.css"
export default function CodeDisplay({ code }){
    return (
    <div className="CodeDisplay">
        <CodeHighlighter code = {code}/>
    </div>)
}
const graycolor = getComputedStyle(document.documentElement).getPropertyValue('--gray-t1');
const CodeHighlighter = ({code}) => {
    const customStyle = {
        fontFamily: "Menlo, Monaco, Courier New, monospace",
        // backgroundColor: graycolor,
        backgroundColor: 'inherit'
    };
    return (
        <SyntaxHighlighter 
            language="javascript" 
            style={vs} 
            customStyle={customStyle}
        >
            {code}
        </SyntaxHighlighter>
    );
};
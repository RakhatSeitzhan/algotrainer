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
const pur = getComputedStyle(document.documentElement).getPropertyValue('--pur-dark');
const CodeHighlighter = ({code}) => {
    let customTheme = {...vs}
    customTheme['hljs-keyword'] = {color: pur}
    const customStyle = {
        fontFamily: "Menlo, Monaco, Courier New, monospace",
        // backgroundColor: graycolor,
        backgroundColor: 'inherit',
        // hljsKeyword: ''
    };
    console.log(customTheme)
    return (
        <SyntaxHighlighter 
            language="javascript" 
            style={customTheme} 
            customStyle={customStyle}
        >
            {/* {code.replace(/\b(const|function|console|let)\b/g, (match) => <span>{match}</span>)} */}

            {code}
        </SyntaxHighlighter>
    );
};
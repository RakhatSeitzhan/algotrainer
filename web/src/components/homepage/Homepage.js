import "../../styles/homepage/Homepage.css"
import CodeDisplay from "../CodeDisplay"
import Typed from 'react-typed';
import React, { useEffect, useRef,useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import Typed from 'typed.js'
export default function Homepage(){
    const code = `function solve(arr){
    let res = []
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == 0){
            res.push(0)
        }
    }
    return res
}`
    const lineNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13]
    return (
    <div className="Homepage">
        <div className="Homepage__row">
            <div className="Homepage__dashedLine"></div>
            <div className="Homepage__description">
                <div className="Homepage__title">Solve problems</div>
                <div className="Homepage__text">
                    Algotrainer provides wide variety of problems 
                    covering vital aspects of computer science
                </div>
                
            </div>
            <div className="Homepage__dashedLine"></div>
            <div className="Homepage__illustration">
                <div className="Homepage__window">
                    <div className="Homepage__windowHeader">
                        <div className="Homepage__headerItem1"></div>
                        <div className="Homepage__headerItem2"></div>
                        <div className="Homepage__headerItem3"></div>
                    </div>
                    <div className="Homepage__windowEditorContainer">
                        <div className="Homepage__windowNumbers">
                            {lineNumbers.map((lineNumber) => (
                            <div className="Homepage__windowNumber" key={lineNumber}>
                                {lineNumber}
                            </div>
                            ))}
                        </div>
                        <CodeAnimation lines = {code}></CodeAnimation>
                    </div>
                
                </div>
            </div>
            <div className="Homepage__dashedLine"></div>
        </div>
       
        
    </div>
    )
}
const CodeAnimation = ({lines}) => {
  const codeRef = useRef()
  const [code, setCode ] = useState('')
  useEffect(() => {
    const spanList = codeRef.current?.children[0].children[0].children
    const tempcode = spanList &&  Object.keys(spanList).map(key => 
        `<span class="${spanList[key].classList[0]}" style ="color: ${spanList[key].style.color}" >${spanList[key].innerHTML}</span>`
    ).join('')
    setCode(tempcode)
  },[])
  return (
    <div className="code-container">
        <div className="invisiblecode" ref= {codeRef}><CodeDisplay code = {lines} /></div>
        <Typed typeSpeed={30} strings={[code ? code : '']}></Typed>       
    </div>
  );
};

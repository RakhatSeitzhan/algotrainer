import "../../styles/homepage/Homepage.css"
import CodeDisplay from "../CodeDisplay"
import Typed from 'react-typed';
import React, { useEffect, useRef,useState } from 'react';
import { Link } from "react-router-dom";
import { GrFormNext } from 'react-icons/gr'
import BlockAnimation from "./BlockAnimation";
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
                <div className="Homepage__logo">
                    <svg  height="50" viewBox="0 0 80 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 64L36.3 5.45874C38.15 2.18042 41.85 2.18042 43.7 5.45874L77 64" stroke="#5884EC" stroke-width="6" stroke-linecap="round"/>
                        <path d="M40 25L26 51H54" stroke="#7658EC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="Homepage__logoText">lgotrainer</span>
                </div>
                <div className="Homepage__text">
                    Learn algorithms by solving problems.
                </div>
                <div className="Homepage__text">
                    Test your knowledge.
                </div>
                <div className="Homepage__link">
                    <Link className="CustomButton-1" to = '/problems'>
                        Get started 
                        <GrFormNext/>
                    </Link>
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
                <BlockAnimation/>
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
        {code != '' && <Typed typeSpeed={30} strings={[code]}></Typed>}
    </div>
  );
};

import "../styles/Header.css"
import {
    Link
  } from "react-router-dom";
export function Header(){
    return (
    <div className="Header">
        <div className="Header__container">
            <div className="Header__logo">
                <svg  height="25" viewBox="0 0 80 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 64L36.3 5.45874C38.15 2.18042 41.85 2.18042 43.7 5.45874L77 64" stroke="#5884EC" stroke-width="6" stroke-linecap="round"/>
                    <path d="M40 25L26 51H54" stroke="#7658EC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className="Header__text1">lgo</span><span className="Header__text1">trainer</span>
            </div>
           

            <Link to = "/learn" className="Header__link">Home</Link>
            <Link to = "/problems" className="Header__link">Problems</Link>
         
        </div>
        
    </div>)
}
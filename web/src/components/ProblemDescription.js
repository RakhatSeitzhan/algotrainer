import "../styles/ProblemDescription.css"
import Difficulty from "./Difficulty"
import CodeDisplay from "./CodeDisplay.js";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function ProblemDescription({ problem }){

    const loaded = problem != undefined
    return (
    <div className="ProblemDescription">
        <div className="ProblemDescription__title">{problem?.title || <Skeleton width='10rem' height = '1.5rem'/>}</div>
        <div className="ProblemDescription__tags">
            {loaded ?
            <>
                <Difficulty problem = {problem}/>
                {problem?.tags.map(item => 
                <div className="ProblemDescription__tag">
                    {item}
                </div>)}
            </>
            :
            <>
                <Skeleton width = '5rem' height='1.5rem'/>
                <Skeleton width = '5rem' height='1.5rem'/>
                <Skeleton width = '5rem' height='1.5rem'/>
            </>
            }
           
        </div>
        
        <div className="ProblemDescription__description">{problem?.description || <Skeleton count = {5}/>}</div>
        <div className="ProblemDescription__examples">Examples</div>
        <div className="ProblemDescription__exampleOutputs">
            {loaded && 
            problem.testcases.slice(0,3).map((testcase, index) => 
                <>
                    <div>Example {index+1}</div>
                    <div className="ProblemDescription__example">
                        <div className="ProblemDescription__text">Input:</div>
                        <div className="ProblemDescription__container">
                        <CodeDisplay code = {Object.keys(testcase.case).sort().map(key => key + ' = ' + testcase.case[key]).join('\n')}></CodeDisplay>
                        
                        </div>
                        <div className="ProblemDescription__text">Output:</div>
                        <div className="ProblemDescription__container">
                            <CodeDisplay code = {typeof testcase.result == 'string' ? testcase.result : JSON.stringify(testcase.result)}></CodeDisplay>
                        </div>
                        
                    </div>
                </>
           )
            ||
            <>
                <Skeleton height='6rem'/>
                <br/>
                <Skeleton height='6rem'/>
                <br/>
                <Skeleton height='6rem'/>
            </>
            }
        </div>
    </div>
    )
}
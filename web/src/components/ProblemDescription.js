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
        <div className="ProblemDescription__exampleInputs">
            <div>{loaded ? 'Input' : <Skeleton width='5rem' height='1.2rem'/>}</div>
            {loaded &&
                <div className="ProblemDescription__code">
                    <CodeDisplay code = {problem?.testcases?.map(testcase => Object.keys(testcase.case).map(key => testcase.case[key]).join(',')).join('\n')}/>
                </div>
                ||
                <Skeleton height='5rem'/>
            }
        </div>

        <div className="ProblemDescription__exampleOutputs">
        <div>{loaded ? 'Output' : <Skeleton width='5rem' height='1.2rem'/>}</div>
            {loaded &&
                <div className="ProblemDescription__code">
                    <CodeDisplay code = {problem?.testcases?.map(testcase => testcase.result).join('\n')}/>
                </div>
                ||
                <Skeleton height='5rem'/>
            }
        </div>
    </div>
    )
}
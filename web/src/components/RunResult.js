import '../styles/RunResult.css'
import CodeDisplay from './CodeDisplay'
import { RotatingLines } from 'react-loader-spinner'
export default function RunResult({ runResult, executingCode }) {
    const gray = getComputedStyle(document.documentElement).getPropertyValue('--gray-t1').slice(1);
    const getStateString = (state) => {
        if (state == 'error') return 'Error'
        if (state == 'correct') return 'Correct'
        return 'Incorrect'
    }
    return (
    <div className="RunResult">
        {
            runResult && 
            <>
                {executingCode && <RotatingLines strokeColor={gray} strokeWidth="5" animationDuration="0.75" width="96" visible={true}/>}
                <div className={`RunResult__output ${runResult.state}`}>
                    <div className='RunResult__title'>{getStateString(runResult.state)}</div>
                    <div className='RunResult__title'>Expected output: </div>
                    <CodeDisplay code = {JSON.stringify(runResult.validSolution.result)}/>
                    <div className='RunResult__title'>Your output: </div>
                    <CodeDisplay code = {JSON.stringify(runResult.result)}/>
                </div>
                {runResult.logs && runResult.logs.length >0 &&
                <>
                    <div className='Console__title'>Console</div>
                    <div className={`RunResult__output ${runResult.state}`}> 
                        <CodeDisplay code ={runResult.logs.map(i => typeof i != 'string' ? JSON.stringify(i) : i).join('\n')}/>
                    </div>
                </>}
            </>
            ||
            <>
                Execute the code to see the results
            </>
        }
    </div>)
}
import { Oval } from 'react-loader-spinner'
import "../styles/Submission.css"
import {BsCheckLg, BsX} from 'react-icons/bs'
export default function Submission({ submissionResult }){
    const bl = getComputedStyle(document.documentElement).getPropertyValue('--bl').slice(1);
    const grey = getComputedStyle(document.documentElement).getPropertyValue('--gray-t1').slice(1);
    return submissionResult.length > 0 ? (
    <div className="Submission">
        <div className='Submission__table'>
            <div className='Submission__title'></div>
            <div className='Submission__title'>Status</div>
            <div className='Submission__title'>Runtime (ms)</div>
            {submissionResult.map((item, index) =>
            <div className='Submission__row' key = {index}>
                <div className='Submission__item'>Testcase {index+1}</div>
                {item.isExecuting ? 
                <div className='Submission__item'>
                    <Oval
                        height={15}
                        width={15}
                        color={grey}
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor={bl}
                        strokeWidth={5}
                        strokeWidthSecondary={5}
                    />
                </div>
                :
                item.status == 'correct' ? 
                <div className='Submission__item'>
                    <BsCheckLg className = 'Submission__checkIcon'/>
                </div>
                :
                item.status == 'error' ? 
                <div className='Submission__item'>error</div> :
                <div className='Submission__item'>
                    <BsX className = 'Submission__xIcon' size = {20}/>
                </div>
                }
                <div className='Submission__item'>{item.runtime}</div>
            </div>
            )}
        </div>
       
    </div>
    ) : 
    <>Submit the code to see the results</>
}
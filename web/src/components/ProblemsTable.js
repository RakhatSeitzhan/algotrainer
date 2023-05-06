import '../styles/ProblemsTable.css'
import { useState, useEffect } from 'react'
import db from '../firebase.js'
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Difficulty from './Difficulty';
import Skeleton from 'react-loading-skeleton';
export default function ProblemsTable(){
    const [problems, setProblems] = useState([])
    const [ loading, setLoading ] = useState(true)
    async function getProblems(){
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, "problems"));
        setProblems(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        setLoading(false)
    }
    useEffect(() => {
    getProblems()
    }, [])
    const [page, setPage] = useState(0)
    const problemsPerPage = 50
    const getRadomWidth = (min, max) => {
        const diff = max - min
        return String(Math.random()*diff/2 + min) + 'rem'
    }
    const getRandomInt = (min, max) => {
        const diff = max - min
        return Math.floor(Math.random()*diff/2 + min)
    }
    return (
    <div className="ProblemsTable">
        <div className="ProblemsTable__label"></div>
        <div className="ProblemsTable__label">Title</div>
        <div className="ProblemsTable__label">Difficulty</div>
        <div className="ProblemsTable__label">Tags</div>
        {loading ? 
            <>
            {new Array(10).fill(0).map((item, index) => 
            <div className="ProblemsTable__item">
                <div className="ProblemsTable__index"><Skeleton width='2rem' height='2rem'/></div>
                <div className="ProblemsTable__title"><Skeleton width={getRadomWidth(5,13)} height='1.5rem'/></div>
                <div className="ProblemsTable__title"><Skeleton width={getRadomWidth(4,7)} height='1.5rem'/></div>
                <div className="ProblemsTable__tags">
                    {new Array(getRandomInt(2,5)).fill(0).map(() => <Skeleton  width={getRadomWidth(3,6)} height='1.5rem'/>)}
                </div>
            </div>
                )}
            </>
            
            :
            <>
                {problems.slice(page, page+problemsPerPage).map((problem, index) => 
                <Link to = {`/problems/${problem.id}`}className="ProblemsTable__item" key ={index} > 
                    <div className="ProblemsTable__index">{index+1}</div>
                    <div className="ProblemsTable__title">{problem?.title}</div>
                    <div className="ProblemsTable__title"><Difficulty problem={problem}/></div>
                    
                    <div className="ProblemsTable__tags">
                    {problem.tags?.map((tag, i) => <div className="ProblemsTable__tag" key ={i}>{tag}</div>)}
                    </div>
                </Link>)}
            </>
        }
        

        <div>
            <button className='CustomButton-1' onClick={() => page > 0 && setPage(page-1)}>Previous page</button>
            <button className='CustomButton-1' onClick={() => page < problems.length / problemsPerPage -1&& setPage(page+1)}>Next page</button>
        </div>
    </div>)
}
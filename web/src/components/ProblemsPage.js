import ProblemsTable from "./ProblemsTable"
import SortBar from "./SortBar"
import { useState, useEffect } from 'react'
import db from '../firebase.js'
import '../styles/ProblemsPage.css'
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { GrFormNext,GrFormPrevious } from 'react-icons/gr'

export default function ProblemsPage(){
    const [problems, setProblems] = useState([])
    const [ loading, setLoading ] = useState(true)
    async function getProblems(q){
        if (!q) q = query(collection(db, "problems"), orderBy('title'))
        setLoading(true)
        const querySnapshot = await getDocs(q);
        const tempProblems = processDBData(querySnapshot)
        setProblems(tempProblems)
        setLoading(false)
    }
    const processDBData = (querySnapshot) => {
        return querySnapshot.docs.map(doc => {
            let status = 'none'
            const lsData = localStorage.getItem(doc.id)
            if (lsData) status = JSON.parse(lsData).status
            return {...doc.data(), id: doc.id, status: status}
        })
    }
    useEffect(() => {
        getProblems()
    }, [])
    const [page, setPage] = useState(0)
    const problemsPerPage = 15
    return (
    <div className="ProblemsPage">
        <SortBar setProblems = {setProblems} setLoading = {setLoading} getProblems = {getProblems} processDBData = {processDBData}/>
        <div>
            <div className="ProblemsPage__nav">
                <div className="ProblemsPage__iconContainer" onClick={() => page > 0 && setPage(page-1)}><GrFormPrevious size = {15}/></div>
                <div className="ProblemsPage__item">{page*problemsPerPage+1}―{(page+1)*problemsPerPage}</div>
                <div className="ProblemsPage__iconContainer" onClick={() => page < problems.length / problemsPerPage -1&& setPage(page+1)}><GrFormNext size = {15}/></div>
            </div>
            <ProblemsTable problems={problems.slice(page, page+problemsPerPage)} loading = {loading}/>
        </div>
        
    </div>)
}
import { collection, getDocs, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";
import Skeleton from "react-loading-skeleton";
import { BiSearch} from 'react-icons/bi'
import "../styles/SortBar.css"
export default function SortBar({ setProblems, setLoading, getProblems, processDBData}){
    const [tags, setTags] = useState([])
    const [inputValue, setInputValue] = useState('')
    useEffect(() => {
        const getDBTags = async () => {
            const query = await getDocs(collection(db, "tags"))
            setTags(query.docs.map(doc => ({id: doc.id, ...doc.data(), selected: false})))
        }
        getDBTags()
    },[])
    const handleInputChange = e => {
        setInputValue(e.target.value)
    }
    const toggleSelect = (index) => {
        let temp = [...tags]
        temp[index].selected = !temp[index].selected 
        setTags(temp)
        requestProblemsWithTags()
    }
    const requestProblemsWithTitle = async e => {
        e.preventDefault()
        const searchString = inputValue.replace(/\s/g,'').toLowerCase();
        const q = query(collection(db, "problems"),
            orderBy("lowercaseTitle"),
            startAt(searchString),
            endAt(searchString + '~')
        );
        getProblems(q)
        let temp = [...tags] 
        setTags(temp.map(item => ({...item, selected: false}))) // reseting selected tags
    }
    const requestProblemsWithTags = async () => {
        setLoading(true)
        const selectedTags = tags.reduce((res, tag) => tag.selected ? [...res, tag.name] : [...res],[])
        if (selectedTags.length != 0) {
             // first we request problems with the first selected tag
            const q = query(collection(db, "problems"), where("tags", "array-contains", selectedTags[0]));
            const querySnapshot = await getDocs(q)
            // convert data to regular json
            const problemsByFirstTag = processDBData(querySnapshot)
            // now sort the requested problems
            const selectedProblems = problemsByFirstTag.reduce((res, problem) => {
                for(var i = 1; i < selectedTags.length; i++){ // start from i = 1 since all problems already contain the tag at index 1
                    if (problem.tags.indexOf(selectedTags[i]) == -1) {
                        return [...res]
                    }
                }
                return [...res, problem]
            },[])
            setProblems(selectedProblems)
            setLoading(false)
            
        } else {
            getProblems()
        }
       
    }
    const getRadomWidth = (min, max) => {
        const diff = max - min
        return String(Math.random()*diff/2 + min) + 'rem'
    }
    return tags.length > 0 ? (
    <div className="SortBar">
        <form className="SortBar__search">
            <input className="SortBar__input" placeholder="Search by title" value={inputValue} onChange = {handleInputChange}/>
            <button className="SortBar__button" type="submit" onClick={requestProblemsWithTitle}><BiSearch size={20}/></button>
        </form>
        
        <div className="SortBar__list">
            {tags.map( (tag, index) => 
            <div className={`SortBar__item ${tag.selected && 'SortBar__selected'}`} onClick  = {() => toggleSelect(index)}>{tag.name} {tag.numOfProblems}</div>
            )}
        </div>
    </div>
    ): (
        <div className="SortBar">
            <Skeleton width='100%' height = '2rem' borderRadius='0.5rem' style={{marginBottom: '0.5rem'}}/>
            <div className="SortBar__list">
                <Skeleton width={getRadomWidth(5,10)} height = '1.5rem'/>
                <Skeleton width={getRadomWidth(5,10)} height = '1.5rem'/>
                <Skeleton width={getRadomWidth(5,10)} height = '1.5rem'/>
                <Skeleton width={getRadomWidth(5,10)} height = '1.5rem'/>
                <Skeleton width={getRadomWidth(5,10)} height = '1.5rem'/>
                <Skeleton width={getRadomWidth(5,10)} height = '1.5rem'/>
            </div>
            
        </div>
    )
}
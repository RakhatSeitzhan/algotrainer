import "../styles/Difficulty.css"

export default function Difficulty({ problem }){
    const getDifficulty = () => {
        
        if (!problem) return 'Unknown'
        if (!problem.difficulty) return 'Unknown'
        if (problem.difficulty > 6) return 'Hard'
        if (problem.difficulty > 3) return 'Normal'
        return 'Easy'
    
    }
    const diffstr = getDifficulty()
    return <div className='Difficulty'><div className={`Difficulty__container ${diffstr}`}>{diffstr}</div></div>
}
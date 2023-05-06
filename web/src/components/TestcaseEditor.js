import "../styles/TestcaseEditor.css"

export default function TestcaseEditor({ value, setValue }){
    const handleChange = (e, key) => {
        let temp = {...value}
        temp.case[key] = e.target.value
        setValue(temp)
    }
    return( 
    <div className="TestcaseEditor">
        {
            Object.keys(value.case).map(key => 
            <div className="TestcaseEditor__input">
                <span className="TestcaseEditor__var">{key}</span><span> = </span>
                <input onChange={e => handleChange(e, key)} value={value.case[key]}></input>
            </div>) 
        }
    </div>)
}
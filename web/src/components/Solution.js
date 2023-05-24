import "../styles/Solution.css"
import CodeDisplay from "./CodeDisplay";
export default function Solution({ problem }){
    return (
    <div className="Solution">
        <div className="Solution__title">Explanation</div>
        {problem.sections &&
        problem.sections.map(item => 
        <div>
        {item.type == 'text' ? 
            <div>&emsp;&emsp;{item.source}</div>
            :
            item.type == 'code' ? 
            <div className="Solution__code">
                <CodeDisplay code = {item.source}/>
            </div>
            :
            item.type == 'video' &&
            <iframe className="Solution__video" src = {item.source}></iframe>
            // <iframe width="560" height="315" src="https://www.youtube.com/embed/H7u0Zrra060" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        }
        </div>
        )
        }
        <div className="Solution__title">Solution</div>
        {problem.solution &&
            <div className="Solution__code"><CodeDisplay code = {problem.solution}/></div>
        }
    </div>)
}
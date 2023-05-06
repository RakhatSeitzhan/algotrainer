import { useState } from 'react'
export default function useNav({ children }){
    const [ state, setState ] = useState(0)
    const component = () => {
        return 
    }
    return [ state, component ]
}


{/* <div wrapper> 
    <div first element>
        <div name></div>
        <div content></div>
    </div>
    <div second element>
        <div name></div>
        <div content></div>
    </div>
    ...
</div wrapper> */}

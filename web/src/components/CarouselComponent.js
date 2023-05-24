import { useState } from 'react'
import "../styles/Carousel.css"

export default function CarouselComponent({ children, state, setState }){
    const normalizedChildren = () => {
        let childrenArray = children
        if (!Array.isArray(children)) childrenArray = [children]
        let tags = []
        let contents = []
        childrenArray.forEach(item => {
            tags.push(item.props.children[0].props.children)
            contents.push(item.props.children[1].props.children)
        });
        return [tags, contents]
    }
    const [tags, contents] = normalizedChildren()
    const [ carouselState, setCarouselState ] = useState(0)
    return !state ? (
        <div className="CarouselComponent">
            <div className='CarouselComponent__nav'>
                {tags.map((item, itemIndex) => 
                <div className={`CarouselComponent__tag ${carouselState == itemIndex && 'CarouselComponent__selected'}`} onClick={() => setCarouselState(itemIndex)}>{item}</div>
                )}
            </div>
            <div className='CarouselComponent__contents'>
                {contents[carouselState]}
            </div>
        </div>
    ) :
    (
        <div className="CarouselComponent">
            <div className='CarouselComponent__nav'>
                {tags.map((item, itemIndex) => 
                <div className={`CarouselComponent__tag ${state == itemIndex && 'CarouselComponent__selected'}`} onClick={() => setState(itemIndex)}>{item}</div>
                )}
            </div>
            <div className='CarouselComponent__contents'>
                {contents[state]}
            </div>
        </div>
    )
}

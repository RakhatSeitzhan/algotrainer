import '../../styles/homepage/BlockAnimation.css'
import {  useState, useEffect, useRef } from 'react'

export default function BlockAnimation(){
   
    const animations = [
        { //block 1
            itemIndex: 1,
            start: 0,
            end: 5000,
        } ,
        { //path 1
            itemIndex: 2,
            start: 3500,
            end: 5500
        } ,
        { //block 2
            itemIndex: 3,
            start: 4000,
            end: 9000
        } ,
        { //path 2
            itemIndex: 4,
            start: 7500,
            end: 9500
        } ,
        { //block3
            itemIndex: 5,
            start: 8000,
            end: 13000
        } ,
        { //path3
            itemIndex: 6,
            start: 11000,
            end: 14000
        } ,
        { //block 2
            itemIndex: 3,
            start: 12000,
            end: 17000
        } ,
        { //path 2
            itemIndex: 4,
            start: 15500,
            end: 17500
        } ,
        { //block3
            itemIndex: 5,
            start: 16000,
            end: 21000
        } ,
        { //path4
            itemIndex: 7,
            start: 19500,
            end: 21500
        } ,
        { //block4
            itemIndex: 8,
            start: 20000,
            end: 25000
        } ,
    ]
    return (
        <div className='BlcokAnimation'>
            {/* <div className='BlcokAnimation__sideText1'>Learn problem solving process</div>
            <div className='BlcokAnimation__sideText2'>Improve your skills</div> */}
            <Animator animations = {animations}>
                <Block
                    name = 'Coding' 
                    svg = {
                        <svg width="39" height="25" viewBox="0 0 39 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.62655 12.5329L10.9658 6.28467C11.5562 5.92786 12.3256 6.08642 12.7225 6.64668L12.7427 6.67513C13.1769 7.2881 12.9964 8.13612 12.349 8.52424L3.82853 13.6327L12.2606 18.6509C12.9006 19.0318 13.0891 19.8637 12.6747 20.4779L12.6086 20.576C12.2172 21.156 11.4314 21.3257 10.8309 20.9598L0.622419 14.7392C-0.209278 14.2323 -0.207039 13.0367 0.62655 12.5329Z" fill="url(#paint0_linear_323_77)"/>
                        <path d="M38.3765 12.5347L27.9295 6.18313C27.3377 5.8233 26.5645 5.98269 26.1676 6.54632L26.1296 6.60043C25.6987 7.21229 25.8785 8.05635 26.5224 8.44472L35.1233 13.6327L26.6118 18.7289C25.9753 19.1101 25.7875 19.938 26.1987 20.5511L26.2825 20.6762C26.6738 21.2596 27.4634 21.4301 28.0652 21.0612L38.3806 14.7373C39.2083 14.2299 39.206 13.0391 38.3765 12.5347Z" fill="url(#paint1_linear_323_77)"/>
                        <path d="M17.7976 24.0349L23.5965 1.59968C23.7732 0.916109 23.3578 0.219924 22.6669 0.0418356C21.971 -0.137546 21.2603 0.276594 21.0823 0.965132L15.2834 23.4003C15.1067 24.0839 15.5221 24.7801 16.213 24.9582C16.9089 25.1375 17.6196 24.7234 17.7976 24.0349Z" fill="url(#paint2_linear_323_77)"/>
                        <defs>
                        <linearGradient id="paint0_linear_323_77" x1="16.8198" y1="5.64981" x2="17.4594" y2="53.2239" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5884EC"/>
                        <stop offset="1" stop-color="white"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_323_77" x1="16.8198" y1="5.64981" x2="17.4594" y2="53.2239" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5884EC"/>
                        <stop offset="1" stop-color="white"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_323_77" x1="16.8198" y1="5.64981" x2="17.4594" y2="53.2239" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5884EC"/>
                        <stop offset="1" stop-color="white"/>
                        </linearGradient>
                        </defs>
                        </svg>                        
                    }
                />
                <Path
                    direction = 'forward' 
                    pathId = {1}
                    svg = {
                    <svg strokeDasharray="86" width="86" height="2" viewBox="0 0 86 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H85" stroke="url(#paint0_linear_310_33)"  stroke-width="1.5" stroke-linecap="round"/>
                        <defs>
                            <linearGradient id="paint0_linear_310_33" x1="-4" y1="5.99997" x2="90" y2="5.5" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#5884EC"/>
                                <stop offset="1" stop-color="#9654EB"/>
                            </linearGradient>
                        </defs>
                    </svg>
                }/>
                <Block
                    name = 'Testing'
                    svg = {
                        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect className='iconitem1' y="14.6025" width="20.6512" height="31.6749" rx="5" transform="rotate(-45 0 14.6025)" fill="url(#paint0_linear_310_68)"/>
                            <path  className='iconitem2' d="M6.90676 26.9922L29.0204 3.5327C29.8059 2.69935 31.1294 2.69453 31.921 3.52212L33.6777 5.35876C34.4173 6.13199 34.4173 7.35036 33.6777 8.1236L11.4851 31.3258C11.3507 31.4663 11.1782 31.5646 10.9887 31.6086L6.67767 32.6102C5.92995 32.7839 5.27341 32.0853 5.49325 31.3498L6.67631 27.3918C6.72094 27.2425 6.79986 27.1056 6.90676 26.9922Z" fill="url(#paint1_linear_310_68)"/>
                            <defs>
                            <linearGradient id="paint0_linear_310_68" x1="12.5458" y1="25.5747" x2="-6.20282" y2="68.9926" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#9958EC"/>
                            <stop offset="1" stop-color="#9958EC" stop-opacity="0"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_310_68" x1="13.0233" y1="23.1529" x2="49.1671" y2="-63.6353" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#5884EC"/>
                            <stop offset="1" stop-color="white"/>
                            </linearGradient>
                            </defs>
                        </svg>
                    }
                />
                <Path 
                    direction = 'reverse'
                    pathId = {2}
                    svg = {
                        <svg strokeDasharray="86" width="2" height="86" viewBox="0 0 2 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 85L1 0.999996" stroke="url(#paint0_linear_310_35)" stroke-width="1.5" stroke-linecap="round"/>
                        <defs>
                        <linearGradient id="paint0_linear_310_35" x1="5.99997" y1="90" x2="5.5" y2="-4" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5884EC"/>
                        <stop offset="1" stop-color="#9654EB"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    }
                />
                <Block 
                    name = 'Fixing'
                    svg = {
                        <svg width="39" height="36" viewBox="0 0 39 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7365 14.5729L17.5731 9.73632L37.8992 30.0624C38.6802 30.8434 38.6802 32.1097 37.8992 32.8908L35.891 34.899C35.1099 35.68 33.8436 35.68 33.0626 34.899L12.7365 14.5729Z" fill="url(#paint0_linear_310_63)"/>
                        <path d="M0.707107 15.4383C0.316583 15.0478 0.316582 14.4146 0.707107 14.0241L11.4421 3.28913C14.9154 -0.184265 20.5469 -0.184267 24.0203 3.28912L6.99624 20.3132C6.60571 20.7037 5.97255 20.7037 5.58202 20.3132L0.707107 15.4383Z" fill="url(#paint1_linear_310_63)"/>
                        <defs>
                            <linearGradient id="paint0_linear_310_63" x1="65" y1="67.5" x2="10.5" y2="12.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="#5884EC"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_310_63" x1="65" y1="67.5" x2="10.5" y2="12.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="#5884EC"/>
                            </linearGradient>
                        </defs>
                        </svg>
                    }
                />
                <Path 
                    pathId = {3}
                    direction='reverse'
                    svg = {
                        <svg  strokeDasharray="310" width="83" height="154" viewBox="0 0 83 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H68C75.732 1 82 7.26801 82 15V139C82 146.732 75.732 153 68 153H0" stroke="url(#paint0_linear_310_32)" stroke-width="1.5"/>
                        <defs>
                        <linearGradient id="paint0_linear_310_32" x1="-38.5" y1="-12.5" x2="12" y2="178.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5985ED"/>
                        <stop offset="1" stop-color="#9A59ED"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    }
                />
                <Path 
                    pathId = {4}
                    direction='forwards'
                    svg = {
                        <svg strokeDasharray="86" width="86" height="2" viewBox="0 0 86 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H85" stroke="url(#paint0_linear_310_33)"  stroke-width="1.5" stroke-linecap="round"/>
                            <defs>
                                <linearGradient id="paint0_linear_310_33" x1="-4" y1="5.99997" x2="90" y2="5.5" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5884EC"/>
                                    <stop offset="1" stop-color="#9654EB"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    }
                />
                <Block 
                    name = 'Submission'
                    svg = {
                        <svg width="38" height="37" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.0127 0.493652L1.20893 15.8955C0.793737 16.1031 0.860928 16.7152 1.31127 16.8278L9.56608 18.8915C9.84218 18.9605 10.1346 18.9087 10.3701 18.7489L24 9.5L14.2233 19.7423C13.8294 20.1549 13.86 20.813 14.2905 21.1874L24.3925 29.9718C24.6723 30.215 25.1102 30.0799 25.2042 29.7213L32.7199 1.06772C32.829 0.651895 32.3972 0.301398 32.0127 0.493652Z" fill="url(#paint0_linear_310_67)"/>
                        <path d="M12.5 30V25.2268C12.5 24.364 13.5195 23.9062 14.1644 24.4794L16.3123 26.3887C16.701 26.7342 16.76 27.32 16.4479 27.7361L14.3 30.6C13.7234 31.3688 12.5 30.961 12.5 30Z" fill="url(#paint1_linear_310_67)"/>
                        <defs>
                        <linearGradient id="paint0_linear_310_67" x1="28.5" y1="6.5" x2="-16" y2="92" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5884EC"/>
                        <stop offset="1" stop-color="white"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_310_67" x1="28.5" y1="6.5" x2="-16" y2="92" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5884EC"/>
                        <stop offset="1" stop-color="white"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    }
                />
            </Animator>
        </div>
    )
}
function Block({name, svg, toggleAnimation}){
    const animateClass = toggleAnimation ? 'animate' : ''
    return (
        <div className={`BlockAnimation__block ${animateClass} block-${name}`}>
            <div className={`BlockAnimation__icon ${animateClass}`}>
                {svg}
            </div>
            <div className={`BlockAnimation__text ${animateClass}`}>{name}</div>
        </div> 
    )
}

function Path({svg, toggleAnimation, direction, pathId}){
    const animateClass = toggleAnimation ? 'animate' : ''
    return (
        <div className={`BlockAnimation__path path-${pathId} ${animateClass}`} style={{animationDirection: direction}}>
            {svg}
        </div>
    )
}

function Animator({children, animations}){
    const [toggleAnimation, _setToggleAnimation] = useState(Array(children.length).fill(false))
    const toggleAnimationRef = useRef(toggleAnimation)
    const setToggleAnimation = (newstate) => {
        toggleAnimationRef.current = newstate
        _setToggleAnimation(newstate)
    }
    useEffect(() => {
        const totalDuration = animations[animations.length-1].end-animations[0].start
        const startAnimations = () => {
            animations.forEach((animation) => {
                setTimeout(() => {
                    let temp = [...toggleAnimationRef.current]
                    temp[animation.itemIndex-1] = true
                    setToggleAnimation(temp)
                }, animation.start) 
                setTimeout(() => {
                    let temp = [...toggleAnimationRef.current]
                    temp[animation.itemIndex-1] = false
                    setToggleAnimation(temp)
                }, animation.end) 
            })
        }
        startAnimations()
        const interval = setInterval(() => {
            startAnimations()
        }, totalDuration)
        return () => {
            clearInterval(interval) 
        }
    }, [])
    return (
        <>
            {children.map((child, index) => <child.type {...child.props} toggleAnimation = {toggleAnimation[index]}/>)}
        </>
    )
}
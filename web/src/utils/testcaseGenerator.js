function generateList(pattern){
    let combinations = 1
    let res = []
    if (pattern.contains == 'bool'){
        if (pattern.condition == 'random'){
            for (const i of pattern.length){
                combinations *= 2
                res.push(Math.random() < 0.5)
            }
        } else if (pattern.contains == 'set'){
            // must have set attribute
            combinations *= pattern.set.length
            res.push()
        }
    }
}

//conditions
function recur(p){
    if (p.type == 'number'){
        if (p.instructions.type == 'random'){
            const interval = p.instructions.set[1]-p.instructions.set[0]
            return (Math.random()+1)*interval/2+p.instructions.set[0]
        } else if (p.instructions.type == 'set'){
            
        }
        
    }
}
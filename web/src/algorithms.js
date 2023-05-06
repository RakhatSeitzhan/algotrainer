// class Algorithm{
//     constructor(name, f){
//         this.name = name
//         this.f = f
//     }
//     static 
// }

function bublesort(arr){
    let c = [...arr]
    for (var i = 0; i < c.length-1; i++){
        for (var j = 0; j < c.length-1-i; j++){
            if(c[j] > c[j+1]){
                const temp = c[j]
                c[j] = c[j+1]
                c[j+1] = temp
            } 
        }
    }
    return c
}

export {bublesort}
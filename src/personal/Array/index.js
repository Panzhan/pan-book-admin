const obj = {
    sum: [100,100,100,100,100,100],
    a: [50,50,50,50,50,50],
    b: [20,20,20,20,20,20],
    c: [10,10,10,10,10,10]
}

const objToArr = [] // 存放对象转化成的数组

const objKeys = Object.keys(obj) //对象的key组成的数组

// for(let i=0; i<objKeys.length; i++){
//     for(let j=0; j<obj[objKeys[i]].length; j++){
//         console.log(obj[objKeys[i]][j])
//     }
// }

// 将对象转化为数组
for(let k=0; k<objKeys.length; k++){
    objToArr[k] = obj[objKeys[k]]
}

// 数组相减
function calculateArrs(...args){
    let resArr = []
    let argsLen = arguments.length
    for(let t=0; t<arguments[0].length; t++){
        // let sum = []
        // for(let l = 1; l<=argsLen; l++){
        //     sum.push(arguments[l][t])
        // }
        // resArr[t] = arguments[0][t] - sum
        if(argsLen === 1){
            resArr[t] = arguments[0][t]
        }else if(argsLen === 2){
            resArr[t] = arguments[0][t] - arguments[1][t]
        }else if(argsLen === 3){
            resArr[t] = arguments[0][t] - arguments[1][t] - arguments[2][t]
        }else if(argsLen === 4){
            resArr[t] = arguments[0][t] - arguments[1][t] - arguments[2][t] - arguments[3][t]
        }
    }
    console.log('resArr', resArr)
}

calculateArrs(...objToArr)
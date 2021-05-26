//爬楼梯
// n 节楼梯，一次爬一节或者两节
function walk(n) {
    if(n===1) return 1
    if(n===2) return 2
    return walk(n-1) + walk(n-2)
}

let res = walk(4)
console.log('res', res)

// walk(4)
// walk(3)+walk(2)
// walk(2)+walk(1)+ walk(2)
// 1 1 1 1
// 1 1 2
// 1 2 1
// 2 1 1
// 2 2

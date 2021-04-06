// 实现一个Promise.retry，成功时返回结果，失败时重新获取,超过n次时 返回失败的结果

// Promise.all怎么实现的 common.js

// 发布订阅 EventEmitter
const fs = require('fs');

// 节流

fs.readFile('name.md', 'utf8',function (err, data) {
    console.log(data);
})

function read(...args) {
    return new Promise(function (resolve, reject) {
        fs.readFile(args[0],args[1], function (err, data) {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

let promise1 = read('name.md', 'utf8')
let promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

function isPromise(val) {
    return typeof val.then === 'function';
}

Promise.all = function (arr) {
    let result = [], i=0;
    function handle(val,index,resolve) {
        result[index] = val;
        if(++i === arr.length) resolve(result);
    }
    return new Promise(function (resolve, reject) {
        arr.forEach((promise,index) =>{
            if (isPromise(promise)){
                promise.then(value=>{
                    handle(value,index, resolve)
                }, (err)=>{
                    reject(err)
                })
            }else {
                handle(promise,index, resolve)
            }
        })
    })
}


// Promise.retry = function retrying(promise, times){
//     return new Promise(function (resolve, reject) {
//         if (isPromise(promise)) {
//             promise.then(data=>{
//                 resolve(data)
//             }, err=>{
//                if (--times === 0) {
//                    reject(err)
//                }else {
//                    retrying(promise, times)
//                }
//             })
//         }else {
//             resolve(promise)
//         }
//     })
// }

// Promise.retry(promise1,3).then(data=>{
//     console.log(data, 'data');
// })

Promise.all([promise1, promise2, 1]).then(data=>{
    console.log(data);
});


// class EventEmitter {
//     constructor() {
//         this.callbackArr = [];
//     }
//     on(key, fn){
//         this.callbackArr.push({
//             [key]: fn
//         })
//     }
//     emit(eventName, ...args){
//         this.callbackArr.forEach(item=>{
//             item[eventName].apply(this,args)
//         })
//     }
// }

// let event1 = new EventEmitter();

// event1.on("test", function (...args) {
//     console.log(...args);
// })

// event1.emit('test', '参数1','参数2')


// vm.$on('test', function (msg) {
//     console.log(msg)
// })
// vm.$emit('test', 'hi')
// => "hi"

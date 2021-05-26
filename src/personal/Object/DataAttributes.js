//  对象数据属性
//  configurable -- 能否通过 delete 删除属性从而重新定义属性
//  enumerable -- 能否通过 for-in 循环返回属性
//  writable -- 能否修改属性的值
//  value -- 含这个属性的数据值

var person = {
    name: 'pan',
    age: '24',
    sex: 'boy',
    phone: '13971741772'
}

//  configurable
// Object.defineProperty(person, 'name',{
//     configurable: false
// })
// console.log('person', person)
// delete person.name
// console.log('person', person)

//  writable
// Object.defineProperty(person, 'name',{
//     writable: false
// })
// console.log('person', person)
// person.name = 'shen'
// console.log('person', person)
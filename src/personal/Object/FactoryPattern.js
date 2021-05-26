function createdObject(name, age, sex){
    var o = new Object()
    o.name = name
    o.age = age
    o.sex = sex
    o.sayName = function(){
        console.log(this.name)
    }
    return o
}

const per1 = createdObject('pan', '20', 'boy')
const per2 = createdObject('shen', '20', 'girl')

console.log('per1', per1)
per1.sayName()
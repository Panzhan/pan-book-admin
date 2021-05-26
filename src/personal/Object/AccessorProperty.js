//  对象访问器属性
//  configurable
//  enumerable
//  get 在读取属性时调用的函数。默认值为 undefined。
//  set 在写入属性时调用的函数。默认值为 undefined。
//  访问器属性不能直接定义，必须使用 Object.defineProperty()来定义

var book = { 
    _year: 2004, 
    edition: 1 
}; 
Object.defineProperty(book, "year", { 
    get: function(){ 
        return this._year; 
    }, 
    set: function(newValue){ 
        if (newValue > 2004) { 
            this._year = newValue; 
            this.edition += newValue - 2004; 
        } 
    } 
}); 
book.year = 2006; 
console.log(book.edition); //2
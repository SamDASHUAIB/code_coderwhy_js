function foo() {}

// 函数也是一个对象
// console.log(foo.__proto__) // 函数作为对象来说, 它也是有[[prototype]] 隐式原型

// 函数它因为是一个函数, 所以它还会多出来一个显式原型属性: prototype
console.log(foo.prototype)

var f1 = new foo()
var f2 = new foo()
// 核心关系
console.log(f1.__proto__ === foo.prototype) // true new 调用函数其中的异步, 原型继承
console.log(f2.__proto__ === foo.prototype)
/*
  函数的原型:
    作为对象 隐式原型 => [[prototype]] __proto__
    作为函数 (构造函数)显式原型 => prototype 属性
*/

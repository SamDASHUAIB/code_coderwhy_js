function Person() {}

var p1 = new Person()
var p2 = new Person()

// 都是为true
// console.log(p1.__proto__ === Person.prototype)
// console.log(p2.__proto__ === Person.prototype)

//
// p1.name = "why"
// p1.__proto__.name = "kobe"
// Person.prototype.name = "james"
p2.__proto__.name = 'curry'

console.log(p1.name)

/*
  构造函数的显式原型 prototype 赋值给 创建出来的新对象的隐式原型 [[prototype]] (__prototype__)
*/

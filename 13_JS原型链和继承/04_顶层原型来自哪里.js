var obj1 = {} // 创建了一个对象
var obj2 = new Object() // 创建了一个对象
obj1.__proto__ === Object.prototype // 最顶层的原型 Object.prototype
obj2.__proto__ === Object.prototype
// function Person() {

// }

// var p = new Person()

var obj = {
  name: 'why',
  age: 18,
}

var obj2 = {
  // address: "北京市"
}
obj.__proto__ = obj2

// Object.prototype
// console.log(obj.__proto__)
// console.log(Object.prototype)
// console.log(obj.__proto__ === Object.prototype)

console.log(Object.prototype) // [Object: null prototype] {}
console.log(Object.prototype.constructor) // [Function: Object]
console.log(Object.prototype.__proto__) // null

console.log(Object.getOwnPropertyDescriptors(Object.prototype))
/*
  顶层的原型来自 Object.prototype
*/

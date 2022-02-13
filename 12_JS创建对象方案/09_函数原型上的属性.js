function foo() {}

// 1.constructor属性
// foo.prototype这个对象中有一个constructor属性
// console.log(foo.prototype)
// console.log(Object.getOwnPropertyDescriptors(foo.prototype))

// Object.defineProperty(foo.prototype, "constructor", {
//   enumerable: true,
//   configurable: true,
//   writable: true,
//   value: "哈哈哈哈"
// })

// foo.prototype.constructor.name = 'foo'

// console.log(foo.prototype)

// prototype.constructor = 构造函数本身
console.log(foo.prototype.constructor) // [Function: foo]
console.log(foo.prototype.constructor.name) // foo

console.log(foo.prototype.constructor.prototype.constructor.prototype.constructor)

// 2.我们也可以添加自己的属性
foo.prototype.name = 'why'
foo.prototype.age = 18
foo.prototype.height = 18
foo.prototype.eating = function () {}

var f1 = new foo()
console.log(f1.name, f1.age)

// 3.直接修改整个prototype对象
// constructor 丢失, 因此需要重新指定 constructor
foo.prototype = {
  // constructor: foo,
  name: 'why',
  age: 18,
  height: 1.88,
}

var f1 = new foo()
console.log(f1.name, f1.age, f1.height)

/*
  通过 Object.defineProperty 方式添加 constructor
  foo.prototype.constructor = foo
*/
Object.defineProperty(foo.prototype, 'constructor', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: foo,
})

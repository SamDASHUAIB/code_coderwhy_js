var obj = {
  name: 'why',
}

console.log(obj.__proto__)

// 对象里面是有一个__proto__对象: 隐式原型对象

// Foo是一个函数, 那么它会有一个显示原型对象: Foo.prototype
// Foo.prototype来自哪里?
// 答案: 创建了一个函数, Foo.prototype = { constructor: Foo }

// Foo是一个对象, 那么它会有一个隐式原型对象: Foo.__proto__
// Foo.__proto__来自哪里?
// 答案: new Function()  Foo.__proto__ = Function.prototype
// Function.prototype = { constructor: Function }

// var Foo = new Function()
function Foo() {}

console.log(Foo.prototype === Foo.__proto__) // false
console.log(Foo.prototype.constructor) // [Function: Foo]
/*
  所有的函数对象均是由 Function 构造函数创建出来的
    Foo.__proto__ === 构造Foo(函数)对象的构造函数.prototype === Function.prototype
*/
console.log(Foo.__proto__.constructor) // [Function: Function]

var foo1 = new Foo()
var obj1 = new Object()

console.log(Object.getOwnPropertyDescriptors(Function.__proto__))
/*
{
  length: { value: 0, writable: false, enumerable: false, configurable: true },
  name: { value: '', writable: false, enumerable: false, configurable: true },
  arguments: {
    get: [Function (anonymous)],
    set: [Function (anonymous)],
    enumerable: false,
    configurable: true
  },
  caller: {
    get: [Function (anonymous)],
    set: [Function (anonymous)],
    enumerable: false,
    configurable: true
  },
  constructor: {
    value: [Function: Function],
    writable: true,
    enumerable: false,
    configurable: true
  },
  apply: {
    value: [Function: apply],
    writable: true,
    enumerable: false,
    configurable: true
  },
  bind: {
    value: [Function: bind],
    writable: true,
    enumerable: false,
    configurable: true
  },
  call: {
    value: [Function: call],
    writable: true,
    enumerable: false,
    configurable: true
  },
  toString: {
    value: [Function: toString],
    writable: true,
    enumerable: false,
    configurable: true
  },
  [Symbol(Symbol.hasInstance)]: {
    value: [Function: [Symbol.hasInstance]],
    writable: false,
    enumerable: false,
    configurable: false
  }
}

*/

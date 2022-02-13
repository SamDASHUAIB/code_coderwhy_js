var obj = {
  name: 'why',
  age: 18,
}

// 新建的 info 对象(空对象)以 obj 对象为原型
var info = Object.create(obj)

/*
  原型式继承函数
  Object.create(xxx) 方法的原理
    以 xxx 为原型创建一个空对象
*/
function createObject1(o) {
  var newObj = {}
  Object.setPrototypeOf(newObj, o)
  return newObj
}

function createObject2(o) {
  function Fn() {}
  Fn.prototype = o
  var newObj = new Fn()
  // newObj.__proto__ === Fn.prototype === o
  return newObj
}

// var info = createObject2(obj)
var info = Object.create(obj)
console.log(info)
console.log(info.__proto__)

// const createObject1 = (o) => {
//   var newObj = {}
//   Object.setPrototypeOf(newObj, o)
//   return newObj
// }
// const createObject1 = (o) => {
//   function Fn() {}
//   Fn.prototype = o
//   // 重新指定 constructor
//   Object.defineProperty(o, 'constructor', {
//     configurable: true,
//     enumerable: false,
//     value: Fn,
//     writable: true,
//   })
//   var newObj = new Fn() // newObj.__proto__ === Fn.prototype === o
//   return newObj
// }

function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype)
  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType,
  })
}

function Person() {}

function Student() {}

inheritPrototype(Student, Person)

console.log(Person.prototype.__proto__)

var stu = new Student()
console.log(stu instanceof Student) // true
console.log(stu instanceof Person) // true
console.log(stu instanceof Object) // true

/*
  instanceof
    实例对象 instanceof 构造函数
    xxx instanceof Yyy => xxx 是不是 Yyy 的实例
  原型链中
*/

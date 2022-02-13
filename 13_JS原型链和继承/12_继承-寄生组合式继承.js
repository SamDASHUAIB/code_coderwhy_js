// 原型式继承的原理, Object.create 方法的原理
function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

function inheritPrototype(SubType, SuperType) {
  // 核心
  // {} 空数组 => 其 __proto__ 为 SuperType.prototype
  SubType.prototype = Object.create(SuperType.prototype)
  // constructor => SubType.prototype.constructor === SubType
  // 重新指定 constructor
  Object.defineProperty(SubType.prototype, 'constructor', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType,
  })
}

function Person(name, age, friends) {
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.running = function () {
  console.log('running~')
}

Person.prototype.eating = function () {
  console.log('eating~')
}

function Student(name, age, friends, sno, score) {
  // this.name = name
  // this.age = age
  // this.friends = friends
  Person.call(this, name, age, friends)
  this.sno = sno
  this.score = score
}

inheritPrototype(Student, Person) // Student.prototype === {} (其 __proto__ 为 Person.prototype)
Student.prototype.studying = function () {
  console.log('studying~')
}

var stu = new Student('why', 18, ['kobe'], 111, 100)
var stu1 = new Student('xusong', 24, ['sam'], 222, 200)
console.log(stu.studying === stu1.studying) // true 复用了
console.log(stu.running === stu1.running) // true 原型继承成功
console.log(stu.eating === stu1.eating) // true
/*
具体的类型也可以看到了 => 其实是去找 stu.constructor.name 的值 => 沿着原型链(Person.prototype) => 'Student'
Student {
  name: 'why',
  age: 18,
  friends: [ 'kobe' ],
  sno: 111,
  score: 100
}
*/
console.log(stu)
stu.studying()
stu.running()
stu.eating()

console.log(stu.constructor.name)

/*
  寄生组合式继承 = 借用构造函数 + Object.create()
*/
const inheritPrototype = (SubType, SuperType) => {
  // 一个空对象 {} 其 __proto__ 为 SuperType.prototype
  SubType.prototype = Object.create(SuperType.prototype)
  // constructor 重新指定 SubType.prototype.constructor = SubType
  Object.defineProperty(SubType.prototype, 'constructor', {
    configurable: true,
    enumerable: false,
    value: SubType,
    writable: true,
  })
}
// 属性 => 构造函数
function Student(name, age, friends, sno, score) {
  Person.call(this, name, age, friends)
  this.sno = sno
  this.score = score
}

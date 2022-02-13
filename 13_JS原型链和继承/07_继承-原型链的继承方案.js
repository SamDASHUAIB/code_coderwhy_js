// 父类: 公共属性和方法
function Person() {
  this.name = 'why'
  this.friends = []
}

Person.prototype.eating = function () {
  console.log(this.name + ' eating~')
}

// 子类: 特有属性和方法
function Student() {
  this.sno = 111
}
// 使用原型链来实现继承
var p = new Person()
Student.prototype = p

var p = new Person()
Student.prototype = p
/*
p.__proto__ === Person.prototype
原型链
  stu.__proto__.__proto__ === Student.prototype.__proto__ === Person.prototype
*/

Student.prototype.studying = function () {
  console.log(this.name + ' studying~')
}

// name/sno
var stu = new Student()

console.log(stu.name)
stu.eating()

stu.studying()

// 原型链实现继承的弊端:
// 1.第一个弊端: 打印stu对象, 继承的属性是看不到的
console.log(stu) // Person { sno: 111 } 没有继承的 name 和 friends 属性

// 2.第二个弊端: 创建出来两个stu的对象
var stu1 = new Student()
var stu2 = new Student()

// 直接修改对象上的属性, 是给本对象添加了一个新属性
// 赋值新属性
stu1.name = 'kobe'
console.log(stu2.name)

// 获取引用, 修改引用中的值, 会相互影响
// 引用类型, 不一样, 修改引用类型, 需要格外注意!!!
stu1.friends.push('kobe')

console.log(stu1.friends)
console.log(stu2.friends)

// 3.第三个弊端: 在前面实现类的过程中都没有传递参数, 没有个性化定制独有数据
var stu3 = new Student('lilei', 112)

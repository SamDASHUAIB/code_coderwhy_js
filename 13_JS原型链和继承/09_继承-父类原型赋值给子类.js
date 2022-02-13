// 父类: 公共属性和方法
function Person(name, age, friends) {
  // this = stu
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.eating = function () {
  console.log(this.name + ' eating~')
}

// 子类: 特有属性和方法
function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends)
  // this.name = name
  // this.age = age
  // this.friends = friends
  this.sno = sno
}
function Teacher(name, age, friends, teacherNum) {
  Person.call(this, name, age, friends)
  // this.name = name
  // this.age = age
  // this.friends = friends
  this.teacherNum = teacherNum
}

// 直接将父类的原型赋值给子类, 作为子类的原型
Student.prototype = Person.prototype
Teacher.prototype = Person.prototype

// Person.prototype 上也有了 studying 函数, 这是不对的, Person.prototype 上应该只能有 Person 共有的函数, 而不应该同时混淆了 Student 的函数
Student.prototype.studying = function () {
  console.log(this.name + ' studying~')
}
// 这下, Person.prototype 上也有了 teaching 函数, 意味着 Student.prototype 上也有了 teaching 函数, Student 也可以访问 teaching 了, 这下完全乱套了, Person.prototype 这样下去, 混乱不堪, 越来越庞杂, 无法管理
Teacher.prototype.teaching = function () {
  console.log(this.name + ' teaching~')
}

// name/sno
var stu = new Student('why', 18, ['kobe'], 111)
console.log(stu)
stu.eating()

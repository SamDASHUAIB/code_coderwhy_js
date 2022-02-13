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
  // 调用父类构造 绑定 this 为新创建的 Student 对象(stu)
  // 借用构造函数 ********
  Person.call(this, name, age, friends) // 调用一次 Person ********
  // this.name = name
  // this.age = age
  // this.friends = friends
  this.sno = sno
}

var p = new Person() // 调用第二次 Person **********
Student.prototype = p

Student.prototype.studying = function () {
  console.log(this.name + ' studying~')
}

// name/sno
var stu = new Student('why', 18, ['kobe'], 111)

// console.log(stu.name)
// stu.eating()

// stu.studying()

// 原型链实现继承已经解决的弊端
// 1.第一个弊端: 打印stu对象, 继承的属性是看不到的
console.log(stu)

// 2.第二个弊端: 创建出来两个stu的对象
var stu1 = new Student('why', 18, ['lilei'], 111)
var stu2 = new Student('kobe', 30, ['james'], 112)

// 直接修改对象上的属性, 是给本对象添加了一个新属性
stu1.name = 'kobe'
console.log(stu1.name)
console.log(stu2.name)

// 获取引用, 修改引用中的值, 会相互影响
stu1.friends.push('lucy')
// 每次 new 调用 Student 都会新建一个 friends 数组, 因此不会相互影响
console.log(stu1.friends) // [ 'lilei', 'lucy' ]
console.log(stu2.friends) // [ 'james' ]

// 3.第三个弊端: 在前面实现类的过程中都没有传递参数
// 传递参数作为个性化数据
var stu3 = new Student('lilei', 112)

// 强调: 借用构造函数也是有弊端:
/*
  两个弊端
  Person 函数至少被调用了两次
    多余调用
  stu 的原型对象上会多出一些属性, 但是这些属性是没有存在的必要
    stu.__proto__ === Student.prototype === p
    new Person(), 执行 Person 构造函数, 会生成 name age ... 等属性, 且值为 undefined
    这些值完全是不需要的, 是冗余的, 因为 每个 Student 的实例 stu 身上都有独有的 name age ... 等属性
*/

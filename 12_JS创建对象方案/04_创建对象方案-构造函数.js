// 规范: 构造函数的首字母一般是大写
function Person(name, age, height, address) {
  this.name = name
  this.age = age
  this.height = height
  this.address = address

  this.eating = function () {
    console.log(this.name + '在吃东西~')
  }

  this.running = function () {
    console.log(this.name + '在跑步')
  }
}
// p1 和 p2 经由构造函数产生, 因此有了具体类型 Person
var p1 = new Person('张三', 18, 1.88, '广州市')
var p2 = new Person('李四', 20, 1.98, '北京市')

console.log(p1)
console.log(p2)
p1.eating()
p2.eating()
console.log(p1.eating === p2.eating) // false 这就是构造函数的缺陷所在, 函数冗余
/*
  new 操作符调用函数进行的操作
    内存中创建一个空对象 => {}
    这个对象内部的 [[prototype]] 属性会被赋值为构造函数的 prototype 属性 => 原型继承
    构造函数内部的 this 指向创建出来的空对象 => this 挂载
    执行函数内部代码 => 具体构造
    如果构造函数没有返回非空对象, 返回此创建出来的新对象 => 返回新对象

    {}
    原型继承
    this 挂载
    具体构造
    返回对象
*/

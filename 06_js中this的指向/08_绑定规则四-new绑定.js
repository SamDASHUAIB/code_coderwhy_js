/*
  new 绑定 => 使用 new 关键字调用一个函数(构造函数), 这个时候 this 是 构造函数创建的一个新的对象
  this = 创建出来的对象
  这个绑定过程就是 new 绑定
*/

function Person(name, age) {
  this.name = name
  this.age = age
}

var p1 = new Person('why', 18)
console.log(p1.name, p1.age)

var p2 = new Person('kobe', 30)
console.log(p2.name, p2.age)

var obj = {
  foo: function () {
    console.log(this)
  },
}

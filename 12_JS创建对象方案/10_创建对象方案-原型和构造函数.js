// 构造函数 + 原型对象
// 私有的属性, 放在 构造函数中
function Person(name, age, height, address) {
  this.name = name
  this.age = age
  this.height = height
  this.address = address
}
/*
  公有的方法, 放到原型对象上(显式原型)
*/
Person.prototype.eating = function () {
  console.log(this.name + '在吃东西~')
}
Person.prototype.running = function () {
  console.log(this.name + '在跑步~')
}
var p1 = new Person('why', 18, 1.88, '北京市')
var p2 = new Person('kobe', 20, 1.98, '洛杉矶市')
console.log(p1.eating === p2.eating)

/*
  创建对象的方案
    字面量
    工厂模式
      优点: 批量, 简便。
      缺点: 获取不到对象最真实的类型(具体的类型无法知晓)
    构造函数
      优点: 能够知晓具体类型
      缺点: 函数冗余
    构造函数 + 原型对象 ***
      具体类型显示 + 函数共用
*/

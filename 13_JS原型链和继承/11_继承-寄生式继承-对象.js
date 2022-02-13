// 原型继承 + 工厂函数 => 寄生式继承
var personObj = {
  running: function () {
    console.log('running')
  },
}

// 工厂函数, 增强
function createStudent(name) {
  var stu = Object.create(personObj)
  stu.name = name
  // 函数冗余, 没有放在原型上
  stu.studying = function () {
    console.log('studying~')
  }
  return stu
}

var stuObj = createStudent('why')
var stuObj1 = createStudent('kobe')
var stuObj2 = createStudent('james')

console.log(stuObj) // { name: 'why', studying: [Function (anonymous)] } 看不出具体类型
console.log(stuObj.studying === stuObj1.studying) // false 这就是弊端啦, 每个对象都有一份 不同的 studying 方法, 又产生冗余啦
console.log(stuObj.running === stuObj1.running) // true
/*
  两个弊端
    看不出具体类型 stu.constructor.name 沿着原型链找 => (stu.__proto__)personObj.constructor.name => (stu.__proto__.proto__ OR personObj.__proto__)Object.prototype.constructor.name => 'Object' 说明没有具体的类型
    每个对象都产生一份方法, 产生冗余
*/

var name = 'window'

var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name)
  },
}

function sayName() {
  var sss = person.sayName
  sss() // window: 独立函数调用
  person.sayName() // person: 隐式调用
  // 这个括号是迷惑性的, 没有用的。
  person.sayName() // person: 隐式调用
  ;(b = person.sayName)() // window: 赋值表达式(独立函数调用)
}

sayName()

function foo() {
  console.log(this)
}

// foo.call("aaa")
// foo.call("aaa")
// foo.call("aaa")
// foo.call("aaa")

// 默认绑定和显示绑定bind冲突: 优先级(显示绑定)
// bind 返回一个绑定了指定 this 的新的函数
var newFoo = foo.bind('aaa')

newFoo()
newFoo()
newFoo()
newFoo()
newFoo()
newFoo()

var bar = foo
console.log(bar === foo)
console.log(newFoo === foo)

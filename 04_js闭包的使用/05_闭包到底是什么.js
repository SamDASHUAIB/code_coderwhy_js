function foo() {
  // AO: 销毁
  var name = 'foo'
  function bar() {
    console.log('bar', name)
  }

  return bar
}

var fn = foo()
fn()

var name = 'why'
function demo() {
  console.log(name)
}

// 可以访问: test就是闭包
// 有访问到: test就是不是闭包
function test() {
  // 1
  // 10000
}

/*
  闭包是什么?
    一个函数, 可以访问外层作用域的自由变量的函数。
*/

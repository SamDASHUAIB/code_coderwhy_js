// 1.案例一:
/*
  全局 globalThis 是否有 arguments ?
    Node 环境: 有
    浏览器: 无
*/
var foo = () => {
  console.log(arguments)
}

foo() // 箭头函数没有 arguments 且往上层作用域去找 arguments 也就是 globalThis 的 arguments

// 2.案例二:
function foo() {
  // 箭头函数的 arguments 是外层的
  var bar = () => {
    console.log(arguments)
  }
  return bar
}

var fn = foo(123)
fn() // [Arguments] { '0': 123 }

// 3.案例三:
// rest 参数, 替代 arguments
var foo = (...args) => {
  console.log(args)
}

foo(10, 20, 30, 40, 50) // [ 10, 20, 30, 40, 50 ]

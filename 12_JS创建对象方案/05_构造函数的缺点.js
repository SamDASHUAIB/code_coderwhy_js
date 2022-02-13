function foo() {
  function bar() {}
  return bar
}
/*
  函数也是一个对象
*/
var fn1 = foo()
var fn2 = foo()
/*
  两个函数对象 fn1 和 fn2 不是同一个对象
*/
console.log(fn1 === fn2)

async function foo() {
  console.log('foo function start~')

  console.log('内部的代码执行1')
  console.log('内部的代码执行2')
  console.log('内部的代码执行3')

  console.log('foo function end~')
}

console.log('script start')
console.log(foo()) // async 修饰的函数, 返回的结果一定是一个 Promise
console.log('script end')

/*
  async 修饰的函数, 返回的结果一定是一个 Promise
  await 后面跟 Promise
    Promise
    普通值 => Promise.resolve(值)
    thenable 对象
  await 后面跟一个 rejected 的 Promise。
  那么 async 函数的返回值就是这个 rejected 状态的 Promise 了。（抛出异常，中断执行）
  若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
*/

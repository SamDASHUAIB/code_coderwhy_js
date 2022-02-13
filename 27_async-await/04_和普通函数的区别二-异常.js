async function foo() {
  console.log('foo function start~')

  console.log('中间代码~')

  // 异步函数中的异常, 会被作为异步函数返回的Promise的reject值的
  // 相当于 Promise.reject(new Error('error message')) , 区别在于 throw 立即中断执行而 Promise.reject 后面的代码会继续执行
  // throw new Error('error message')
  Promise.reject(new Error('error message'))

  console.log('foo function end~')
}

// 异步函数的返回值一定是一个Promise
foo().catch((err) => {
  console.log('coderwhy err:', err)
})

console.log('后续还有代码~~~~~')

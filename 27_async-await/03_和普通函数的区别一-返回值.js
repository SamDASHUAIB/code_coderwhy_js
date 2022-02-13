async function foo() {
  console.log('foo function start~')

  console.log('中间代码~')

  console.log('foo function end~')

  // 1.返回一个值 =》 Promise.resolve(值)

  // 2.返回thenable, 调用 then 方法,
  // return {
  //   then: function(resolve, reject) {
  //     resolve("hahahah")
  //   }
  // }

  // 3.返回Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hehehehe')
    }, 2000)
  })
}

// 异步函数的返回值一定是一个Promise
const promise = foo()
// res 就是 resolve(值) 中的 值
promise.then((res) => {
  console.log('promise then function exec:', res)
})

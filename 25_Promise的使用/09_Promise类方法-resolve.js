// 转成Promise对象
// function foo() {
//   const obj = { name: "why" }
//   return new Promise((resolve) => {
//     resolve(obj)
//   })
// }

// foo().then(res => {
//   console.log("res:", res)
// })

// 类方法 Promise.resolve 相当于 new Promise(resolve => {resolve({ name: 'why' })})
// 1.普通的值
const promise = Promise.resolve({ name: 'why' })
// 相当于
const promise = new Promise((resolve) => {
  resolve({ name: 'why' })
})

// 2.传入Promise 移交
const promise = Promise.resolve(
  new Promise((resolve, reject) => {
    // 传入 resolve 方法的 Promise 决定
    resolve('11111')
  })
)
promise.then((res) => {
  console.log('res:', res)
})

// 3.传入thenable对象, 先执行 then 方法, Promise 的状态由 then 方法的执行结果决定

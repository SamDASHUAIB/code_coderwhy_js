const promise = new Promise((resolve, reject) => {
  resolve()
  // reject("rejected status")
  // throw new Error("rejected status")
})

// 1.当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的
// promise.then(undefined, err => {
//   console.log("err:", err)
//   console.log("----------")
// })

// 2.通过catch方法来传入错误(拒绝)捕获的回调函数
// promise/a+规范
// promise.catch(err => {
//   console.log("err:", err)
// })
// catch 优先捕获 promise 的 reject 或者 异常, 若没有, 再捕获 then 方法中的 reject 或者 异常
promise
  .then((res) => {
    // return new Promise((resolve, reject) => {
    //   reject("then rejected status")
    // })
    throw new Error('error message')
  })
  .catch((err) => {
    console.log('err:', err)
  })
// 3.拒绝捕获的问题(前面课程)
promise.then(
  (res) => {},
  (err) => {
    console.log('err:', err)
  }
)
const promise = new Promise((resolve, reject) => {
  reject('111111')
  // resolve()
})
// 链式调用, 相当于消费一次 promise 写了 catch 就不会 拒绝捕获 reject
promise
  .then((res) => {})
  .then((res) => {
    throw new Error('then error message')
  })
  .catch((err) => {
    console.log('err:', err)
  })

// 独立调用, 互不影响, 相当于消费两次 promise 浏览器报错, node 提示错误信息, 执行到 then 的时候, 没有 catch 掉 reject 中断执行
promise.then((res) => {})
promise.catch((err) => {})

// 4.catch方法的返回值
const promise = new Promise((resolve, reject) => {
  reject('111111')
})

promise
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err)
    return 'catch return value'
    // 记住 catch 只不过是 then(undefined, (err) => {...}) 的语法糖而已, catch 方法 return 的依旧是一个新的 Promise(resolve 包裹)
  })
  .then((res) => {
    console.log('res result:', res)
  })
  .catch((err) => {
    console.log('err result:', err)
  })

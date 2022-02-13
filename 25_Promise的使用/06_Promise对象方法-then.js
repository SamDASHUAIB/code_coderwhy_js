// Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve('hahaha')
})

// 1.同一个Promise可以被多次调用then方法, 多次消费。
// 当我们的resolve方法被回调时, 所有的then方法传入的回调函数都会被调用
// promise.then((res) => {
//   console.log('res1:', res)
// })
// promise.then((res) => {
//   console.log('res2:', res)
// })

// promise.then((res) => {
//   console.log('res3:', res)
// })

// 2.then方法传入的 "回调函数: 可以有返回值, 返回值是一个新的 Promise => 链式调用
// then方法本身也是有返回值的, 它的返回值是Promise then 方法的返回值是一个新的 Promise

// 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值
promise
  .then((res) => {
    return 'aaa'
    // return new Promise((resolve) => {
    //   resolve('aaa')
    // })
  })
  .then((res) => {
    console.log('res:', res)
    return 'bbbbbb'
  })

// 2> 如果我们返回的是一个Promise, 移交
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(111111)
      }, 3000)
    })
    // return new Promise((resolve) => {
    //   resolve(
    //     new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve(111111)
    //       }, 3000)
    //     })
    //   )
    // })
  })
  .then((res) => {
    console.log('res:', res)
  })

// 3> 如果返回的是一个对象, 并且该对象实现了thenable

const promise = new Promise((resolve, reject) => {
  resolve('hahaha')
})
promise
  .then((res) => {
    return {
      then: function (resolve, reject) {
        resolve(222222)
      },
    }
  })
  .then((res) => {
    console.log('res:', res)
  })

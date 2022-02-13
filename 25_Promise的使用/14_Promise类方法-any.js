// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(11111)
    reject(1111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 500)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(33333)
    reject(3333)
  }, 3000)
})

// any方法, 等一个 resolved 的 Promise 如果都是 rejected 那么收集所有 rejected 的结果为 数组
Promise.any([p1, p2, p3])
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err.errors)
  })

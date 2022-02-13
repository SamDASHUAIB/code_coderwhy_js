// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(22222)
    resolve(22222)
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(33333)
  }, 3000)
})

// 需求: 所有的Promise都变成fulfilled时, 再拿到结果
// 在拿到所有结果之前, 有一个 promise 变成了 rejected, 那么整个 promise 就是这个 rejected 的值
// 'aaa' => Promise.resolve('aaa')
Promise.all([p2, p1, p3, 'aaaa'])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log('err:', err)
  })

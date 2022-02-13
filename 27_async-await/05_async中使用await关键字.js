// 1.await更上表达式
function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(222)
      reject(1111)
    }, 1000)
  })
}

// async 函数返回的是一个 promise
async function foo() {
  // catch 方法返回的也是一个 Promise （Promise.resolve()包裹）
  const res1 = await requestData().catch((err) => err)
  // const res1 = await requestData()
  // 后面的代码, 相当于是在 requestData 这个 promise 的 then 里面执行的。
  console.log('res1后面的代码1', res1)
  console.log('后面的代码2')
  console.log('后面的代码3')

  const res2 = await requestData().catch((err) => err)
  // const res2 = await requestData()
  console.log('res2后面的代码', res2)
}

foo().catch((err) => {
  console.log('err:', err)
})

// 2.跟上其他的值
async function foo() {
  // const res1 = await 123
  // const res1 = await {
  //   then: function(resolve, reject) {
  //     resolve("abc")
  //   }
  // }
  const res1 = await new Promise((resolve) => {
    resolve('why')
  })
  console.log('res1:', res1)
}

// 3.reject值
async function foo() {
  // await 后面跟着的 promise 返回一个 reject 值的话, 这个 reject 值就是整个 async 函数的返回值了 => 一个 rejected 状态的 Promise
  const res1 = await requestData()
  console.log('res1:', res1)
}

foo().catch((err) => {
  console.log('err:', err)
})

// await 等待 resolve(xxxx) 取到 xxx

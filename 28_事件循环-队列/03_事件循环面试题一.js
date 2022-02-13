setTimeout(function () {
  console.log('setTimeout1')
  new Promise(function (resolve) {
    resolve()
  }).then(function () {
    new Promise(function (resolve) {
      resolve()
    }).then(function () {
      console.log('then4')
    })
    console.log('then2')
  })
})

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('then1')
})

setTimeout(function () {
  console.log('setTimeout2')
})

console.log(2)

queueMicrotask(() => {
  console.log('queueMicrotask1')
})

new Promise(function (resolve) {
  resolve()
}).then(function () {
  console.log('then3')
})

// promise1
// 2
// then1
// queueMicrotask1
// then3
// setTimeout1
// then2
// then4
// setTimeout2

/*
  宏任务队列: 普通callback 定时器 ajax DOM UI Rendering
  微任务队列: queueMicrotask Promise对象的 then 回调
  规范: 在执行任何的宏任务之前, 都必须保证微任务队列被清空了。
*/

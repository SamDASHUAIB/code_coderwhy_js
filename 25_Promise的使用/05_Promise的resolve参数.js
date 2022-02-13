/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled
 *  2> 传入一个Promise
 *    相当于状态进行了移交, 由传入的 Promise 来决定当前 Promise 的状态
 *  3> 传入一个对象, 并且这个对象有实现then方法(或者说这个对象是实现了thenable接口)。
 *    执行 then 方法， 并且由该 then 方法决定当前 Promise 的状态
 */

// 1.传入Promise的特殊情况
// const newPromise = new Promise((resolve, reject) => {
//   // resolve("aaaaaa")
//   reject("err message")
// })

// new Promise((resolve, reject) => {
//   // pending -> fulfilled
//   resolve(newPromise)
// }).then(res => {
//   console.log("res:", res)
// }, err => {
//   console.log("err:", err)
// })

// 2.传入一个对象, 这个兑现有then方法
new Promise((resolve, reject) => {
  // pending -> fulfilled
  const obj = {
    then: function (resolve, reject) {
      // resolve("resolve message")
      reject('reject message')
    },
  }
  resolve(obj)
}).then(
  (res) => {
    console.log('res:', res)
  },
  (err) => {
    console.log('err:', err)
  }
)

// eatable/runable
const obj = {
  eat: function () {},
  run: function () {},
}

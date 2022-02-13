// let m = 100

// // 一段代码
// console.log(m)
// console.log(m * 2)
// console.log(m ** 2)
// console.log("Hello World")

// m = 200

// 对象的响应式
const obj = {
  name: 'why',
  age: 18,
}

const newName = obj.name
console.log('你好啊, 李银河')
console.log('Hello World')
console.log(obj.name) // 100行

obj.name = 'kobe'

/*
  响应式：变量发生变化（get set 读取, 赋值） =》自动执行一段代码（用到此变量 OR 没有用到此变量）

  (最常用)对象的响应式：监听属性的变化(用到此变量) =》自动执行一段代码
    两个要点：自动（借助 Proxy 强大的捕获器） + 执行（调用函数）
  监听属性的变化，Object.defineProperty() Proxy 中的 各类 捕获器
*/

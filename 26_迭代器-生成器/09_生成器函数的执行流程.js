// 当遇到yield时候值暂停函数的执行
// 当遇到return时候生成器就停止执行
// yield 可以看做是一个特殊的 return 不会结束函数, 跳出运行栈而是暂停执行
function* foo() {
  console.log('函数开始执行~')

  const value1 = 100
  console.log('第一段代码:', value1)
  yield value1 // yield 后面跟着的值, 作为 next() 返回的 对象 中 value 值 {done: false, value: yield 后面跟着的值}

  const value2 = 200
  console.log('第二段代码:', value2)
  yield value2

  const value3 = 300
  console.log('第三段代码:', value3)
  yield value3

  console.log('函数执行结束~')
  return '123'
}

// generator本质上是一个特殊的iterator
const generator = foo()
console.log('返回值1:', generator.next())
console.log('返回值2:', generator.next())
console.log('返回值3:', generator.next())
console.log('返回值3:', generator.next())

/*
  或者说, yield 将函数分隔成 一个个的 "小函数" yield 后面跟着的值, 就是这段 "小函数" 的返回值
*/

function* foo(num) {
  console.log('函数开始执行~')

  const value1 = 100 * num
  console.log('第一段代码:', value1)
  const n = yield value1 // 固定语法 n 作为 后面 "小函数" 的参数, 值不是 yield value1 而是又 next() 中传入的

  const value2 = 200 * n
  console.log('第二段代码:', value2)
  const count = yield value2

  const value3 = 300 * count
  console.log('第三段代码:', value3)
  yield value3

  console.log('函数执行结束~')
  return '123'
}

// 生成器上的 next 方法可以传递参数
const generator = foo(5)
console.log(generator.next())
// 第二段代码, 第二次调用next的时候执行的
console.log(generator.next(10)) // 给一小段代码传递参数
console.log(generator.next(25))

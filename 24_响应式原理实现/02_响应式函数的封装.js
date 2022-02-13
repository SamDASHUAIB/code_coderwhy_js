let reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
}

const obj = {
  name: 'why',
  age: 18,
}
watchFn(function () {
  const newName = obj.name
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(obj.name) // 100行
})
watchFn(function () {
  console.log(obj.name, 'demo function -------')
})

function bar() {
  console.log('普通的其他函数')
  console.log('这个函数不需要有任何响应式')
}
// 对象中属性, 发生改变
obj.name = 'kobe'
// 触发响应式, 执行一段代码
reactiveFns.forEach((fn) => {
  fn()
})

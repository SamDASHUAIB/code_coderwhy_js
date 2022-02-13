/*
  依赖收集 + 执行函数
*/
class Depend {
  // 响应式函数数组(待执行池)
  constructor() {
    this.reactiveFns = []
  }
  // 往执行池, 添加响应式函数
  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }
  // 遍历执行池, 实现响应式
  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}
const depend = new Depend()
// 多包一层, 其实意义不大
// function watchFn(fn) {
//   depend.addDepend(fn)
// }

// 需要添加响应式的对象。
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}
function fn1() {
  const newName = obj.name
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(obj.name) // 100行
}
function fn2() {
  console.log(obj.name, 'demo function -------')
}
// watchFn(fn1)
// watchFn(fn2)
depend.addDepend(fn1)
depend.addDepend(fn2)

// 对象的属性 name 发生变化, 触发响应式(暂时是手动的)
obj.name = 'kobe'
depend.notify() // 现在还是我们手动触发响应式。

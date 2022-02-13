class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    depend.notify()
  },
})
// 依赖收集
watchFn(function () {
  const newName = objProxy.name
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(objProxy.name) // 100行
})

watchFn(function () {
  console.log(objProxy.name, 'demo function -------')
})

watchFn(function () {
  console.log(objProxy.age, 'age 发生变化是需要执行的----1')
})

watchFn(function () {
  console.log(objProxy.age, 'age 发生变化是需要执行的----2')
})
// 自动检测到 set 操作, 执行依赖
// 不用我们手动调用 depend.notify() 方法
objProxy.name = 'kobe'
objProxy.name = 'james'
objProxy.name = 'curry'

objProxy.age = 100
/*
  弊端: 不管改的是 name 还是 age 属性, 所有的函数都会一起执行
  (有些用到了 name 有些用到了 age, 应该区分)
  (name 和 age 用的都是同一个 depend 对象也就是同一个 reactiveFns 执行池)
  合理的方案:
    改 name 那么 name 相关的(使用了 name)响应式部分执行
    改 age 那么 age 相关的(使用了 age)响应式部分执行
  也就是要做到有区分的依赖收集 => 不同的属性对应不同的 depend(互不干扰)。

  不同的对象, 不同的属性
  不同的属性, 不同的 depend
*/

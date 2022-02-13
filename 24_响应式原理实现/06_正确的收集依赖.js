class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    console.log(this.reactiveFns)
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

let activeReactiveFn = null
// 需要把 fn 函数放入到正确的依赖中
// 正确的依赖：某个对象的某个属性专属的 depend （用了谁就是谁的 depend 截取 get 操作）
function watchFn(fn) {
  activeReactiveFn = fn
  fn() // 函数必须执行一次, 才知道 用到了哪一个属性, 从而使用 Proxy 的 get 捕获器拦截之, 最终将 fn 放入正确的依赖
  activeReactiveFn = null
}
// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // 根据target.key获取对应的depend(容器)
    const depend = getDepend(target, key)
    // 给正确的 depend 对象中添加响应函数(当前激活的函数)
    // activeReactiveFn 是全局变量
    depend.addDepend(activeReactiveFn)
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    const depend = getDepend(target, key)
    // 正确的依赖, 执行之
    depend.notify()
  },
})

watchFn(function () {
  console.log('-----第一个name函数开始------')
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(objProxy.name) // 100行
  console.log('-----第一个name函数结束------')
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

watchFn(function () {
  console.log(objProxy.name, '新函数')
  console.log(objProxy.age, '新函数')
})

console.log('------------------------------改变obj的name值')

objProxy.name = 'kobe'
// objProxy.name = "james"

// objProxy.age = 20
// objProxy.age = 30

/*
  objProxy.name 获取值 通过点运算符访问了 name 属性 => 收集依赖到 depend 中(专属于 name 属性)
  objProxy.name = 'sam' 设置值 针对 name 属性进行赋值 => 执行 name 属性对应的 depend 中的响应式代码
*/

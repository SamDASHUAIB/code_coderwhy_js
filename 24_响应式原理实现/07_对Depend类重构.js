// 保存当前需要收集的响应式函数，以待后续添加到执行池中
let activeReactiveFn = null

/**
 * Depend优化:
 *  1> depend方法
 *  2> 使用Set来保存依赖函数, 而不是数组[] 避免重复
 */

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.add(reactiveFn)
  // }

  depend() {
    // 健壮性, activeReactiveFn 激活的响应式函数(watchFn 调用)存在, 才需要添加到 执行池中
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
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
  test: {
    name: 'sam',
  },
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // 根据 target.key 获取对应的 depend
    const depend = getDepend(target, key)
    // 给 depend 对象中添加响应函数
    // depend.addDepend(activeReactiveFn)
    depend.depend()

    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    // depend.notify()
    const depend = getDepend(target, key)
    depend.notify()
  },
})

// watchFn
watchFn(() => {
  console.log(objProxy.test.name, '-------')
  console.log(objProxy.test.name, '+++++++')
})
/*
  这里存在很大的问题, 多层嵌套的 object 的依赖存在问题
  objProxy.test = { name: 'xusong' } 起效
  objProxy.test.name = 'xusong' 不起效
*/
objProxy.test = { name: 'xusong' }
objProxy.test = { name: 'xusong' }

/*
  depend
    Set 作为容器
    depend 方法，添加响应式函数到执行池中
    notify 方法，依次执行响应式函数
  watchFn 函数
    执行一次响应式函数 + 保存响应式函数的引用（给 get 操作以及 depend 函数）
  正确的 depend getDepend 函数
    WeakMap
      key：对象
      value：Map
        key：属性
        value：专属于某个对象的某个属性的 depend
  依赖收集 get 操作
  依赖执行 set 操作
*/

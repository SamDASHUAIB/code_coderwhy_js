// 保存当前需要收集的响应式函数
let activeReactiveFn = null

/**
 * Depend优化:
 *  1> depend方法
 *  2> 使用Set来保存依赖函数, 而不是数组[]
 */

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.add(reactiveFn)
  // }

  depend() {
    // 健壮性
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

// 封装一个获取 depend 函数, 这个 depend 加入到了正确的依赖中
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据 target 对象获取map的过程
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
// 返回一个响应式对象
function reactive(obj) {
  // {name: "why", age: 18}
  // ES6之前, 使用Object.defineProperty
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: function () {
        // 获取 depend (某个对象的某个属性的专有容器)
        const depend = getDepend(obj, key)
        // 添加函数到响应式执行池中
        depend.depend()
        return value
      },
      set: function (newValue) {
        value = newValue
        // 获取 depend (某个对象的某个属性的专有容器)
        const depend = getDepend(obj, key)
        // 遍历执行响应式执行池中的所有函数
        depend.notify()
      },
    })
  })
  return obj
}
// 监听对象的属性变化: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = reactive({
  name: 'why', // depend对象
  age: 18, // depend对象
})

const infoProxy = reactive({
  address: '广州市',
  height: 1.88,
})

watchFn(() => {
  console.log(infoProxy.address)
})

infoProxy.address = '北京市'

const foo = reactive({
  name: 'foo',
})

watchFn(() => {
  console.log(foo.name)
})

foo.name = 'bar'
foo.name = 'hhh'

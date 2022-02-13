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
    // 添加响应式函数
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    // 执行响应式函数
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn
  fn() // 调用一次函数, 才知道用了哪些对象的哪些属性, 触发 Proxy.get OR Proxy.set
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
// 返回一个响应式对象
function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      // 根据target.key获取对应的depend
      // obj.xxx 将 xxx 添加到正确的依赖
      const depend = getDepend(target, key)
      // 给depend对象中添加响应函数
      // depend.addDepend(activeReactiveFn)
      depend.depend()

      return Reflect.get(target, key, receiver)
    },
    // obj.xxx = yyy 执行响应式函数
    set: function (target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      // depend.notify()
      const depend = getDepend(target, key)
      depend.notify()
    },
  })
}
// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
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
  console.log('哈哈哈哈哈')
})

infoProxy.address = '北京市'

const foo = reactive({
  name: 'foo',
})

watchFn(() => {
  console.log(foo.name)
})

foo.name = 'bar'

/*
  判断 value 是不是一个 Object 类型
  是 递归, 剥掉一层
*/
function isObject(value) {
  const valueType = typeof value
  return value !== null && valueType === 'object'
}

function getDepend(target, key) {
  if (isObject(target[key])) {
    // 递归
    getDepend(target[key], key)
  }
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

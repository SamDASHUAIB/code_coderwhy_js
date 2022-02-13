const obj = {
  name: 'why',
  age: 18,
}

const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    console.log('get---------')
    return Reflect.get(target, key)
  },
  set: function (target, key, newValue, receiver) {
    console.log('set---------')
    target[key] = newValue

    const result = Reflect.set(target, key, newValue)
    if (result) {
    } else {
    }
  },
})

objProxy.name = 'kobe'
console.log(objProxy.name)
/*
  Reflect 提供了操作 JavaScript 对象的方法,
  有点像 Object 中操作对象的方法。
    集中管理了 操作 JavaScript 对象的各类方法
    将 in delete 操作符 =》对应的函数行为，更加规范
    Reflect + Proxy 搭配使用
      只要 Proxy 对象的方法, 就能在 Reflect 对象上找到对应的方法。
      在 Proxy 对象中调用 对应的 Reflect 方法，完成默认行为，作为 Proxy 修改行为的基础
      也就是说，不管 Proxy 怎么修改，增强默认行为，你总可以在 Reflect 上获取 “原始的默认行为” =》兜底，保证最基本的功能

      Proxy =》额外功能，增强
      Reflect =》基础功能，保证，兜底，正常运行。保证原生行为能够正常执行。
*/

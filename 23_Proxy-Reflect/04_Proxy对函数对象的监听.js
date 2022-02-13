function foo() {}

const fooProxy = new Proxy(foo, {
  /*
    apply 拦截 函数调用 apply call 调用
    target 目标对象
    thisArg 目标对象的 this (上下文对象)
    argArray 目标对象的参数数组
  */
  apply: function (target, thisArg, argArray) {
    console.log('对foo函数进行了apply调用')
    return target.apply(thisArg, argArray)
  },
  // 拦截 new 命令
  /*
    target 目标对象
    argArray 构造函数的参数数组
    newTarget 创建实例对象时, new 命令作用的构造函数
  */
  construct: function (target, argArray, newTarget) {
    console.log('对foo函数进行了new调用')
    // 必须返回一个对象, 否则报错
    return new target(...argArray)
  },
})

fooProxy.apply({}, ['abc', 'cba'])
new fooProxy('abc', 'cba')

const obj = {
  _name: 'why',
  // name 设置了 getter 读取函数, 读取函数内部的 this 需要绑定 receiver 以确保 this 是 Proxy 代理对象
  get name() {
    // 这里的 this 要绑定 Proxy 代理对象, 也就是 receiver, 只需要在 Reflect.get() 中传入 receiver 参数就绑定成功了。
    return this._name
  },
  // 和 getter 一样, 属性设置了 setter 赋值函数, this 需要绑定 receiver 以确保 this 是 Proxy 代理对象
  set name(newValue) {
    this._name = newValue
  },
}

const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // receiver是创建出来的代理对象
    console.log('get方法被访问--------', key, receiver)
    console.log(receiver === objProxy)
    // receiver 绑定 Proxy 代理对象
    // this 绑定 Reflect.get(...) 中的 receiver
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    console.log('set方法被访问--------', key)
    Reflect.set(target, key, newValue, receiver)
  },
})

/*
get方法被访问-------- name { _name: 'why', name: [Getter/Setter] }
true
get方法被访问-------- _name { _name: 'why', name: [Getter/Setter] }
true
*/
objProxy.name = 'kobe'
objProxy.name

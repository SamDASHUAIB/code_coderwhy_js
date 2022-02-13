var obj = {
  // 私有属性(js里面是没有严格意义的私有属性)
  _age: 18,
  _eating: function () {},
  set age(value) {
    this._age = value
  },
  get age() {
    return this._age
  },
}
/*
  第二个参数: 属性描述符对象的集合
  和 Object.defineProperty 方法一样, configurable enumerable writable 的默认值为 false
  value 的默认值为 undefined
*/
Object.defineProperties(obj, {
  name: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'why',
  },
  age: {
    configurable: true,
    enumerable: true,
    get: function () {
      return this._age
    },
    set: function (value) {
      this._age = value
    },
  },
})

obj.age = 19
console.log(obj.age)

console.log(obj)

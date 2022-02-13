function isObject(value) {
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue) {
  // 判断是否是一个Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是一个Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断如果是Symbol的value, 那么创建一个新的Symbol
  if (typeof originValue === 'symbol') {
    // originValue.description 返回 symbol 值的描述。
    return Symbol(originValue.description)
  }

  // 判断如果是函数类型, 那么直接使用同一个函数
  if (typeof originValue === 'function') {
    return originValue
  }

  // 判断传入的 originValue 是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue
  }

  // 判断传入的对象是数组, 还是对象
  const newObject = Array.isArray(originValue) ? [] : {}
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key])
  }

  // 对 Symbol 的 key 进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = deepClone(originValue[sKey])
  }

  return newObject
}

const arr = [1, 2, 3, 4, 5]
console.log(arr['0'])
for (const key in arr) {
  console.log(typeof key, key)
}

// 测试代码
let s1 = Symbol('aaa')
let s2 = Symbol('bbb')
console.log(typeof s1) // symbol

const obj = {
  name: 'why',
  age: 18,
  friend: {
    name: 'james',
    address: {
      city: '广州',
    },
  },
  // 数组类型
  hobbies: ['abc', 'cba', 'nba'],
  // 函数类型
  foo: function (m, n) {
    console.log('foo function')
    console.log('100代码逻辑')
    return 123
  },
  // Symbol 作为 key 和 value
  [s1]: 'abc',
  s2: s2,
  // Set/Map
  set: new Set(['aaa', 'bbb', 'ccc']),
  map: new Map([
    ['aaa', 'abc'],
    ['bbb', 'cba'],
  ]),
}

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = 'kobe'
obj.friend.address.city = '成都'
console.log(newObj)
console.log(newObj.s2 === obj.s2)

/*
  对 函数 数组 Set Map Symbol 值的处理
    函数 -> 直接返回原值，无需深拷贝
      typeof 方法判断 -> function
    数组 -> 给一个空的 [] 继续递归
      使用 isArray 方法进行判断
      数组里面的元素可能是对象
    Set -> return new Set(...[originValue])
      instanceof 方法进行判断
    Map -> return new Map(...[originValue])
      instanceof 方法进行判断
    Symbol
      value 是 Symbol return Symbol(originValue.description)
  key 是普通的 string 递归
    for in 循环
    newObject[key] = deepClone(originValue[key])
  key 是 Symbol 另一套，专属于 Symbol 的递归
    Object.getOwnPropertySymbols(originValue)
    newObject[sKey] = deepClone(originValue[sKey], map)
*/
/*
  函数的封装，就是为了多次复用里面的逻辑。不需要深拷贝一个函数。
*/

const isObject = function (value) {
  const valueType = typeof value
  return value !== null && (valueType !== 'object' || valueType === 'function')
}
const isObject = function (value) {
  const valueType = typeof value
  return value !== null && (valueType !== 'object' || valueType === 'function')
}

const deepClone = function (originValue, map = new WeakMap()) {
  // 函数
  if (typeof originValue === 'function') {
    return originValue
  }
  // Set Map
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }
  // Symbol 值的处理(value)
  if (typeof originValue === 'symbol') {
    return new Symbol(originValue.description)
  }
  // 原始值的处理
  if (!isObject(originValue)) {
    return originValue
  }
  // 循环引用, 普通递归条件失效, 我们需要 return 中断执行, 直接返回引用。
  if (map.has(originValue)) {
    return originValue
  }
  // Array Or Object
  const newObject = Array.isArray(originValue) ? [] : {}
  map.set(originValue, newObject)
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map)
  }
  // 如果键值是 Symbol, 另一套递归系统
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    newObject[sKey] = deepClone(originValue[sKey], map)
  }
  return newObject
}

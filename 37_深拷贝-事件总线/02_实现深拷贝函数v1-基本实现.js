function isObject(value) {
  /*
    typeof 返回 object 的情况
      null 数组 普通对象
      null 需要排除
    函数其实也是一种对象
  */
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue) {
  // 判断传入的originValue是否是一个对象类型
  // 非对象类型, 无需处理，直接返回原值
  if (!isObject(originValue)) {
    return originValue
  }
  const newObject = {}
  for (const key in originValue) {
    // 递归，函数参数需要改变
    newObject[key] = deepClone(originValue[key])
  }
  return newObject
}

// 测试代码
const obj = {
  name: 'why',
  age: 18,
  friend: {
    name: 'james',
    address: {
      city: '广州',
    },
  },
  hobbies: ['打篮球', '抽烟', '喝酒'],
}

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = 'kobe'
obj.friend.address.city = '成都'
console.log(newObj)
console.log(newObj.friend === obj.friend) // false 深拷贝成功。

/*
  深拷贝，递归实现。
  isObject 判断函数
*/

const isObject = function (value) {
  /*
    typeof 返回 object 的三种类型
      null 需要排除
      普通对象 数组 需要保留
    函数其实也是一个对象
      需要添加
  */
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}
const deepClone = function (originValue) {
  // 非对象, 直接返回原值, 无所谓深拷贝, 浅拷贝
  if (!isObject(originValue)) {
    return originValue
  }
  const newObject = {}
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key])
  }
  return newObject
}
/*
  判断对象的方法, 排除 null 保留 function
  递归实现 newObject[key] = deepClone(originValue[key])
*/

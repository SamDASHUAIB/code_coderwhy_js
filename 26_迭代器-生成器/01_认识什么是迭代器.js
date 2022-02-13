// 编写的一个迭代器
const iterator = {
  next: function () {
    return { done: true, value: 123 }
  },
}

// 数组
const names = ['abc', 'cba', 'nba']

// 创建一个迭代器对象来访问数组
let index = 0

const namesIterator = {
  // next 方法, 无参 OR 一个参数
  next: function () {
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true, value: undefined }
    }
  },
}

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next()) // { done: false, value: "nba" }
console.log(namesIterator.next()) // { done: true, value: undefined }
console.log(namesIterator.next()) // { done: true, value: undefined }
console.log(namesIterator.next()) // { done: true, value: undefined }
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

// 迭代器 => 对象 => 符合迭代器协议的对象 => next 方法 => 帮助我们遍历某种数据结构

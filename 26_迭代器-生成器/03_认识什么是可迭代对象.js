// 可迭代对象 => 返回一个迭代器对象
// 可迭代对象 => 可迭代协议 => 数据结构 + 实现了 @@Iterator 方法, 此方法通过 [Symbol.iterator] 可访问 => 某些迭代操作, 消费 for of
const iterableObj = {
  names: ['abc', 'cba', 'nba'],
  // Symbol.iterator 方法返回一个 迭代器
  [Symbol.iterator]: function () {
    let index = 0
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  },
}

// iterableObj对象就是一个可迭代对象
// console.log(iterableObj[Symbol.iterator])

// 1.第一次调用iterableObj[Symbol.iterator]函数
const iterator = iterableObj[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// // 2.第二次调用iterableObj[Symbol.iterator]函数 生成新的 迭代器
const iterator1 = iterableObj[Symbol.iterator]()
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())

// 3. for...of 可以遍历的东西必须是一个可迭代对象
// const obj = {
//   name: "why",
//   age: 18
// }
// for of 本身就是不断的 调用 next() 并获得 其中的 value 属性值 的语法糖
// done 值 决定 遍历是否结束
for (const item of iterableObj) {
  console.log(item)
}

// 1.for of场景

// 2.展开语法(spread syntax)
const iterableObj = {
  names: ['abc', 'cba', 'nba'],
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

const names = ['abc', 'cba', 'nba']
const newNames = [...names, ...iterableObj]
console.log(newNames)

const obj = { name: 'why', age: 18 }
// for (const item of obj) {

// }
// ES9(ES2018)中新增的一个特性: 用的不是迭代器
// 对象的展开, 原理不是 迭代器!!!
const newObj = { ...obj }
console.log(newObj)

// 3.解构语法
const [name1, name2] = names
// const { name, age } = obj 不一样ES9新增的特性
// 对象的解构, 原理不是 迭代器!!!

// 4.创建一些其他对象时 从 某个 可迭代对象中创建 Map Set WeakMap WeakSet
const set1 = new Set(iterableObj)
const set2 = new Set(names)

const arr1 = Array.from(iterableObj)

// 5.Promise.all Promise.race Array.from
Promise.all(iterableObj).then((res) => {
  console.log(res)
})

/*
  可迭代对象的应用场景 => for of 解构赋值(数组) 展开语法(数组) yield*
  从 Iterable(通常为 Array) 中生成新的 Map Set WeakMap WeakSet
  Promise.all Promise.race Array.from
*/

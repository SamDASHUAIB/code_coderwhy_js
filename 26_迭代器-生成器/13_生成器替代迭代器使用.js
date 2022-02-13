// 1.生成器来替代迭代器
// 迭代器 => 生成器
function* createArrayIterator(arr) {
  let index = 0
  // return {
  //   next: function () {
  //     if (index < arr.length) {
  //       return { done: false, value: arr[index++] }
  //     } else {
  //       return { done: true, value: undefined }
  //     }
  //   },
  // }
  // 第一种
  // yield arr[index++]
  // yield arr[index++]
  // yield arr[index++]
  // yield arr[index++]
  // 第二种
  // for (const item of arr) {
  //   yield item
  // }
  // 第三种
  yield* arr
}
const names = ['abc', 'cba', 'nba']
const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

// 2.创建一个函数, 这个函数可以迭代一个范围内的数字
// 10 20

function* createRangeIterator(start, end) {
  let index = start
  // return {
  //   next: function () {
  //     if (index < end) {
  //       return { done: false, value: index++ }
  //     } else {
  //       return { done: true, value: undefined }
  //     }
  //   },
  // }
  while (index < end) {
    yield index++
  }
}

const rangeIterator = createRangeIterator(10, 20)
console.log(rangeIterator.next())
console.log(rangeIterator.next())
console.log(rangeIterator.next())
console.log(rangeIterator.next())
console.log(rangeIterator.next())

// 3.class案例
class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  foo = () => {
    console.log('foo function')
  };

  // [Symbol.iterator] = function*() {
  //   yield* this.students
  // }
  // 实现可迭代协议
  // *[Symbol.iterator]() {
  //   yield* this.students
  // }

  [Symbol.iterator]() {
    let index = 0
    // @@iterator 方法, 即 Symbol.iterator 方法返回一个迭代器
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  }
}

const classroom = new Classroom('3幢', '1102', ['abc', 'cba'])
for (const item of classroom) {
  console.log(item)
}

const obj = {
  name: 'why',
  age: 18,
  friends: {
    name: 'kobe',
  },
  hobbies: ['篮球', '足球'],
  foo: function () {
    console.log('foo function')
  },
}

// 将obj对象的内容放到info变量中
// 1.引用赋值
// const info = obj
// obj.age = 100
// console.log(info.age)

// 2.浅拷贝 对象中的属性如果是复合类型, 复制的仅仅是一个指针(地址)
const info2 = { ...obj }
obj.age = 1000
obj.friends.name = 'sam'
console.log(info2.age)
console.log(info2.friends.name) // 'sam' 说明 info2 复制的仅仅是一个指针。

// obj.friends.name = 'james'
// console.log(info2.friends.name)

// 3.stringify和parse来实现
const jsonString = JSON.stringify(obj)
console.log(jsonString)
const info3 = JSON.parse(jsonString)
obj.friends.name = 'curry'
console.log(info3.friends.name)
console.log(info3)

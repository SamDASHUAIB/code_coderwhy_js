const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: 'why',
  friend: {
    name: 'kobe',
    foo: function () {
      console.log('foo function')
    },
  },

  // foo: function () {
  //   console.log('foo function')
  // },
  // [s1]: 'abc',
  // s2: s2,
}

// obj.inner = obj

const info = JSON.parse(JSON.stringify(obj))
obj.friend.name = 'james'
console.log(info)
/*
  只有合法的 JSON 字符串可以
  函数 Symbol 都不行
  不支持循环引用
*/

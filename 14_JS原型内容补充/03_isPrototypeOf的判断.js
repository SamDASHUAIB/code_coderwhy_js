function Person() {}

var p = new Person()

console.log(p instanceof Person)
console.log(Person.prototype.isPrototypeOf(p))

//
var obj = {
  name: 'why',
  age: 18,
}

var info = Object.create(obj)

// console.log(info instanceof obj)
console.log(obj.isPrototypeOf(info))

/*
  isPrototypeOf 两边都是 对象, xxx 是不是 yyy 的原型? xxx.isPrototypeOf(yyy)
    适用场景： Object.create(对象) 方法，没有经过 构造函数创建的对象
*/

function Person() {}
console.log(Person.prototype) // {}
/*
{
  constructor: {
    value: [Function: Person],
    writable: true,
    enumerable: false,
    configurable: true
  }
}
*/

console.log(Object.getOwnPropertyDescriptors(Person.prototype))

// Person.prototype 也是一个对象, 是经由 new Object() 生成的, 因此 Person.prototype.__proto__ === Object.prototype
console.log(Person.prototype.__proto__) // [Object: null prototype] {}

console.log(Person.prototype.__proto__.__proto__) // null

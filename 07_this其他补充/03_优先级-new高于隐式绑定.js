var obj = {
  name: 'obj',
  Foo: function () {
    console.log(this)
  },
}

// new的优先级高于隐式绑定
var f = new obj.Foo() // Foo {} 构造函数 Foo 返回的类型为 Foo 的空对象

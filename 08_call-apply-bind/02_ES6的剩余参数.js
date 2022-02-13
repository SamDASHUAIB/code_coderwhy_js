// rest parameters
function sum(...nums) {
  console.log(nums)
}

sum(10)
sum(10, 20)
sum(10, 20, 30)
sum(10, 20, 30, 40, 50)

// 展开运算符 spread
var names = ['abc', 'cba', 'nba']
// var newNames = [...names]
function foo(name1, name2, name3) {}
foo(...names)

/*
  rest 参数 应用于 函数定义中的参数列表
    ...(10, 20, 30, 40) => [10, 20, 30, 40]
    以逗号划分的参数列表 => Array
  展开运算符 应用于 Array
    ...[10, 20, 30, 40] => 10, 20, 30, 40
    Array => 以逗号划分的参数列表
*/

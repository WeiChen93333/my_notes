// Function.prototype.call2 = function(context) {
//   // 首先要获取调用call的函数，用this可以获取
//   context.fn = this;
//   context.fn();
//   delete context.fn;
// }

// // 测试一下
// var foo = {
//   value: 1
// };

// function bar() {
//   console.log(this.value);
// }

// bar.call2(foo); // 1

// const obj = {name: 'chen'}
// function fn(){
//   console.log(this.name)
// }
// const newFn = fn.bind(obj)
// newFn()
// const newObj = {name: 'wei'}
// const test = newFn.bind(newObj)
// test()

function testCall(a, b){
  console.log(a)
  console.log(b)
  console.log(this.name)
}
var obj = {name: 'chen'}
Function.prototype.mockCall = function(context){  
  context.fn = this // 将调用 mockCall 的函数 (需要改变 this 指向的函数) 赋值给传入对象的属性
  var args = []
  for(var i = 1; i < arguments.length;  i++){
    args.push(arguments[i])
  } 
  eval('context.fn(' + args +')')
 
  delete context.fn
}
testCall.mockCall(obj, 3, 5)

const result = testCall.call(obj, 3, 5)
console.log(result)
## 技巧与练习

### 防抖与节流 (debounce & throttle)
Throttling and debouncing are two widely-used techniques to improve the performance of code that gets executed repeatedly within a period of time.  
我们无法控制用户触发事件的频率, 但是可以控制事件处理函数的执行. 加上防抖和节流的函数相当于在事件和函数执行之间加了一个控制层, 可以提升性能并改善用户体验.

#### 防抖
第一次触发事件后, 不立即执行函数, 而是进行计时. 如果计时过程中有其他触发，则重置计时; 否则执行函数。这样将一个连续的调用归为一个, 只有最后一次会执行. 多用于一些用户操作停止之后再执行事件处理函数

**使用场景**
- 搜索框输入: 只需用户最后一次输入完，再发送请求
- 滚动加载
- 窗口 resize, 重新计算样式或布局
- ajax 请求合并，不希望短时间内大量的请求被重复发送

```js
function callback(){
  console.log('resize')      
}
function debounce(fn, delay = 1000){
  let timer
  return function(){
    clearTimeout(timer)       
    timer = setTimeout(fn, delay)
  }
}
window.addEventListener('resize', debounce(callback, 5000))   
```

#### 节流
第一次触发后, 事件处理函数执行, 然后进行计时, 在这段时间内都不执行, 直到计时时间到, 执行, 然后再开始计时, 如此反复.

**使用场景**
- 窗口 resize 重新计算样式或布局
- scroll 时触发操作，如随动效果
- 对用户输入的验证，不想停止输入再进行验证，而是每 n 秒进行验证

```js

function throttle(fn, interval = 1000){    
  let timer    
  let flag = true
  let start
  return function(){        
    clearTimeout(timer)
    if(flag) start = Date.now()       
    flag = false                     
    let end = Date.now()  
    if(end - start >= interval){         
      fn()
      flag = true
    }else{         
      timer = setTimeout(fn, 1000)
    }            
  }
}
window.addEventListener('resize', throttle(callback, 2000))   
```

*节流防抖函数自己随手写的, 先这样吧*

#### 文章与摘录
https://blog.bitsrc.io/understanding-throttling-and-debouncing-973131c1ba07

To throttle a function means to ensure that the function is called at most once in a specified time period (for instance, once every 10 seconds). Conversely, a debounced function will ignore all calls to it until the calls have stopped for a specified time period. 

**Why would you want to throttle or debounce your code?**  
Supposing you have an event E that invokes a function F when it is triggered. Normally, F would be called every time E is triggered, and that’s okay.
But what happens if E is triggered at a high frequency, for instance, 200 times per second? If F does something trivial like a simple calculation, that might still be okay. However, if F performs an expensive operation like calling an external API, heavy computations or complex DOM manipulations, you’d want to limit how often F gets called to avoid a drop in performance. Another reason why you’d also want to limit how often F gets called is if some other application component depends on the result from F.

https://segmentfault.com/a/1190000018428170


### 深浅拷贝
#### 浅拷贝
原对象中, 如果属性是基本类型，拷贝值，如果是引用类型，拷贝内存地址; 这种情况下, 原对象和克隆的对象任何一方修改了内嵌引用类型的属性, 另一方都会受到影响

##### 遍历赋值
```js
const arr = ['3', {name: 'chen'}]
const clone = []
for(let item in arr){
  clone.push(arr[item])
}
arr[1].name = 'change'
console.log(clone) //[ '3', { name: 'change' } ]
arr[1] = 'change'
console.log(clone) //[ '3', { name: 'change' } ]
```

##### 数组的 slice concat 方法
```js
var a = [1,2,[3,4],{name:'ccy'}];
var b = a.concat();
a[3].name = 'hs';
console.log(a[3],b[3]);
```

##### Object.assign
```js
var a = {age:18,name:'ccy',info:{address:'wuhan',interest:'playCards'}};
var b = Object.assign(a);
a.info.address = 'shenzhen';
console.log(a.info,b.info);
```

#### 深拷贝 - (不能处理函数、正则, 不能复制属性描述符)
无限层级拷贝。深拷贝的对象无论修改基本数据类型和引用数据类型都不会影响原有的数据类型, 也就是除了和原对象长得一模一样, 其他没有任何关系了

##### 递归实现 
```js
function isObject(source){
  return source.constructor == Object
}
function isArray(source){
  return source.constructor == Array
}
function isBasic(source){
  return typeof source !== 'object' || typeof source === null
}
function deepClone(source){ 
  if(isBasic(source)) return source
  const clone = isObject(source) ? {} : isArray(source) ? [] : null       
  const propNames = Object.getOwnPropertyNames(source)      
  propNames.forEach((value) => {
    if(isBasic(source[value])){
      return clone[value] = source[value]        
    }
    if(isObject(source[value]) || isArray(source[value])){               
      clone[value] = deepClone(source[value])
    }     
  })
  return clone
}

const obj = {
  simple: 'chen',
  complex: {
    age: 27
  }
}
const objClone = deepClone(obj)
console.log(objClone)
console.log(objClone == obj)
console.log(objClone.complex == obj.complex)

const arr = [
  30,
  ['today', 'happy']
]
const arrClone = deepClone(arr)
console.log(arrClone) 
console.log(arrClone == arr)
console.log(arrClone[1] == arr[1])
```

##### JSON 实现 (不能处理函数、正则等对象)
```js
function deepClone(source) {
  let tmp = JSON.stringify(source)
  let result = JSON.parse(tmp)
  return result
}
```

##### Object.create 实现


### 冻结对象
Object.freeze() 用于冻结对象，禁止对该对象的属性进行修改 (也可以对数组使用); 
冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性或修改已有属性的值，也不能修改该对象已有属性的可枚举性、可配置性、可写性。此外，冻结一个对象后该对象的原型也不能被修改   
Object.freeze() 是 "浅冻结", 只能冻结一层, 也就是第一层的属性, 如果存在嵌套, 如属性值为对象, 那么该对象属性不会冻结  
Vue 将不会为已经冻结的属性加上 setter getter, 因此, 对于纯展示型数据, 使用冻结可以减少不必要的开支.

**"深冻结"**
```js
const menu = [
  {
    content: '查询释义'        
  }    
]         

const obj = {
  name: "chen",
  family: 4,
  arr: ['233', '455']
} 
        
function deepFreeze(obj){       
  const propNames = Object.getOwnPropertyNames(obj)      
  propNames.forEach((value) => {
    if(typeof obj[value] == 'object' && obj[value] !== null){      
      deepFreeze(obj[value])            
    }
  })        
  return Object.freeze(obj)   
}
deepFreeze(menu)

deepFreeze(obj)
```

#### 文章与摘录
Vue性能提升之Object.freeze(): https://juejin.im/post/5d5e89aee51d453bdb1d9b61

### 函数柯里化
掌握JavaScript函数的柯里化: https://segmentfault.com/a/1190000006096034?utm_source=sf-related

### 模拟实现
观察原型实现了什么, 然后使用自己的思路来实现, 一步步模仿完全 (尽量不用新功能模仿旧功能)
#### bind
- 返回改变了 this 值的函数 (该函数的 this 值此后无法更改/不会改变)
- thisArg 外的其他参数可以在绑定时传入, 也可以在绑定后传入
```js
var obj = {name: 'chen'}
objNew = {name: 'touch'}
function testFunc(a, b){
  console.log(this)
  console.log(this.name)
  this.a = a
  this.b = b
  this.gender = 'female'
  return {surname: 'wei'}
}
Function.prototype.mockBind = function(thisArg){  
  if(typeof this !== 'function'){
    throw new TypeError(this + '.mockBind is not a function')
  } 
  if(thisArg === null || thisArg === undefined){
    thisArg = window  
  }else if(typeof thisArg != 'object'){
    thisArg = Object(thisArg)  
  }
  const key = Symbol()
  thisArg[key] = this 
  var args = []
  for(var i = 1; i < arguments.length; i++){
    args.push(arguments[i])
  }  
  return function bound(){ 
    for(var i = 0; i < arguments.length; i++){
      args.push(arguments[i])
    }  
    if(this instanceof bound){
      return new thisArg[key](...args)
    }else{
      return thisArg[key](...args)  
    }
  }
}
const result = testFunc.mockBind(obj, 1)
result()
console.log(result.mockBind(objNew)())
console.log(result.call(objNew))
const c = new result(2)
console.log(c)
console.log(new testFunc(1, 2))
```

#### apply
- 改变当前函数 this 指向
- 执行当前函数
- 只检测前两位实参, 如果传入更多, 会被忽略
- thisArg 不同情况 (非严格模式下，thisArg 不指定或者指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。)
- args 参数需要为数组 (如果是其他对象类型, 会被忽略; 如果不是对象类型, 会报错 Uncaught TypeError: CreateListFromArrayLike called on non-object);
```js
window.a = 'window-a'
function testFunc(a, b){
  console.log(this)
  console.log(this.a)
  console.log(a)  
  return {surname: 'wei'}
}
var obj = {name: 'chen'}
Function.prototype.mockApply= function(thisArg, args){  
  //thisArg 不同情况 (非严格模式下，thisArg 不指定或者指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。)
  if(typeof this !== 'function'){
    throw new TypeError(this + '.mockApply is not a function')
  }
  if(thisArg === null || thisArg === undefined){
    thisArg = window  
  }else if(typeof thisArg != 'object'){
    thisArg = Object(thisArg)  
  }  //if...else if 条件分支语句一旦命中后面的就不再判断
  
  //将调用 mockCall 的函数 (需要改变 this 指向的函数) 赋值给 thisArg 的属性
  const key = Symbol() //新增一个独一无二的属性以免覆盖原有属性
  thisArg[key] = this 

  //获取真实参数
  let result = null
  if(typeof args !== 'object'){
    throw new TypeError('CreateListFromArrayLike called on non-object')
  }else if(typeof args !== 'array'){
    result = thisArg[key]() //执行真实函数
  }else{
    result = thisArg[key](...args) //执行真实函数
  }  
  delete thisArg[key] //删除
  return result  //返回真实函数的返回值
} 
console.log(testFunc.mockApply(undefined, []))
testFunc.apply(undefined, [])
```

#### call
- 改变当前函数 this 指向
- 执行当前函数
- 参数逐个传入
```js
var obj = {name: 'chen'}
window.a = 'window-a'
function testFunc(a, b){
  console.log(this)
  console.log(this.a)
  console.log(a, typeof a)  
  return {surname: 'wei'}
}
Function.prototype.mockCall = function(thisArg){ 
  if(typeof this !== 'function'){
    throw new TypeError(this + '.mockCall is not a function')
  }
  if(thisArg === null || thisArg === undefined){
    thisArg = window  
  }else if(typeof thisArg != 'object'){
    thisArg = Object(thisArg)  
  }
  const key = Symbol()
  thisArg[key] = this 

  var args = []
  for(var i = 1; i < arguments.length; i++){
    args.push(arguments[i])
  }  
  const result = thisArg[key](...args)
  delete thisArg[key]
  return result
}

console.log(testFunc.mockCall())
testFunc.call(null, null)
testFunc.mockCall(null, null)
```

JavaScript深入之call和apply的模拟实现: https://juejin.im/post/6844903476477034510


#### new

- 即使构造函数是某个对象的属性, 其内部的 this 值始终指向新创建的对象, 而不是其所属的对象

- 构造函数内没有以 this 作为前缀的变量, 不会包含在实例对象中; 构造函数自身的属性, 不会包含在实例对象中
- 构造函数体中的 return 语句, 原始值会被忽略, 引用类型会返回 (这样, 使用 new 操作符就没有意义了)

```js
function mockNew(){
  const obj = {}  //(1)
  const Constructor = [].shift.apply(arguments)
  obj.__proto__ = Constructor.prototype  //(2)
  const result = Constructor.apply(obj, arguments)  //(3)     
  return result instanceof Object ? result : obj  //(4)
}
function Creation(name, age, job){    
  this.name = name
  this.age = age
  this.job = job     
}
const final = mockNew(Creation, 'chen', 27, 'programmer')
console.log(final) //Creation { name: 'chen', age: 27, job: 'programmer' }
```

(1) 创建空对象 obj  
(2) 将构造函数的原型对象与空对象的 \__proto__ 属性绑定  
(3) 通过 apply 方法, 使得 obj 成为构造函数的调用者; 并执行构造函数    
(4) 对构造函数的返回值进行判断 

**构造函数内部如何判断是否使用了 new 关键字**  
- instanceof 运算符: 在执行 new 操作时，构造函数的 prototype 赋值给了实例的 **proto** 属性。**`instanceof`** 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。
- new.target 属性: 在通过 new 运算符被初始化的函数或构造方法中，new.target 返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是 undefined


#### instanceof
```js
function mockInstanceof(left, right) {
  left = left.__proto__
  while(true) {
    if (left === null) {
      return false
    }
    if (left === right.prototype) {
      return true
    }
    left = left.__proto__
  }
}
```

#### Object.create
```js
let demo = {
  c : '123'
}
function mockObjectCreate(proto, props) {
  function Fn(){} 
  if(typeof proto !== 'object'){
    throw new TypeError("Object prototype may only be an Object: " + proto);
  }else if(proto === null){
    Fn.prototype = undefined   //原生方法当 proto 传入 null 时, 创建出的对象的 __proto__ 为 undefined, 而我这里实现不了
  }else{
    Fn.prototype = proto
    Fn.prototype.constructor = Fn
  }      
  const obj = new Fn()  
  Object.defineProperties(obj, props)
  return obj
}
const r = mockObjectCreate(demo, {
  name: {
    writable: true, 
    enumerable: true,
    value: "yu"
  } 
})
console.log(r.__proto__)
```
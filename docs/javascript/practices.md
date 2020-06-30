### js 技巧与练习

#### 防抖与节流 (debounce & throttle)
Throttling and debouncing are two widely-used techniques to improve the performance of code that gets executed repeatedly within a period of time.  
我们无法控制用户触发事件的频率, 但是可以控制事件处理函数的执行. 加上防抖和节流的函数相当于在事件和函数执行之间加了一个控制层, 可以提升性能并改善用户体验.

##### 防抖
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

##### 节流
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

##### 文章与摘录
https://blog.bitsrc.io/understanding-throttling-and-debouncing-973131c1ba07

To throttle a function means to ensure that the function is called at most once in a specified time period (for instance, once every 10 seconds). Conversely, a debounced function will ignore all calls to it until the calls have stopped for a specified time period. 

**Why would you want to throttle or debounce your code?**  
Supposing you have an event E that invokes a function F when it is triggered. Normally, F would be called every time E is triggered, and that’s okay.
But what happens if E is triggered at a high frequency, for instance, 200 times per second? If F does something trivial like a simple calculation, that might still be okay. However, if F performs an expensive operation like calling an external API, heavy computations or complex DOM manipulations, you’d want to limit how often F gets called to avoid a drop in performance. Another reason why you’d also want to limit how often F gets called is if some other application component depends on the result from F.

https://segmentfault.com/a/1190000018428170


#### 深浅拷贝
##### 浅拷贝
原对象中, 如果属性是基本类型，拷贝值，如果是引用类型，拷贝内存地址; 这种情况下, 原对象和克隆的对象任何一方修改了内嵌引用类型的属性, 另一方都会受到影响
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

##### 深拷贝 - (暂兼容对象和数组)
无限层级拷贝。深拷贝的对象无论修改基本数据类型和引用数据类型都不会影响原有的数据类型, 也就是除了和原对象长得一模一样, 其他没有任何关系了
```js
//通过递归
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
console.log(objClone == arr)
console.log(objClone[1] == arr[1])
```



#### 冻结对象
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

##### 文章与摘录
Vue性能提升之Object.freeze(): https://juejin.im/post/5d5e89aee51d453bdb1d9b61



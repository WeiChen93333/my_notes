Map和Set的区别, Map和Object的区别
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
https://juejin.cn/post/6844903792689823758

问：数组的filter、every、flat的作用是什么？
答：filter方法对原数组进行筛选并将符合条件的元素放到一个新数组返回，如果没有满足条件的元素则返回空数组；
every方法检查数组中的每个元素是否符合条件，全部符合则返回true，否则返回false；
【arr.flat()】flat方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

自行补充：reduce 函数
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
https://segmentfault.com/a/1190000019994237
答：reduce 函数对数据进行累计的操作，并返回最终的结果
- 接收两个参数 一个回调函数，回调函数接收两个参数，一个是之前操作的累计值，一个是当前遍历到的值；另一个参数为初始值，如果置空，则将取数组第一项为初始值，并从数组第二项开始遍历

问: 变量提升和函数提升，以及它们的优先级
https://blog.csdn.net/hualvm/article/details/84395850
函数提升优先级高于变量提升，且不会被同名变量声明覆盖，但是会被变量赋值后覆盖(函数不愧是一等公民)

问：es6有哪些新特性？
http://www.alloyteam.com/2016/03/es6-front-end-developers-will-have-to-know-the-top-ten-properties/
默认参数，模板字符串，展开操作符，解构赋值，对象字面量增强，promise，let&const，箭头函数，类（class），模块（modules）
答一：箭头函数
  相关问题：箭头函数与普通函数的区别？
  答：箭头函数是匿名函数，没有原型prototype属性，不能作为构造函数与 new 一起使用；
    箭头函数不绑定 this 与 arguments，会捕获其所在的上下文的this值与 arguments（会向上查找，找到为止）
    call()、apply()、bind()等方法不能改变箭头函数中的this指向 
    【在控制台执行以下代码，两个 this 都指向 window；在mounted执行以下代码，两个 this 都指向当前 Vue 实例】
    const arrowOne = () => {
      console.log(this)
      const arrowTwo = () => {
        console.log(this)
      }
      arrowTwo()
    }
    【在mounted执行以下代码，两个 this 都指向 obj，arguments 都为 2 3】
    function test(a, b) {
      const arrowOne = (c, d) => {
        console.log(this, ...arguments)
        const arrowTwo = () => {
          console.log(this, ...arguments)
        }
        arrowTwo()
      }
      arrowOne(1, 7)
    }
    const obj = {
      name: 'obj',
      func: test
    }
    obj.func(2, 3)
  追问: 什么情况下会指向 undefined? 1. 严格模式下, 定义在全局中或全局调用的函数中; 2. vue3的<script setup lang="ts"></script>代码块中, 定义在全局中或全局调用的函数中, 因为 v3 里面是没有this的
  备注: 需要注意箭头函数定义在函数内的情况(函数的作用域是运行时决定的)
  function test () {
    return () => console.log(this);
  }
  test()() // undefined
  let obj = {
      aa: 123,
  }
  let obj2 = {
      aa: 222,
  }
  let rr = test.call(obj);
  rr() // {aa: 123}
  let rr2 = test.call(obj2);
  rr2() // {aa: 222}
  // 这感觉就是闭包和作用域的混合啊
  备注2：箭头函数作为函数的一种，也可以调用call，bind，apply，但是this值的绑定无效
答二：引入新的变量定义关键字 let 与常量关键字 const
  相关问题：let const var 的区别？
  答：var 可以重复声明，let 和 const 不可以；
    var 定义的变量会成为window的属性, let 和 const 不会
    var 会产生变量声明提升，声明前访问返回 undefined，let 和 const 不会产生变量声明提升，在声明前访问变量会报错（xxx is not defined）
    var 定义的变量作用域可以是全局或函数内部，let 和 const 定义的变量作用域可以是全局或块
    var 和 let 定义的变量可以重新赋值，const 定义的不可以，并且必须初始化    
    相关问题（记得不是很确切）：如果希望 const 定义的对象的属性也不能被修改该怎么做？ 可以使用 Object.freeze() 函数（自己实现过）。
  备注：Javascript引擎在扫描代码发现变量声明时，要么将它提升至当前作用域顶部（遇到var 声明），要么将声明放到临时死区（TDZ）中（遇到let 和 const声明）。访问TDZ中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从TDZ重移除，然后才能访问。
答三：promise
  相关问题：说一下对Promise的了解？
  Promise 是异步编程的一种解决方案. Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值, (它是承诺，承诺它过一段时间会给你一个结果。)promise有三种状态： pending(等待态)，fulfiled(成功态)，rejected(失败态) ；状态一旦改变，就不能再更改。
  Promise 是异步编程的一种解决方案，比传统的异步解决方案【回调函数】和【用户事件】更合理、更强大。. 它是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，可以从该对象获取异步操作的消息。
  它可以解决回调地狱的问题，也就是异步深层嵌套问题
  相关问题：Promise实现原理？
  相关问题：Promise的all，race和allSettled有什么区别？（一般是比较异同）
  答：Promise.all，race和allSettled都接收一个可迭代对象（数组、字符串）作为参数，并返回一个promise对象
    all 返回的 promise 对象在所有的 promise 都 resolve 的情况下执行then，只要有一个reject 那么就会转为 rejected 执行 catch
    then 接收一个函数，会将获得的成功结果数组传给这个函数，里面的数据顺序和Promise.all接收到的数组顺序是一致的
    如果传入为空，则执行then
    race 返回的 promise 对象的状态取决于传入的promise哪一个状态改变最快，其成功里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
    如果传入为空，则执行catch
    allSettled 只会执行then，并将所有结果传给回调函数，格式为[{status: fulfiled, value: 'success'}, {status: rejected, reason: 'failure'}]
    如果传入为空，则执行then
    Promise.any，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和AggregateError类型的实例
  查阅：https://www.jianshu.com/p/7e60fc1be1b2
  相关问题: async await
  await 操作符只能在异步函数 async function 内部使用。如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果，也就是说它会阻塞后面的代码，如果promise reject 需要用 try catch 捕捉。如果等待的不是 Promise 对象，则返回该值本身。
答三: ES module, 模块化, commonjs等
export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
```js
** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };

/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}

//也可以用 export default
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
##### 与 CommonJS 的区别

CommonJS 基本语法：

- 暴露模块：`module.exports = value`或`exports.xxx = value`
- 引入模块：`require(xxx)`,如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

加载某个模块，其实是加载该模块的module.exports属性。 require命令用于加载模块文件。require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。 

**CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。**

**CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。es6 import 必须放在js代码最上方**

- 什么是运行时加载，什么是编译输出？
- 在后端开发当中，只需要做到一次加载，因此在启动服务器中进行加载即可，对于CommonJS的设计当中符合后端的这种开发理念，然后这种效果带来了很大的便利性，在前端开发也是需要模块化加载方式，可是，前端的加载方式跟后端不一致，如果采用CommonJS相同的加载方式，前端性能会大打折扣，比如网页假死，以及难以改变引入模块的变量，因此，在编译阶段，先将模块按需进行处理，生成接口，在引入模块之后进行使用时，可以很方便的调用接口

答四: class
https://www.jianshu.com/p/fd1c7a7a07d8
class是一个语法糖，其底层还是通过 构造函数 去创建的。所以它的绝大部分功能，ES5 都可以做到。新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
注意: class不存在变量提升
静态属性与静态方法: 在一个属性和方法前，加上 static 关键字, 则属性和方法只能被类使用, 不会成为实例属性和被实例继承
所有在类中定义的方法，都会被实例继承。在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为"静态方法"。
**Class 可以通过extends关键字实现继承**
class Cat extends Animal {
    constructor(name, age, color) {
        // 调用父类的constructor(name, age)
        super(name, age);
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}


问：闭包的原理
https://blog.csdn.net/weixin_48659263/article/details/109264312
闭包是指有权访问另一个函数作用域中的变量的函数. 创建闭包的常见方式, 就是在一个函数内部创建另一个函数
外部函数执行时，将内部函数以赋值的方式或者返回值的方式交给了外部变量。这个交出去的变量在执行的时候依然可以访问到之前其定义位置函数的作用域，就是闭包。
闭包作用: 局部变量无法共享和长久的保存，而全局变量可能造成变量污染
闭包的使用场景：
- setTimeout: 原生的setTimeout传递的第一个函数不能带参数，通过闭包可以实现传参效果
- 用户事件回调函数(和setTimeout的情况差不多，都是为了传递参数)
- 防抖函数
闭包的缺点: 闭包会使函数中的变量保存在内存中，内存消耗很大。
疑问: 闭包函数可以改变父函数内的变量, 那么如果再次执行父函数, 这个变量会怎么样?
追问: 垃圾回收
https://juejin.cn/post/6981588276356317214
- 标记清除
- 引用计数


问：new的实现原理
(1) 创建空对象 obj  
(2) 将构造函数的原型对象与空对象的 \__proto__ 属性绑定  
(3) 通过 apply 方法, 使得 obj 成为构造函数的调用者; 并执行构造函数 / 让构造函数的this指向这个对象，执行构造函数的代码
(4) 对构造函数的返回值进行判断, 若为原始值则返回创建的对象, 引用类型则返回该返回值

问：instanceof的实现原理
判断构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。
**构造函数内部如何判断是否使用了 new 关键字**  
- instanceof 运算符: 在执行 new 操作时，构造函数的 prototype 赋值给了实例的 **proto** 属性。**`instanceof`** 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。
- new.target 属性: 在通过 new 运算符被初始化的函数或构造方法中，new.target 返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是 undefined

问：数据类型有哪些？如何判断一个数据是否是数组
答：数据类型由基本数据类型和复杂数据类型，基本数据类型由 undefined null boolean string，number symbol bigint，复杂数据类型有 object
备注：BigInt数据类型的目的是比Number数据类型支持的范围更大的整数值。
追问：基本数据类型和复杂数据类型的区别？
1. 内存的分配不同：基本数据类型存储在栈中；复杂数据类型存储在堆中，栈中存储指向其的引用地址。
2. 基本数据类型是按值访问；复杂数据类型按引用访问，JS 不允许直接访问保存在堆内存中的对象，需要先访问地址，然后通过地址获得对象的值。
3. 复制时，a = b，基本数据类型互不影响，复制数据类型由于指向同一个地址，其中一个发生了改变，另一个也会发生改变。
【此处可以引出对象的深拷贝】
备注：堆与栈的区别？
1、栈由系统自动分配，而堆是人为申请开辟；
2、栈获得的空间较小，而堆获得的空间较大；
3、栈由系统自动分配，速度较快，而堆一般速度比较慢；
4、栈是连续的空间，而堆是不连续的空间。

追问: 类型转换[to extend]
https://juejin.cn/post/6956170676327677966
在 JS 中只有 3 种类型的转换
转化为 Number 类型：Number() / parseFloat() / parseInt()
转化为 String 类型：String() / toString()
转化为 Boolean 类型: Boolean()

显式类型强制转换是指当开发人员调用函数在类型之间进行转换
隐式类型转换: 数据会于所处位置自动转换(为被期待的)类型.
比如在 - * / 运算符前后的数据会转换为Number 类型


追问: 判断类型
typeof 对于原始类型来说，除了 null 都可以显示正确的类型, 对于对象来说，除了函数都会显示 object (Date RegExp 等无法判断, 这些内置函数不是 Function 的实例, 只是 Object 的实例)
instanceof，用于判断一个变量是否某个对象的实例，内部机制是通过原型链来判断的。他的确能判断是否类型的是否正确。但一点值得注意，instanceof 检测的是原型，原型链上，每一个类型，都会返回true。所以，只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。
constructor, 是原型prototype的一个属性，当函数被定义时候，js引擎会为函数添加原型prototype，并且这个prototype中constructor属性指向函数引用， 因此重写prototype会丢失原来的constructor。
但是他也有明显的缺陷：
1：null 和 undefined 无constructor，这种方法判断不了。
2：还有，如果自定义对象，开发者重写prototype之后，原有的constructor会丢失，因此，为了规范开发，在重写对象原型时一般都需要重新给 constructor 赋值，以保证对象实例的类型不被篡改。
备注: constructor 是一个函数, 可以通过 obj.constructor.name 获取函数名称; Date RegExp 等的constructor 是一串奇怪的东西
toString是几个方案中，相对比较不错的方案。建议使用。toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。**Object.prototype.toString.call([2, 3]) 需要使用 call 来调用, 直接调用都会返回'[object Object]'**
备注: 每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。(可以判断 Date RegExp 等)
判断数组: isArray
Array.from Array.of 与 Array 创建数组时的不同
Array.from() 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]
console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]

问：什么是防抖和节流？有什么区别？如何实现？
当用户频繁触发事件时，通过控制事件处理函数执行次数提升性能和改善用户体验。
防抖：只执行最后一次
实现: 第一次触发事件后, 不立即执行函数, 而是进行计时。如果计时过程中有其他触发，则重置计时，否则执行函数。
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
**在vue项目中的用法**
const debounce = (fn, delay = 500) => {
  let timer
  return function () {
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}
methods: {
  inputChange: debounce(function () { this.handleInputChange() }),
}
节流：每隔一段时间执行一次
实现: 第一次触发后(, 事件处理函数执行一次, 然后)进行计时, 在这段时间内都不执行, 直到计时时间到才执行, 然后再开始计时, 如此反复.
面试官提问: 一定要先执行一次吗? 不一定,既然使用了节流,就说明这里很有可能会有频繁操作
**使用场景**
- 窗口 resize 重新计算样式或布局
- scroll 时触发操作，如随动效果
- 对用户输入的验证，不想停止输入再进行验证，而是每 n 秒进行验证, 或者是给予用户提示,比如模糊匹配的时候

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


问: 作用域和作用域链的含义和使用场景[to extend]
作用域是代码运行时变量与函数的可访问性, 由变量与函数的定义位置确定. 作用域分为全局作用域、函数作用域、以及块级作用域。 
作用域链是由变量对象构成的链条, 每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中. 用域链的前端，始终都是当前执行的代码所在环境的变量对象。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境. 访问变量时, 会沿着作用域链向上查找.
每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。代码在执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境.
作用域是访问变量(包括函数名)的一套规则  
作用域与变量声明和函数定义位置有关, 层层嵌套, 内部可以访问外部, 外部不可访问内部, 访问变量时一层层往上找, 找到就停下, 到底了也找不到就会报引用错误;  
变量赋值时也是一层层往上找, 找到就地赋值, (严格模式下) 找不到报引用错误; (非严格模式下) 这个变量会成为window的属性  
无论是否严格模式, 在全局声明的变量是 window 的属性; 在全局定义的函数, 是 window 的方法  
参考：
## 执行环境/执行上下文
执行环境（execution context）是 JavaScript 中最为重要的一个概 念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。  
每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。  
全局执行环境是最外围的一个执行环境。在 Web 浏览器中，全局执行环境被认为是 window 对象，因此所有全局变量和函数都是作为 window 对象的属性和方法创建的。某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退出——例如关闭网页或浏览器——时才会被销毁）。  
每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。 而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。  
当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对 象在最开始时只包含一个变量，即 arguments 对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

问：原型、原型链
每个对象都有一个_proto_属性, 指向其构造函数的prototype属性. 由于每个对象都有这个属性, 就形成了一个原型链条, 当访问对象属性的时候, 会一直沿着原型链向上查找, 找到就返回结果, 如果找到 Object.prototype._proto_ null, 就返回 undefined; 赋值当然就赋给自己了.
备注：每个构造函数都有一个原型prototype对象（有些内置函数是没有的，无法充当构造函数比如Object.prototype.toString）

问: eventLoop[to extend]
https://segmentfault.com/a/1190000016278115
https://juejin.cn/post/6844903657264136200
js 是一门单线程语言, 也就是同一时间只能做一件事. 有些操作需要比较长的时间, 如果一直等待, 会造成阻塞. Event Loop 是一种 "排队" 的机制, 异步任务分为宏任务与微任务, 在主代码执行过程中, 将遇到的宏任务放入宏任务队列, 将微任务放入微任务队列; 在主代码结束后会将微任务执行完毕; 之后再次开启下一轮的宏任务, 依次循环.
script(主代码)有人说是宏任务, 有人说是微任务, 感觉没有必要纠结
宏任务: setTimeout; setInterval; requestAnimationFrame
微任务: Promise 的 then/catch/finally 函数, Promise为基础开发的其它技术, 如 fetch API
疑问: 那除了宏任务和微任务, 其他顺着执行的代码是啥呢? 宏任务和微任务是异步任务, 其他代码是同步任务

参考: js 是一门单线程语言 (浏览器只给 js 引擎分配了一个线程), 也就是说同一时间只能做一件事(执行一条语句)。这是因为 JavaScript 生来作为浏览器脚本语言，主要用来处理与用户的交互、网络以及操作 DOM。这就决定了它只能是单线程的，否则会带来很复杂的同步问题。假设 JavaScript 有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？
但是, 又确实有些事情是比较费时间的, 如果一直等着, 太耽误事. 怎样做才能尽可能地提高效率呢? 既然一次只能做一件事情, 那么肯定是要进行排队的, 要优化, 也只能在这上面做文章. Event Loop 就是一种 "排队" 的机制: 一次放进去一批任务, 其他的等第二轮 [宏任务]; 在当前一批任务里, 依次执行, 遇到有问题的, 拉到一边, 处理完了, 就在旁边等着, 等其他正常的过完了, 再放过去 [微任务].


问: 函数的 this 指向
this是JavaScript的一个关键字，是指函数执行过程中，自动生成的一个内部对象。
this 既不指向函数自身也不指向函数的词法作用域，它实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数如何被调用。作用域链取决于函数的定义位置，而 this 取决于函数的调用位置 (或者说, 指向函数的调用者)。
this 永远指向最后调用它的那个对象, 如果查找属性的时候找不到, 也不会继续向上寻找
#### 具体规则
(1) 在独立函数调用时, 非严格模式下, 默认指向 window; 严格模式下 this 为 undefined;
(2) 在带修饰的函数调用时, 如调用方式为 obj.fn() 时, this 指向 obj; (注意：obj.fn 赋值给其他变量(包括参数传递),再通过变量调用等同于独立调用,使用第一条规则)
(3) call, apply, bind 可以改变默认的指向, 这三个函数更改了函数的调用者 (call 的第一个参数是对象, 包括一般对象, 数组/伪数组, 函数对象)

趣谈js的bind牌胶水: https://juejin.im/post/5af935d151882542821c6d91
趣谈js的call和apply两大召唤术: https://juejin.im/post/5b028b5d6fb9a07acb3d2c99

备注：call() 方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。

#### 不太好判断的情况
- 构造函数: 构造函数函数体 {} 内的 this 指向实例（准确的说是 new 调用）; 构造函数原型对象内的方法的 this 也指向实例（因为是由实例对象调用的）
- 计时器: 参数是普通函数, this 指向 window; 参数是箭头函数, 跟随它定义位置的 this, 也就是计时器(参数)所在的函数体的 this（相当于独立函数调用）
- Vue 实例: Vue 实例的 this 指向实例本身; Vue 实例中函数的 this 指向实例本身（因为是实例身上的方法，包括methods和各种生命周期钩子）
- 事件处理函数: 事件处理函数的 this 指向事件源(事件绑定的元素)
- 数组/类数组的成员函数: this 指向数组/类数组
- 箭头函数: 【查询】箭头函数与普通函数的差别。

```js
var opt = {
  name: "Amy",
  say: function(){
    setTimeout(()=>{console.log(this.name)})
  }
}
opt.say() //Amy
```

#### 问题
##### 一个函数 A 内有一个函数 B, 这个 B 函数是属于谁的
```js
var name = "windowsName";
console.log(window.name)  // windowsName
const test = 'test'
console.log(window.test) //undefined
function fn() {
    const name = 'Cherry';
    function innerFunction() {
      console.log(this.name);      // windowsName
    }
    console.log(window.innerFunction) //undefined
    innerFunction();    
}
fn()
console.log(window.innerFunction) //undefined
```

问: 类数组转换为数组
//通过call调用数组的slice方法来实现转换
Array.prototype.slice.call(arrayLike)

//通过call调用数组的splice方法来实现转换
Array.prototype.splice.call(arrayLike,0)

//通过apply调用数组的concat方法来实现转换
Array.prototype.concat.apply([],arrayLike)

//通过Array.from方法来实现转换
Array.from(arrayLike)


问: 数组去重


问: for...in 和 for...of的区别
for...in获取的是对象的键名, for...of遍历获取的是对象的键值;
for...in会遍历对象的整个原型链, 性能非常差不推荐使用,而for...of只遍历当前对象不会遍历原型链;
for of 需要对象支持iterator 接口

### DOM 事件流的三个阶段

- 一个 DOM 事件发生时, 会自根元素发出事件流, 一直到达 目标元素的直接父元素, 是事件捕获阶段, 注册在该阶段的事件处理函数会执行 (addEventListener 的第三个参数为 true); 接着到达事件目标位置, 也就是目标阶段; 然后原路返回, 是事件冒泡阶段, 注册在该阶段的事件处理函数会执行.
- 当一个元素上, 捕获和冒泡阶段都注册了事件时, 除了目标元素(事件触发元素), 都会在相应阶段执行函数; 而目标元素, 则是按照注册的顺序, 捕获写在前面, 就先执行捕获, 否则相反
- event.target 是事件触发元素, event.currentTarget 是事件注册元素, 两者可能不一致

### 事件委托

https://www.cnblogs.com/soyxiaobi/p/9498357.html

- “事件代理”即是把原本需要绑定在子元素上的响应事件（click、keydown......）委托给父元素，让父元素担当事件监听的职务。
- 事件代理的原理是事件的捕获/冒泡
- 优点:
  1. 提高性能:每一个函数都会占用内存空间，只需添加一个事件处理程序代理所有事件,所占用的内存空间更少。
  2. 动态监听:使用事件委托可以自动绑定动态添加的元素,即新增的节点不需要主动添加也可以一样具有和其他元素一样的事件。


问：js 继承
- 原型链继承
- 构造函数继承
- 组合继承
- 原型式继承
https://blog.csdn.net/jatej/article/details/120317973


### HTML5 新特性
https://juejin.cn/post/6988039257587712008
- 标签的语义化  header,footer,section,nav,aside,article...  
- 增强型表单(input的type: Color,date,email,number,range,tel)
- 音视频标签 radio video
- 本地存储 localStorage sessionStorage
- canvas, svg
- 地理位置  getCurrentPosition(); watchPosition(); clearWatch();
- 拖放（Drag 和 drop）
- 新事件  Onresize:调整窗口大小; Ondrag：拖动元素; onscroll; Onmousewheel: 鼠标滚轮; onplay; onpause; 
- websocket
WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
- webwoker 独立于其他脚本，不影响页面性能运行在后台的javascript

### 语义化
所谓，语义化的标签，说明让标签有自己的含义。也是近十年。最典型的栗子就是header，footer等，它可以让你在没有样式的情况下，就大概能想到，他就是个头部或者底部。他存在的意义，就是让前端开发人员，在开发过程中，更容易去阅读代码，以及明白这些代码的意义。
它的好处是：
1.能够更好地展示内容结构
2.便于团队的维护与开发
3.有利于SEO，爬虫可以分析每个关键词的权重。
4.方便其他设备解析 (如屏幕阅读器)


问: CSS3 新特性
https://juejin.cn/post/7064502249497559070
- 过渡 transition (过渡可以为一个元素在不同状态之间切换的时候定义不同的过渡效果。比如在不同的伪元素之间切换，像是 :hover，:active 或者通过 JavaScript 实现的状态变化。)
- 动画 animation
- 形状转换 transform
- 新增选择器 (绝大部分为伪类选择器), 如 :first-of-type, :nth-child(n)
- 新增了三个边框属性 border-radius, box-shadow, border-image
- 新增了几个关于背景的属性，分别是background-clip、background-origin、background-size和background-break

- 文字属性增强 word-wrap text-overflow text-shadow text-decoration
- 渐变 linear-gradient radial-gradient
- 支持 RGBA, 如不兼容则需要分开写 RGB, opacity
- 引入flex/grid布局 

问：说一下盒模型
**W3C 盒模型(标准盒模型)**
通过 box-sizing: content-box（默认值） 设置; style 中书写的 width / height 值为 content 盒子宽高。

**IE 盒模型(怪异盒模型)**
通过 box-sizing: border-box 设置; style 中书写的 width / height 值为 content+padding+border 宽高之和。

当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将内容呈现在页面上。


问：重绘和重排的区别
重绘（repaint或redraw）：
重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。重绘发生在元素的可见的外观被改变，但并没有影响到布局的时候。比如，仅修改DOM元素的字体颜色（只有Repaint，因为不需要调整布局）

重排（重构/回流/reflow）：
当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。

触发重排的条件：任何页面布局和几何属性的改变都会触发重排：

页面渲染初始化(无法避免)
添加或删除可见的DOM元素
元素位置的改变，或者使用动画
元素尺寸的改变——大小，外边距，边框
浏览器窗口尺寸的变化
填充内容的改变，比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变
重排必定会引发重绘，但重绘不一定会引发重排。

如何避免触发回流和重绘：
避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为class并一次性更改 class 属性
将动画效果应用到position属性为absolute或fixed的元素上。
也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘
使用createDocumentFragment进行批量的 DOM 操作。
对于 resize、scroll 等进行防抖/节流处理。
避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
利用 CSS3 的transform、opacity、filter这些属性可以实现合成的效果，也就是GPU加速。
备注：CSS 选择符从右往左匹配查找
https://www.jianshu.com/p/176291637a94


问：visibility、display、opacity的区别 / 前端隐藏元素: (1)display: none; (2)visibility: hidden; (3)opacity: 0 的区别
https://juejin.im/post/5cf860ade51d4550a629b23b

(1)display: none
- 元素存在 dom 结构中, 可以被获取;
- 元素不会被渲染(不占用页面空间), 属性值切换会引起浏览器重排和重绘
- 不可交互(不会响应事件)

(2)visibility: hidden
- 元素存在 dom 结构中, 可以被获取;
- 元素会被渲染(占用页面空间)
- 不可交互

(3)opacity: 0
- 元素存在 dom 结构中, 可以被获取;
- 元素会被渲染(占用页面空间)
- 可以交互

问：单行截断css / 超出省略号
```html
<!-- 单行 -->
{
  width:200px;
  border:1px solid #000000;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
```

```html
<!-- 多行 (以两行为例; 其他行数改变 height 和 -webkit-line-clamp 即可) -->
{
  width:400px;
  border:1px solid #ccc;
  line-height:30px;
  height:60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

问：flex 布局
http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
任何一个容器都可以指定为 Flex 布局。通过各种属性可以定义容器内子元素的排布方式。
问: flex 有哪些属性?
容器属性: display: flex; flex-direction: row | row-reverse | column | column-reverse; flow-wrap: nowrap | wrap | wrap-reverse; flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap; justify-content: flex-start | flex-end | center | space-between | space-around; align-items: flex-start | flex-end | center | baseline | stretch;
项目属性 order
flex-grow
flex-shrink
flex-basis
flex
align-self (允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性。)
问：flex：1
答：flex 属性是 flex-grow, flex-shrink, flex-basis 三个属性的缩写，flex：1 代表着 1 1 auto，可以实现了三个不同内容的 div 平分空间，还有另外两种完整写法, 分别是 initial (0 1 auto) 和 none (0 0 auto)
备注: - 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
- flex-basis 属性优先于 width 属性; flex-basis 百分比相对容器的 content-box

问：css和js两种方式实现div右移1000px动画
试答：css 使用 animation 属性；js 为元素设置 postion: relative 并使用 setInterval 不断调整元素 left 属性值。
animation: 1.2s linear 1s infinite alternate slidein;
@keyframes slidein {
  from { margin-left: -35%; }
  to  { margin-left: 50%; }
}
问：transition、transform、translate的区别
答：transition 可以实现 css 动画；transform 主要是元素的静态变换，包括 translate 移动元素，scale 缩放元素，rotate 旋转元素。

问：如何画一条 0.5px 的边框
https://juejin.cn/post/6844903582370643975#comment
答：
缩放：
.hr.scale-half {
    height: 1px;
    transform: scaleY(0.5);
    transform-origin: 50% 100%; // 单独用transform: scaleY(0.5);height: 1px;这样肯定是会变虚，但是你可以指定变换的原点，加上这个transform-origin: 50% 100%;就不会有虚化
}
线性渐变：
.hr.gradient {
    height: 1px;
    background: linear-gradient(0deg, #fff, #000);
}
.hr.boxshadow {
    height: 1px;
    background: none;
    box-shadow: 0 0.5px 0 #000;
}
备注：ppi(pixel per inch)，dpr/设备像素比（物理像素/逻辑像素），如果设备像素比为2，那就是1个逻辑像素（css像素）需要2个物理像素来显示，dpr的最大值是3

问：说一下BFC
答：BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

**下列方式会创建块格式化上下文 / 触发 BFC：**
- 根元素 html
- 浮动元素，float 除 none 以外的值
- 定位元素，position（absolute，fixed）
- display 为以下其中之一的值 inline-block，table-cell，table-caption
- display 为 flow-root, 可以创建无副作用的 BFC
- overflow 除了 visible 以外的值（hidden，auto，scroll）
- Flex items (flex 容器的直接子元素)

**BFC 特性：**
bfc 容器里面的子元素不会影响外面元素；
内部元素在垂直方向上一个接一个的放置；
垂直方向上的距离由margin 决定；（解决外边距重叠问题）
bfc 的区域不会与 float 的元素区域重叠；（防止浮动文字环绕）
计算 bfc 的高度时，浮动元素也参与计算；（清除浮动）


问：parent元素宽高不定，实现scale固定宽高比始终为4：3
答：(题目意思没有很清晰，试答) 【有些属性的百分比是基于父元素宽度，有些是基于父元素高度】
<div class="parent">
    <div class="child"></div>
</div>
使用 scale 函数
.parent{
  width: 300px;
  height: 100px;
  background-color: yellow;
  .child{
    width: 100%;
    padding-top: 100%;
    transform: scale(1, 0.75);
    transform-origin: 0 0;
    background-color: red;
  }
}
使用 padding
.parent{
  width: 300px;
  height: 100px;
  background-color: yellow;
  .child{
    width: 100%;
    padding-top: 75%;
    background-color: red;
  }
}

问：CSS垂直居中的方案
#### 水平居中

- 居中对齐margin:0 auto; (右对齐margin-left:auto; 左对齐margin-right:auto)

- 将元素转换为 inline/inline-block，然后其父元素加上 text-align: center;
*text-align CSS属性定义行内内容（例如文字）如何相对它的块父元素对齐。text-align 并不控制块元素自己的对齐，只控制它的行内内容的对齐。*

#### 水平垂直居中

--1
子元素相对于父元素绝对定位，并且margin值减去自己宽高的一半（需知道子元素宽高）
子元素{top: 50%; left: 50%; margin-left: -half self-width; margin-top: -half self-height}
*定位相对于父元素，移动50%是移动父元素width的一半

--2
子元素相对于父元素绝对定位，并且margin值为auto（不需知道子元素宽高）
```css
.divfather{
      background-color: green;
      width: 80px;
      height: 30px;
      margin-bottom: 5px;
      position: relative;
    }
    .divson{
      background-color: red;
      width: 40px;
      height: 10px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
```

Note: left属性定义了定位元素的左外边距边界与其包含块左边界之间的偏移
必须将left right 同时设置为0，此时auto因设为自动两边而同等填充，直到接触包含块边界，从而满足left right为0，这样就实现了元素居中。
*同时设置margin和left等时，先是margin，然后移动。margin是元素自身属性，left等移动属性居后

--3
diplay：table-cell
该方式是将元素转换成表格样式，再利用表格的样式来进行居中
父元素{display: table-cell; vertical-align: middle}
子元素{margin: auto}

--4 与--1 类似
绝对定位和transfrom
元素{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)}
*translate相对于自己，移动50%是移动自己宽高的一半

--5
css3中的flex属性
父元素{display: flex; justify-content: center; align-items: center}

问：伪元素和伪类的区别
http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/
伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到
伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover 来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 dom 树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

问：position的几个属性和含义
答：static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
fixed 生成固定定位的元素，相对于浏览器窗口进行定位。
relative 生成相对定位的元素，相对于其正常位置进行定位。
absolute 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
sticky 粘性定位，该定位基于用户滚动的位置。它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。（不了解，没使用过）

自行补充：
### 选择器权重
单选择器: !important > 行内style > id > class/伪类/属性选择器 > 标签选择器/伪元素 > 通配符选择器 > 继承样式
多选择器：从权重最大的选择器开始，比较其个数，个数多的优先级更高，相等则比较权重次之的选择器个数，以此类推。

问: 媒体查询是什么

问: 画三角形

路边的小花
使用CSS size-adjust和unicode-range改变任意文字尺寸
https://www.zhangxinxu.com/wordpress/2022/03/css-size-adjust-font-unicode-range/


问：vue-router原理
前端路由的核心，就在于改变视图的同时不会向后端发出请求；而是加载路由对应的组件。vue-router就是将组件映射到路由, 然后渲染出来的。并实现了三种模式：Hash模式、History模式以及Abstract模式。默认Hash模式，今天主要介绍Hash模式和History模式。

[vue-router] hash模式与history模式的区别[to extend]
https://juejin.cn/post/6993840419041706014
https://blog.csdn.net/wangningjing87/article/details/100982120/
当进行路由跳转时, 两种路由都不会进行整个页面的刷新, 二者跳转都相当于是在同一个文档中的锚中跳转.
history 模式下每次URL的改变都属于一次http请求
history 需要后端协同, hash 不需要
hash 会有一个 # 的符号
push 和 replace 方法的实现不同
hash 能兼容到IE8， history 只能兼容到 IE10

问：路由守卫：三种路由守卫
router. beforeEach, beforeResolve, afterEach（beforeEach 用来确定文档标题）
路由对象内的守卫：beforeEnter
组件独享守卫：beforeRouteEnter beforeRouteUpdate beforeRouteLeave（离开时提示正在编辑）

问：css module原理

问：对 MVVM 的理解
view 视图界面，用来展示UI界面和响应用户交互，model 数据模型，用来存储数据，viewModel 连接二者的桥梁，在 vue 应用中由 vue实例充当，负责处理数据绑定和dom事件监听。


问: 为何组件中 data 必须是函数
因为js中对象是地址传递的, 如果直接使用对象，在复用组件时, 由于所有组件的 data 都指向同一个对象, 在某个组件中修改data数据，其他组件的 data数据也会被修改; 使用函数返回对象，可以让每个组件都维护自己的数据。
备注：new Vue() 选项对象中的 data 可以是对象, 因为其产生的实例是不会被复用的 (根实例只能有一个)

### 双向数据绑定的实现原理
双向绑定技术，不是 Vue 独有的特性，而是一个公共的解决方案，它目前已经被广泛的框架运用。
[原生 JS] 通过 JavaScript 控制 DOM 的展示，就是数据（Data）到模板（DOM）的绑定，这就是数据单向绑定。而双向绑定就是在这个基础上，又扩展了反向的绑定效果，就是模板到数据的绑定。

```js
const data = { value: 'hello' }
document.querySelector('p').innerText = data.value;
<input onkeyup="change(event)" />
<input onkeyup="change(event)" />
const data = { value: '' }
const change = e => {
    // 更新输入值
    data.value = e.target.value;
    // 且，同步值的展示
    document.querySelector('p').innerText = data.value
}
```

![](./img/interview4.png)

问：vue 的响应式原理/双向绑定（绑定了当然就是互相影响）
https://juejin.cn/post/6844903903822086151
答：vue 在数据观察阶段为 data 中定义的数据通过 Object.defineProperty 方法添加 get 和 set 方法， get 方法执行时, 如果Dep.target 有值, 则会向 Dep 实例对象的 subs 数组中添加依赖此属性的 Watcher，set 方法中通过调用 Dep 实例对象的 notify方法通知 Watcher 执行更新；
在模板编译阶段，为模板中出现的属性生成 Watcher，并访问该属性触发属性的 get 方法，完成依赖添加。

疑问：computed 触发的更新是怎么回事
备注：双向绑定主要出现在用户控制元素，如 input 这些；如果使用原生简单实现，那就是监听用户输入事件，修改其绑定的变量；为此变量添加 getter 和 setter，在其改变时获取其绑定的元素并更改元素的值。
需要注意的是, Object.defineProperty 处理的是对象, 对于数组, 是改写了其push/shift/pop/splice/unshift/sort/reverse方法, 因为这些方法都会改变数组本身。数组里的索引和长度是无法被监控的。

vue 中有三种数据绑定形式
- 插值形式 -- {{ data }}
- v-bind -- :class="class"
- v-model
那 v-on 绑定的函数呢, 如果不绑定 methods 而是绑定一个属性, 然后这个属性发生了变更[???]
vue 通过数据劫持实现了数据的响应式, 也就是单向绑定, 当数据发生变化时, 视图会自动更新; 同时, vue 通过监听 DOM 事件, 根据用户操作调用事件函数更改数据, 这样就形成了双向数据绑定
vue 提供 v-model 这个结合了 v-bind 和事件的语法糖, 让使用者可以更加简单地使用双向绑定
### 单向数据流

父组件通过 props 向子组件传递的数据， 不要在子组件中直接更改，否则将导致数据混乱和难以追踪。子组件可以将 prop 属性保存至 data 中， 或者使用计算属性。

备注: Object.keys
Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
https://www.jianshu.com/p/f5acb8f8745b
- 如果属性名的类型是Number，那么Object.keys返回值是按照key从小到大排序
- 如果属性名的类型是String，那么Object.keys返回值是按照属性被创建的时间升序排序。
- 如果属性名的类型是Symbol，那么逻辑同String相同


问: 从 new Vue 开始发生了什么


问：说一下虚拟DOM？为什么要使用虚拟DOM？
### 为什么
创建真实DOM的代价高：真实的 DOM 节点 node 实现的属性很多，而 vnode 仅仅实现一些必要的属性，相比起来，创建一个 vnode 的成本比较低。
使用 vnode ，相当于加了一个缓冲，让一次数据变动所带来的所有 node 变化，先在 vnode 中进行修改，然后 diff 之后对所有产生差异的节点集中一次对 DOM tree 进行修改，以减少浏览器的重绘及回流
vue 在一轮数据更改结束后对新旧vnode 进行比较, 然后将更改的地方更新到真正的dom树, 减少了真实dom操作, 减少浏览器的重绘及回流, 提升了性能
虚拟dom由于本质是一个js对象，因此天生具备跨平台的能力，可以实现在不同平台的准确显示。
无需用户手动操作dom
#### 原理
- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。
#### 优点
- 无需手动操作 DOM
- 减少 DOM 操作, 提升性能
追问：虚拟DOM是如何合并patch的


问：Vue中key的作用
key是每个vnode的唯一id，在同级vnode的Diff过程中，可以根据key快速的进行对比，来判断是否为相同节点，从而尽可能的复用 DOM 元素; 如果不设置key, 由于vue采取就地复用策略, 可能会出现样式与位置错乱的情况, 另外,如果是组件, 由于复用而不是销毁, 将无法按预期触发生命周期.
追问：为什么不建议用index作为key?
用index 作为 key，和没写基本上没区别，因为不管你数组的顺序怎么颠倒，index 都是 0, 1, 2 这样排列，导致 Vue 会复用错误的旧子节点，做很多额外的工作
一般都用数据中的唯一值,比如ID这种,或者实在不行使用UUID库。
备注: 什么是"就地复用"[!不要说这个]
https://www.zhihu.com/question/61078310
如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素

问：组件通信的方式有哪些
https://www.cnblogs.com/fundebug/p/10884896.html
答：props 与 自定义事件；vuex / 本地存储，也就是sessionStorage或localStorage; query 或 params（不对，这个是基于路由的）；provide & inject；$attrs/$listeners;
$parent / $children与 ref；eventBus 事件总线；
追问：事件总线的原理
vue实例作为所有组件共享的事件中心，既可以发送事件也可以接受事件，所有组件都可以平行的接到到相对应的数据。
https://blog.csdn.net/weixin_41305441/article/details/106587493

问：computed 和 watch 的区别和运用的场景
https://vuejs.org/v2/guide/computed.html
答：
computed 的重点在于值, 用于对一个属性进行处理与转换, 或者基于多个属性生成一个新的值; 计算值会被缓存, 模板中多次使用也只会调用一次处理函数, 只有当其依赖的数据发生改变，才会重新进行计算
watch 的重点在于监听的值发生改变后, 执行的动作
computed
- 初次获取会发生一次调用（如果模板中没有使用就不会调用），然后结果会被缓存下来，只有依赖的数据(响应式属性，直接定义在script里面的属性是无效的)发生改变，才会重新进行计算
- 不支持异步，当computed内有异步操作时无效（不对，可以写异步操作，但是没有意义，因为需要 return， 异步结果没有返回处理函数就已经执行完毕了
- 如果一个属性依赖其他一个或多个属性, 一般用computed
*简写为 get 方法, 改变计算属性会报错; 如果需要更改, 要使用对象, 同时写上 get 和 set 方法*

watch
- 不支持缓存，数据变，直接会触发相应的操作
- 支持异步
- 被监听的数据必须是响应式属性，直接定义在script里面的属性是无效的
- 当监听的属性发生变化时，执行回调函数, 对其他一个或多个属性进行操作
*简写为 handler, 如果需要设置其他属性, 使用对象*
```js
watch: {
  firstName: {
    handler(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    immediate: true, //观察开始时立即执行 handler
    deep: true // deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改obj里面任何一个属性都会触发这个监听器里的 handler (针对对象的特定属性, 可以使用字符串的形式监听, 如 obj.a)
  }
}
```
追问：watch 能监听 computed 的属性吗？可以。


问：vue的生命周期，也就是 vue 实例 vue 组件的生命周期？
答：Vue 实例在被创建时要经过一系列初始化过程，在这个过程中会运行一些叫做生命周期钩子的函数，让用户在不同阶段添加自己的代码。
【官网】每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。
一个不被 keep-alive 包裹的 vue 组件有 8 个生命周期钩子，分别是 beforeCreate created beforeMount mounted beforeUpate updated beforeDestory destroyed. 被 keep-alive 包裹会多出两个生命周期钩子 activated 和 deactivated;
备注: activated 会在 mounted 调用后调用

追问：父子组件生命周期钩子的执行顺序
加载渲染过程
　　父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
子组件更新过程
　　父beforeUpdate->子beforeUpdate->子updated->父updated
父组件更新过程
　　父beforeUpdate->父updated
销毁过程
　　父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
追问：mounted拿到数据可以后可以直接获取dom吗
答：不可以，此时dom还未渲染完毕, 需要使用 $nextTick
最佳实践: 
created { 发送 http 请求}
mounted {操作 DOM}
beforeDestroy {去除全局的东西, 如事件总线接收器, 给 window 添加的方法, 定时器}

追问：nextTick原理
https://www.jianshu.com/p/7f9495b1c8ab
https://zhuanlan.zhihu.com/p/174396758
答：Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。传入nextTick的回调函数会在视图更新完毕后调用
备注：与事件循环 event loop 相关

问：vue diff
https://zhuanlan.zhihu.com/p/76384873

问：vue模板（template）里为什么不能使用多个头结点？
答：因为 vue 实例挂载需要一个入口，如果有多个头结点，难以确定哪一个要作为实例的入口（貌似不太对，这只是现象）
https://segmentfault.com/a/1190000021614697
- 虚拟DOM差异算法依赖于具有单个根的组件；一个组件对应一个VNode；也就是说主要受制于当前 Virtual DOM 机制，每个组件实例只对应一个 VNode 以提高 diff 效率。
网上的说法：Vue 2 的 Virtual DOM 机制是基于 Snabbdom 实现的。而引入 Virtual DOM（的目的之一）是为了提升渲染性能，这要靠 diff & patch 来实现。模板的灵活性相对于渲染性能被放到了次要的位置，因此 Vue 2 决定每个组件实例只对应一个 VNode 以提高 diff 效率。
Vue 3 完全重写了 Virtual DOM 机制，引入了其他机制来保证模板渲染性能，此时组件对应的 VNode 数量已经不是重要的问题，便自然支持了 Fragment（也就是多根节点）。
https://forum.vuejs.org/t/vue2/106896

问：vuex为什么同时设计mutation和action？只设计一个行不行？
答：区分同步和异步操作，方便在 vue tools 追踪数据的变化；
可以吧，vuex4/pinia 里就只设计了 mutations
https://blog.csdn.net/qq_44285092/article/details/122627683


问: 函数式组件
https://juejin.cn/post/6844903887787278349
- 通过 <template functional> 或选项对象 { functional: true } 设置
- 是一个不包含状态和实例的组件, 可以接收 props
- render 函数第二个参数为上下文 context
优点:
- 一个简单的展示组件，也就是所谓的 dumb 组件。例如， buttons, pills, tags, cards，甚至整个页面都是静态文本，比如 About 页面。
- v-for 循环中的每项通常都是很好的候选项
- “高阶组件”——用于接收一个组件作为参数，返回一个被包装过的组件

问: 高阶组件


问：vue2和 vue3 在数据绑定这一块有什么区别？
答：vue2 主要通过 Object.defineProperty 方法设置 getter 与 setter，vue3 通过 Proxy 对象创建代理；vue2 由 vue 自动实现数据响应式，vue3 需调用 api 手动设置

问：vue的优化方案（等同于如何编写可读性高、易维护且高性能的vue代码）
https://juejin.cn/post/6844903913410314247（帖子有点老了）
答一：v-if 和 v-show 区分使用场景 / v-show和v-if的区别
v-show
- 在任何条件下（首次条件是否为真）都被编译
- 基于 CSS 的 display 属性进行切换
- 可获取元素
- 如果是组件, 只有初次渲染会触发生命周期，切换时不会触发生命周期

v-if
- 如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译 (只有为 true 才可获取元素)
- 通过动态的向 DOM 树内添加或者删除元素
- 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件
- 如果是组件, 会触发生命周期

使用：v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

答二：长列表性能优化
当大量数据用于仅用于展示时，不会有任何改变时，可以通过 Object.freeze 方法将其冻结，Vue 将不会为已经冻结的属性加上 setter getter，可以减少组件初始化的时间。
备注1：在 Vue 的文档中介绍数据绑定和响应时，特意标注了对于经过 Object.freeze() 方法的对象无法进行更新响应。
备注2：Object.freeze() 用于冻结对象，禁止对该对象的属性进行修改 (也可以对数组使用);
冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性或修改已有属性的值，也不能修改该对象已有属性的可枚举性、可配置性、可写性。此外，冻结一个对象后该对象的原型也不能被修改。
freeze() 返回和传入的参数相同的对象。
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
备注3：其他方法【一般遇到无需vue进行观测的数据，会在created的钩子里定义属性不会被拦截也可以在组件实例中访问；定义在$options里面

答三：


问：keep-alive的原理，使用有什么问题？如何解决？
https://blog.csdn.net/nanxun201314/article/details/117451442
https://www.jianshu.com/p/9523bb439950
是什么：keep-alive是Vue的一个内置组件。它能够将不活动的组件实例保存在内存中，而不是直接将其销毁。他是一个抽象的组件，不会渲染到真实的dom中，也不会出现在父组件中。
原理：在 created钩子函数调用时将需要缓存的 VNode 节点保存在 this.cache 中／在 render（页面渲染） 时，如果 VNode 的 name 符合缓存条件（可以用 include 以及 exclude 控制），则会从 this.cache 中取出之前缓存的 VNode实例进行渲染。
使用场景：【页面状态保持】用户在某个列表页面选择筛选条件过滤出一份数据列表，由列表页面进入数据详情页面，再返回该列表页面，我们希望：列表页面可以保留用户的筛选（或选中）状态。
遇到的问题：列表-编辑详情-其他页面，如果“编辑详情”也需要缓存下来，那么从列表进入会有之前的数据残留
解决方案：在路由的 meta 中定义页面层级，通过 mixin 在需要缓存的组件中混入 beforeRouteLeave 路由守卫，在路由守卫中判断，如果是返回上层去除本页面缓存。
备注：同时需要注意使用了缓存那么要在 activated 中调用请求，而不是 mounted
相关知识：LRU 算法（max定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。）
https://blog.csdn.net/qq_34343254/article/details/110082648





问: 自定义指令
在 Vue 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令

问: 插槽是什么 怎么使用的

杂七杂八
echarts 常用图表类型
折线图，柱状图，饼图，油量图，雷达图

typescript
type 和interface的区别
https://juejin.cn/post/6844903749501059085

问: 0.1 + 0.2 为什么不等于0.3
因为计算机是二进制, 所有的计算都是以二进制方式计算的, 在把0.1和 0.2 从十进制转成二进制的过程中发生了精度丢失
追问: 计算机为什么是二进制的
计算机是由逻辑电路组成,逻辑电路通常只有两个状态,开关的接通与断开,这两种状态正好可以用“1”和“0”表示。

问: 常见状态码
    <!-- 状态码：由3位数字组成，第一个数字定义了响应的类别 -->
    <!-- 1xx：指示消息,表示请求已接收，继续处理 -->
    <!-- 2xx：成功,表示请求已被成功接收，处理 -->
    <!-- 200 OK：客户端请求成功
         204 No Content：无内容。服务器成功处理，但未返回内容。一般用在只是客户端向服务器发送信息，而服务器不用向客户端返回什么信息的情况。不会刷新页面。
         206 Partial Content：服务器已经完成了部分GET请求（客户端进行了范围请求）。响应报文中包含Content-Range指定范围的实体内容
 -->
    <!-- 3xx 重定向 -->
    <!-- 301 Moved Permanently：永久重定向，表示请求的资源已经永久的搬到了其他位置。
         302 Found：临时重定向，表示请求的资源临时搬到了其他位置
         303 See Other：临时重定向，应使用GET定向获取请求资源。303功能与302一样，区别只是303明确客户端应该使用GET访问
         307 Temporary Redirect：临时重定向，和302有着相同含义。POST不会变成GET
         304 Not Modified：表示客户端发送附带条件的请求（GET方法请求报文中的IF…）时，条件不满足。返回304时，不包含任何响应主体。虽然304被划分在3XX，但和重定向一毛钱关系都没有
 -->
    <!-- 4xx：客户端错误 -->
    <!-- 400 Bad Request：客户端请求有语法错误，服务器无法理解。
         401 Unauthorized：请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用。
         403 Forbidden：服务器收到请求，但是拒绝提供服务
         404 Not Found：请求资源不存在。比如，输入了错误的url
         415 Unsupported media type：不支持的媒体类型
 -->
    <!-- 5xx：服务器端错误，服务器未能实现合法的请求。 -->
    <!-- 500 Internal Server Error：服务器发生不可预期的错误。
         503 Server Unavailable：服务器当前不能处理客户端的请求，一段时间后可能恢复正常，
 -->


问: localStorage sessionStorage cookie 的区别? 同一个系统 sessionStorage 是否共通?[否](一个session会话就是浏览器的一个页签)
Cookie:cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而seesionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以显示cookie只属于某个路径下，存储的大小很小，只有4k左右。
sessionStorage:仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
localStorage：localStorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的
**关于cookie的更多情况**
https://juejin.cn/post/6844904034181070861
HTTP 是无状态的协议（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。
- maxAge expires 设置过期时间
- httpOnly 如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，但还是能通过 Application 中手动修改 cookie，所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全


问: vue 单页面应用如何进行 seo
https://www.jb51.net/article/225527.htm

问: 是否了解 ssr
https://juejin.cn/post/7086467466703929358
什么是 SSR
服务器端渲染（Server-Side Rendering）是指由服务端完成页面的 HTML 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程。（有服务端完成 html 结构拼接并返回给前端直接展示）
简单理解就是html是由服务端写出，可以动态改变页面内容，即所谓的动态页面。早年的 php、asp 、jsp 这些 Server page 都是 SSR 的。
为什么使用 SSR
网页内容在服务器端渲染完成，一次性传输到浏览器，所以 首屏加载速度非常快；
有利于SEO，因为服务器返回的是一个完整的 html，在浏览器可以看到完整的 dom，对于爬虫、百度搜索等引擎就比较友好；
VUE SSR
- vue 项目可以自行配置实现
- 使用 nuxt 框架 （node 作为BFF中间层）


问: 单页面和多页面应用的区别
https://blog.csdn.net/weixin_43919136/article/details/105326679
多页面：每一次页面跳转的时候，服务器都会给返回一个新的html文档，这种类型的网站也就是多页网站，也叫做多页应用。
- 首屏时间快
- 搜索引擎优化效果好（SEO）
- 页面切换慢，并且页面会刷新
单页面：第一次进入页面的时候会请求一个html文件，通过前端页面路由来控制显示哪个页面。
- 首屏时间慢
- SEO差
- 页面切换快，并且不会有刷新的效果
疑问：那么 VUE 应用的多页面配置是怎么回事呢，算是多页面应用还是多入口单页面应用（虽然说不会在两个入口之间跳转）

追问: 那么单页面如何做 seo 呢
- ssr
- index.html 可以说一些处理


问: Loader和Plugin 有什么区别
Loader：直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到`loader`。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。   
Plugin：直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。


**借助了第三方平台也要细说一下流程**
问: 说一下前端登录的流程?
之前项目使用公司统一提供的登录页面和js文件，进入系统时如果没有登录，没有携带cookie，就会跳转到登录页面，登录验证成功后，会调用方法设置cookie，并重新跳转到本系统页面，之后的请求会自动携带cookie，如果cookie到期，就跳转到登录页面让用户重新登录。
备注：axios.defaults.withCredentials = true
https://www.csdn.net/tags/MtTaIgxsMzc0NTE5LWJsb2cO0O0O.html
初次登录的时候，前端调后调的登录接口，发送用户名和密码，后端收到请求，验证用户名和密码，验证成功，就给前端返回一个token，和一个用户信息的值，前端拿到token，将token储存到Vuex中，然后从Vuex中把token的值存入浏览器Cookies中。把用户信息存到Vuex然后再存储到LocalStroage中,然后跳转到下一个页面，根据后端接口的要求，只要不登录就不能访问的页面需要在前端每次跳转页面师判断Cookies中是否有token，没有就跳转到登录页，有就跳转到相应的页面，我们应该再每次发送post/get请求的时候应该加入token，常用方法再项目utils/service.js中添加全局拦截器，将token的值放入请求头中 后端判断请求头中有无token，有token，就拿到token并验证token是否过期，在这里过期会返回无效的token然后有个跳回登录页面重新登录并且清除本地用户的信息


问: 集成部署
在package.json 中配置命令
 "scripts": {
    "build": "vue-cli-service build --mode production",
    "build:di1": "vue-cli-service build --mode di1",
    "build:uat": "vue-cli-service build --mode uat",
    "dev:uat": "vue-cli-service serve --mode uat",
    "dev": "vue-cli-service serve",
    "lint": "vue-cli-service lint",
    "inte": "vue-cli-service serve --mode integration",
    "update:cmlayout": "npm i git+http://git.dev.cmrh.com/GM-CMUOP-PUBLIC/task-application-layout.git#develop"
  },
配置环境文件
.env.di1 等, 与命令中的 --mode 一致
在部署平台上配置相应的打包命令

问: 首屏性能优化你是怎么做的[???]

问: 在地址栏里输入一个地址回车会发生哪些事情
1、解析URL：首先会对 URL 进行解析，分析所需要使用的传输协议和请求的资源的路径。如果输入的 URL 中的协议或者主机名不合法，将会把地址栏中输入的内容传递给搜索引擎。如果没有问题，浏览器会检查 URL 中是否出现了非法字符，如果存在非法字符，则对非法字符进行转义后再进行下一过程。
2、缓存判断：浏览器会判断所请求的资源是否在缓存里，如果请求的资源在缓存里并且没有失效，那么就直接使用，否则向服务器发起新的请求。
3、DNS解析： 下一步首先需要获取的是输入的 URL 中的域名的 IP 地址，首先会判断本地是否有该域名的 IP 地址的缓存，如果有则使用，如果没有则向本地 DNS 服务器发起请求。本地 DNS 服务器也会先检查是否存在缓存，如果没有就会先向根域名服务器发起请求，获得负责的顶级域名服务器的地址后，再向顶级域名服务器请求，然后获得负责的权威域名服务器的地址后，再向权威域名服务器发起请求，最终获得域名的 IP 地址后，本地 DNS 服务器再将这个 IP 地址返回给请求的用户。用户向本地 DNS 服务器发起请求属于递归请求，本地 DNS 服务器向各级域名服务器发起请求属于迭代请求。
4、获取MAC地址： 当浏览器得到 IP 地址后，数据传输还需要知道目的主机 MAC 地址，因为应用层下发数据给传输层，TCP 协议会指定源端口号和目的端口号，然后下发给网络层。网络层会将本机地址作为源地址，获取的 IP 地址作为目的地址。然后将下发给数据链路层，数据链路层的发送需要加入通信双方的 MAC 地址，本机的 MAC 地址作为源 MAC 地址，目的 MAC 地址需要分情况处理。通过将 IP 地址与本机的子网掩码相与，可以判断是否与请求主机在同一个子网里，如果在同一个子网里，可以使用 APR 协议获取到目的主机的 MAC 地址，如果不在一个子网里，那么请求应该转发给网关，由它代为转发，此时同样可以通过 ARP 协议来获取网关的 MAC 地址，此时目的主机的 MAC 地址应该为网关的地址。
5、TCP三次握手： 下面是 TCP 建立连接的三次握手的过程，首先客户端向服务器发送一个 SYN 连接请求报文段和一个随机序号，服务端接收到请求后向客户端发送一个 SYN ACK报文段，确认连接请求，并且也向客户端发送一个随机序号。客户端接收服务器的确认应答后，进入连接建立的状态，同时向服务器也发送一个ACK 确认报文段，服务器端接收到确认后，也进入连接建立状态，此时双方的连接就建立起来了。
6、HTTPS握手： 如果使用的是 HTTPS 协议，在通信前还存在 TLS 的一个四次握手的过程。首先由客户端向服务器端发送使用的协议的版本号、一个随机数和可以使用的加密方法。服务器端收到后，确认加密的方法，也向客户端发送一个随机数和自己的数字证书。客户端收到后，首先检查数字证书是否有效，如果有效，则再生成一个随机数，并使用证书中的公钥对随机数加密，然后发送给服务器端，并且还会提供一个前面所有内容的 hash 值供服务器端检验。服务器端接收后，使用自己的私钥对数据解密，同时向客户端发送一个前面所有内容的 hash 值供客户端检验。这个时候双方都有了三个随机数，按照之前所约定的加密方法，使用这三个随机数生成一把秘钥，以后双方通信前，就使用这个秘钥对数据进行加密后再传输。
7、返回数据： 当页面请求发送到服务器端后，服务器端会返回一个 html 文件作为响应，浏览器接收到响应后，开始对 html 文件进行解析，开始页面的渲染过程。
8、页面渲染： 浏览器首先会根据 html 文件构建 DOM 树，根据解析到的 css 文件构建 CSSOM 树，如果遇到 script 标签，则判端是否含有 defer 或者 async 属性，要不然 script 的加载和执行会造成页面的渲染的阻塞。当 DOM 树和 CSSOM 树建立好后，根据它们来构建渲染树。渲染树构建好后，会根据渲染树来进行布局。布局完成后，最后使用浏览器的 UI 接口对页面进行绘制。这个时候整个页面就显示出来了。
9、TCP四次挥手： 最后一步是 TCP 断开连接的四次挥手过程。若客户端认为数据发送完成，则它需要向服务端发送连接释放请求。服务端收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表明客户端到服务端的连接已经释放，不再接收客户端发的数据了。但是因为 TCP 连接是双向的，所以服务端仍旧可以发送数据给客户端。服务端如果此时还有没发完的数据会继续发送，完毕后会向客户端发送连接释放请求，然后服务端便进入 LAST-ACK 状态。客户端收到释放请求后，向服务端发送确认应答，此时客户端进入 TIME-WAIT 状态。该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有服务端的重发请求的话，就进入 CLOSED 状态。当服务端收到确认应答后，也便进入 CLOSED 状态。


自我介绍:
面试官您好，我叫魏晨。从事前端开发四年多时间，就职过三家公司。上一份工作是外派到招商金科，参与开发供招商局集团下属各级公司使用的B端项目，包括审计系统与风控系统等。熟悉的技术栈有 vue 全家桶，element-ui 以及 echarts。
项目介绍
审计: 这个项目是招商局集团数字化中心为推动集团数字化转型，满足集团各公司内部审计需求而牵头构建的审计作业电子化平台。系统覆盖了从审计计划创建、审计方案与工作底稿拟定、审计报告撰写与整改任务下发及跟踪的审计作业全流程。整个流程以类似于步骤图的方式呈现五个阶段，各阶段下方展示对应子节点，用户通过点击节点即可跳转查看相应信息。系统提供多维度的数据统计图表，让用户能够直观了解审计项目，审计问题，整改跟踪等各方面的整体情况。同时允许用户动态配置节点和审批要求，灵活满足自身需求。
我的职责：
研究原型，将疑难点整理出来，在会上与项目经理和产品经理沟通确认；
参考其他项目的模板，根据本项目需要进行修改；
- 修改环境文件与vue代理地址，连接后台同事本地开发环境，将项目跑起来
- 用内部ui组件替换element 组件，因为项目模板使用 element-ui，而本项目领导要求使用内部ui库
- 项目模板没有公司信息，本项目数据要求按公司隔离，开发公司切换相关功能
- 项目模板菜单仅支持二级，面包屑导航仅支持三级，本项目菜单需支持三级，面包屑需要支持无限，进行相关功能改造
- 开发整体页面布局，封装部分公共组件，如枚举数据下拉框，导入导出功能
在新同事加入后，帮助他熟悉项目

风控：
参与开发了四个模块，分别是风险偏好、流动性风险、海外风险以及风险事件管理
其中前三个模块相似度：从风险因子导入或录入开始，基于因子创建指标，指标模块分为指标创建，阈值设置与指标计算，计算得出指标是否存在风险，呈现在指标运行情况与指标监控应对中，数据呈报功能，将所选公司指定时间区间的指标数据与相关情况呈报给上级公司。以及数据可视化页面。
风险事件管理，包括风险事件创建与管理，风险预警线设置，与事件呈报功能

常用 git 操作
-- 本地分支回滚到指定版本
git reset --hard <commit ID号>
-- 强制推送到远程分支
git push -f origin <branch name>

### git
#### 从远程仓库克隆代码到本地
- 直接使用 git clone 命令后，只有 master 分支
- 使用 git branch -r 命令查看所有分支，使用 git checkout `分支名` 切换到所需的分支
- 使用 npm i 安装依赖包

#### 从远程仓库拉取更新
- git pull

#### 推送非 master 分支至远程仓库
- git checkout local_branch
- git push origin local_branch:remote_branch

#### 完成本地开发后/提交之前
- 如使用分支开发，先合并到与要提交至的远程分支同名的本地分支；如无，下一步
- 使用 git pull 拉取其他人的提交
- git push origin local_branch:remote_branch 命令提交自己的代码 【 git push origin dev_3.0:dev_3.0】
**出现问题**
Merge branch 'dev_3.0' of http://git.dev.cmrh.com/EASS/eass-web-pc into dev_3.0
unknown committed about 14 hours ago
解决：需要设置自己的账户后提交(已设置)；使用 git pull --rebase

#### git 查看本地文件的修改明细
git diff 文件名

git merge
git stash

### vue-devtools 手动安装
- github master 分支下载 zip
- 解压后在根目录下 npm i -> npm run build
- 进入 shells - chrome -manifest.json 文件，将 persistent 属性改为 true
- 打开chrome浏览器，进入"更多工具"=>"扩展程序"=>“加载已解压的扩展程序”，选择 shells\chrome


网络安全 xss 与 csrf
https://www.cnblogs.com/zhouyyBlog/p/14505961.html
xss是跨站脚本攻击，攻击者通过“注入”，在网页中插入恶意代码，从而被浏览器执行所造成的一种攻击方式。
举一些实例，它可以进行如下操作：
1.窃取用户的cookie信息。恶意代码可以通过执行 ”doccument.cookie“获取用户的cookie信息，然后发送给恶意服务器
2.监听用户的输入行为。使用 "addEventListener"接口来监听键盘事件，比如可以获取用户输入的银行卡及密码等个人信息。
3.在页面生成浮窗广告或执行alert弹窗，造成不好的用户体验。

跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。
一个典型的CSRF攻击有着如下的流程：
受害者登录a.com，并保留了登录凭证（Cookie）。
攻击者引诱受害者访问了b.com。
b.com 向 a.com 发送了一个请求：a.com/act=xx。
a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
a.com以受害者的名义执行了act=xx。
攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。

在封装组件的过程中，遇到过什么问题？
1. 通用性，有时候因为产品设计的细微不同，需要区分适应多种情况
2. 表格控件封装后会影响校验吗？cmpc 好像有 element 好像没有

vue中v-html 有什么危害
https://blog.csdn.net/weixin_44683255/article/details/104564860?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ETopBlog-1.topblog&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ETopBlog-1.topblog&utm_relevant_index=1
V-html更新的是元素的 innerHTML 。内容按普通 HTML 插入， 不会作为 Vue 模板进行编译 。但是有的时候我们需要渲染的html片段中有插值表达式，或者按照Vue模板语法给dom元素绑定了事件；
使用v-html需要注意的第二个问题是：在单文件组件里，scoped 的样式不会应用在 v-html 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。如果你希望针对 v-html 的内容设置带作用域的 CSS，你可以替换为 CSS Modules 或用一个额外的全局
可能会导致 xss 攻击。用v-html一定要保证内容是可信赖的

浏览器兼容
表单控件不对齐问题 通过媒体查询解决
对 ie进行特殊处理
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  flex: 0 1 auto;
};
flex 问题
svg-icon 与 el-popover 一起用, 不触发的问题

性能优化, 
减少页面加载时间
vue 性能优化
生产环境下关闭productionSourceMap、css sourceMap，因为这两个东西是映射源文件的两个配置，作用是用来断点调试用的，所以生产环境根本不需要做这样的映射。
压缩js 和css (terser-webpack-plugin)
开启gzip压缩
按需加载, 尤其是只需要第三方库部分功能的时候
利用浏览器缓存
路由懒加载
keep-alive缓存页面，增加访问速度
合理使用v-show v-if

vue 代理
同源与跨域
es6语法
原型链
缓存
https://juejin.cn/post/6888875643266662414
memory cache本地缓存） 浏览器自主行为, 开发者无法干预
memory cache 是浏览器为了加快读取缓存速度而进行的自身的优化行为，不受开发者控制，也不受 HTTP 协议头的约束。当资源被存入内存后，下次同样的请求将不再通过网络，而是直接访问内存，当关闭该页面时，此资源就被内存释放掉了，再次重新打开相同页面时不再出现from memory cache的情况。
disk cache（HTTP缓存）
- 强制缓存 (也叫强缓存)
强缓存是不会向服务器发送请求，直接从缓存中读取资源
对于强缓存，控制它的字段分别是：Expires和Cache-Control，其中Cache-Control优先级比Expires高。
Cache-Control: max-age=3600 我希望你把这个资源缓存起来，缓存时间是3600秒（1小时）
Expires: Thu, 10 Nov 2020 08:45:11 GMT 到达指定时间过期
- 协商缓存
协商缓存是指在强缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识来决定是否使用缓存
If-Modified-Since: Thu, 30 Apr 2020 08:16:31 GMT  亲，你曾经告诉我，这个资源的上一次修改时间是格林威治时间2020-04-30 08:16:31，请问这个资源在这个时间之后有发生变动吗？
If-None-Match: W/"121-171ca289ebf"  亲，你曾经告诉我，这个资源的编号是W/"121-171ca289ebf，请问这个资源的编号发生变动了吗？
**缓存失效：**那么非常简单，服务器再次给予一个正常的响应（响应码200 带响应体），同时可以附带上新的缓存指令，浏览器缓存新的内容
**缓存有效：**服务器返回304重定向，并且响应头带上新的缓存指令，浏览器作出相应缓存动作。

设计模式(我也是有学过的呀, 就是学习的时候没有一个外在的标准, 学了等于没学, 以后就以面试为外在标准)
工厂模式
发布-订阅模式
单例模式
策略模式

### 前端向后台发送请求发生了什么【和“从输入URL到页面加载发生了什么”是同一个问题，浏览器中输入地址等同于get请求】
浏览器进行DNS域名解析，得到对应的IP地址
根据这个IP，找到对应的服务器建立连接（三次握手）
建立TCP连接后发起HTTP请求（一个完整的http请求报文）
服务器响应HTTP请求，浏览器得到html代码（服务器如何响应）
浏览器解析html代码，并请求html代码中的资源（如js、css、图片等）
浏览器对页面进行渲染呈现给用户
服务器关闭TCP连接（四次挥手）
#### get 与 post 的区别
https://juejin.cn/post/7078956663440408612
- get 发送数据的时候，数据会挂在URI的后面，通过？拼接
- post请求：发送数据的时候，在请求体当中发送。不会回显到浏览器的地址栏上
- get请求：只能发送普通的字符串。并且发送的字符串长度有限制，不同的浏览器限制不同。
- post请求：可以发送任何类型的数据，包括普通字符串，流媒体等信息：视频、声音、图片；可以发送大数据量，理论上没有长度限制。
- get请求：在W3C中是这样说的：get请求比较适合从服务端获取数据。
- post请求：在W3C中是这样说的：post请求比较适合从服务端传送数据。
- get请求支持缓存，任何一个get请求最终的“响应结果”都会被浏览器缓存起来。如果不希望缓存，只要每一次get请求的请求路径不同即可。可以在路径的后面添加一个每时每刻都在变化的“时间戳”。

#### http 和 https 的区别
https://blog.csdn.net/lyhjava/article/details/51860215
HTTP协议传输的数据都是未加密的，也就是明文的，因此使用HTTP协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了SSL（Secure Sockets Layer）协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS。
简单来说，HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全。

HTTPS和HTTP的区别主要如下：

1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

### 从输入URL到页面加载发生了什么？ 

#### 查询缓存【缓存是什么时候介入的有待查证）
浏览器查询是否有当前页面的资源缓存, 如果有, 直接取得资源, 开始解析渲染过程; 如果没有或者失效则进入下一步  
(http 缓存是客户端缓存，浏览器作为客户端接受到服务端响应后，对于响应首部字段进行解析，分析出相应的缓存规则，将资源按规则进行缓存，再次请求时如果命中缓存则直接读取本地缓存不再发出请求。)

http 缓存可以简单的划分成两种类型：强缓存（200 from cache）与协商缓存（304）
- 强缓存（200 from cache）时，浏览器如果判断本地缓存未过期，就直接使用，无需发起http请求
- 协商缓存（304）时，浏览器会向服务端发起http请求，然后服务端告诉浏览器文件未改变，让浏览器使用本地缓存

对于协商缓存，使用Ctrl + F5强制刷新可以使得缓存无效
但是对于强缓存，在未过期时，必须更新资源路径才能发起新的请求（更改了路径相当于是另一个资源了，这也是前端工程化中常用到的技巧）

#### DNS 解析
在网络世界，你肯定记得住网站的名称，但是很难记住网站的 IP 地址，因而也需要一个地址簿，就是 DNS 服务器  这一步在于获取 URL 对应的 IP 地址  
如果引入了 CDN, 那么情况更加复杂一些...  
如何给女朋友解释什么是CDN？https://juejin.im/post/5d478c48e51d453c135c5a5c#heading-1

#### 建立 TCP 连接
获取地址后, 客户端想要与服务器间通信并传递消息需要开启 TCP 连接  
首先，判断是不是 https 的，如果是，则HTTPS其实是HTTP + SSL / TLS 两部分组成，也就是在HTTP上又加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS进行加密，所以传输的数据都是加密后的数据。
接着, 进行三次握手, 建立 TCP 连接  
- (1) 客户端：hello，你是server么？(客户端发出连接请求)
- (2) 服务端：hello，我是server，你是client么 (服务端收到请求, 同意连接)
- (3) 客户端：yes，我是client (客户端确认)

https://juejin.im/post/6844903958624878606#comment
https://juejin.im/post/6844903834708344840

如果是 https, 则还需要额外的 SSL 握手过程

#### 发送 HTTP 请求 & 服务器处理请求并返回 HTTP 报文
TCP 连接建立后，浏览器就可以利用 HTTP／HTTPS 协议向服务器发送请求了。  
服务器接受到请求，就解析请求头，如果头部有缓存相关信息如 if-none-match 与 if-modified-since，则验证缓存是否有效，若有效则返回状态码为 304，若无效则重新返回资源，状态码为 200.

#### 浏览器下载资源, 解析代码, 渲染页面
浏览器下载 HTML, CSS, JS 资源后, 如果服务器有 gzip 压缩，浏览器先解压, 解压完成后开始渲染页面
这一部分比较重要 (是我能接触到, 能操作的, 能理解的; 并且能够优化, 有用的)

##### gzip 压缩
gzip 是一种压缩格式, 可以在进行 webpack 配置, 从而在打包时生成 .gz 文件, 这样服务器就不需要进行压缩, 给服务器省一点力气.

##### 页面渲染

![](./img/interview2.png)

- HTML parser：HTML解析器，其本质是将HTML文本解释成DOM tree。
- CSS parser：CSS解析器，其本质是将 DOM 中各元素对象加入样式信息
- JavaScript 引擎：专门处理JavaScript脚本的虚拟机，其本质是解析JS代码并且把逻辑（HTML和CSS的操作）应用到布局中，从而按程序要的要求呈现相应的结果
- DOM tree: 文档对象模型树，也就是浏览器通过HTMLparser解析HTML页面生成的HTML树状结构以及相应的接口。
- render tree：渲染树，也就是浏览器引擎通过DOM Tree和CSS Rule Tree构建出来的一个树状结构，和dom tree不一样的是，它只有要最终呈现出来的内容，像或者带有display:none的节点是不存在render tree中的。
- layout：也叫reflow 重排，渲染中的一种行为。当rendertree中任一节点的几何尺寸发生改变了，render tree都会重新布局。
- repaint：重绘，渲染中的一种行为。render tree中任一元素样式属性（几何尺寸没改变）发生改变了，render tree都会重新画，比如字体颜色、背景等变化。

##### 资源外链的下载
在解析 html 时，会遇到一些资源连接，此时就需要进行单独处理了
简单起见，这里将遇到的静态资源分为一下几大类（未列举所有）
CSS样式资源
JS脚本资源
img图片类资源


#### 连接结束
四次挥手
- (1) 主动方：我已经关闭了向你那边的主动通道了，只能被动接收了
- (2) 被动方：收到通道关闭的信息
- (3) 被动方：那我也告诉你，我这边向你的主动通道也关闭了
- (4) 主动方：最后收到数据，之后双方无法通信

## 完


typescript
https://juejin.cn/post/7003171767560716302

jquery
https://www.runoob.com/jquery/jquery-chaining.html

git branch 查看本地所有分支
git status 查看当前状态
git commit 提交 
git branch -a 查看所有的分支
git branch -r 查看远程所有分支
git commit -am "init" 提交并且加注释 
git remote add origin git@192.168.1.119:ndshow
git push origin master 将文件给推到服务器上 
git remote show origin 显示远程库origin里的资源 
git push origin master:develop
git push origin master:hb-dev 将本地库与服务器上的库进行关联 
git checkout --track origin/dev 切换到远程dev分支
git branch -D master develop 删除本地库develop
git checkout -b dev 建立一个新的本地分支dev
git merge origin/dev 将分支dev与当前分支进行合并
git checkout dev 切换到本地dev分支
git remote show 查看远程库
git add .
git rm 文件名(包括路径) 从git中删除指定文件
git clone git://github.com/schacon/grit.git 从服务器上将代码给拉下来
git config --list 看所有用户
git ls-files 看已经被提交的
git rm [file name] 删除一个文件
git commit -a 提交当前repos的所有的改变
git add [file name] 添加一个文件到git index
git commit -v 当你用－v参数的时候可以看commit的差异
git commit -m "This is the message describing the commit" 添加commit信息
git commit -a -a是代表add，把所有的change加到git index里然后再commit
git commit -a -v 一般提交命令
git log 看你commit的日志
git diff 查看尚未暂存的更新
git rm a.a 移除文件(从暂存区和工作区中删除)
git rm --cached a.a 移除文件(只从暂存区中删除)
git commit -m "remove" 移除文件(从Git中删除)
git rm -f a.a 强行移除修改后文件(从暂存区和工作区中删除)
git diff --cached 或 $ git diff --staged 查看尚未提交的更新
git stash push 将文件给push到一个临时空间中
git stash pop 将文件从临时空间pop下来
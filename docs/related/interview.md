# 前端面试题 - 自己觉得需要的
> ​        面对题目, 要注重结果, 不管结果是否完全理解, 是否完备正确; 不要不太理解就留一个模糊的感觉在那里; 敢于 "选择", 敢于 "说错".
> 
>​        并不一定要动手实践, 动口也行, 书读百遍, 其义自见, 至少你自己信了, 觉得熟得很, 是这么回事.

**当你觉得自己不行了的时候，站上斑马线，你又是个行人了**

## 环境

### 移动端开发和 pc 端开发的区别

- pc 端需要考虑浏览器兼容性, 几个主流浏览器的内核不一样; 移动端基本都是 webkit 内核, 不需要考虑浏览器兼容性, 而需要考虑操作系统兼容性和屏幕尺寸适配
- 在部分事件的处理上，移动端自然是偏向于触屏的，所以触屏事件的一些规律要多摸索一下

#### 移动端响应式

https://weichen93333.github.io/my_notes/#/css/mobile


### SEO / 搜索引擎优化
一种利用搜索引擎的搜索规则来提高目前网站在有关搜索引擎内的自然排名的方式。他的实现原来分别为，页面抓取，分析入库，检索排序。

### @import和link引入样式的区别

https://juejin.im/post/6844903581649207309  (需要注意: 权重部分有误, 应该是 "通配符" > 继承)
- @import是 CSS 提供的语法规则，只有导入样式表的作用 (在 css 文件中或 style 标签中使用)；link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。
- 加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。
```html
<!DOCTYPE html>
 <html lang="en"> 
<head> 
<link rel="stylesheet" rev="stylesheet" href="myCss.css" type="text/css" > 
<style type="text/css" >                
@import url("./myCss.css");            
</style>
 </head> 
</html>
```

## CSS


### 浮动

float 属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动(文档流)中移除，尽管仍然保持部分的流动性（与绝对定位相反）。

**表现 (父子元素 father, son):** 

- 子元素将无法继承父元素的宽度(块元素不会占满整行), 但是可以手动设置 width: percentage

- son 设置 float 时, 部分脱离文档流, 会自左上挨着父元素的 content-box; 同时, 父元素高度塌陷, 部分 padding-bottom, border-bottom 被 son 遮挡

**表现 (两个兄弟元素 one, two):** 

- 如果均设置 float: left, 那么自父元素左侧水平方向并排
- 如果仅 one 设置 float, 那么若 two 为 block, one 脱离上浮, two 位置从二排上升至一排, 并被 none 遮挡; 而若 two 为 inline, 那么会自父元素左侧水平方向并排

**导致问题与解决方案:**
- 父元素高度塌陷
- 浮动元素脱离文档流, 导致后面的块级元素上移, 破坏布局
  

**清除浮动(产生的副作用):**
- 在浮动元素后面增加一个兄弟元素, 并在兄弟元素中写上 clear: both (完全清除, 也就是以上两种问题都没有了)
  - 添加冗余元素不是最佳实践, 可以使用伪元素来实现
  father:after{
    content: '';
    display: block;
    clear: both;
  }
  
- 将父级设置为 BFC, 因为 BFC 计算高度的时候同样也会计算浮动元素 (也就是浮动元素依然可以撑开父元素) (部分清除, 只解决高度塌陷问题)

- 在浮动元素后增加 <br clear="all" />

### 一般简单的动画为什么用css3的animation而不是用position动画？
我：position动画会脱离文本流，动画性能消耗大，而css3动画基于帧动画，浏览器可对动画做优化，性能提高不少


### 实践

#### 画一个三角形、扇形，将一个圆分为四部分，对角部分是相同颜色，相邻部分为不同颜色

#### 实现1px



### 样式优化
1.避免css层级太深。有兴趣了解一下css tree如何跟html tree融合成dom tree。
2.首屏（特别是缓冲效果图）可适当使用内联元素。这样有利于更快的显示。
3.异步加载CSS。非首次重要引入的css文件，不放在head里边。这样会引起阻塞。
4.减少 回流 的属性。如display:none可以考虑使用visibility
5.适当使用GPU渲染。如tranfrom等。
6.css动画的性能，是远远的大于js动画性能。
7.利用工具压缩，去重。






## JavaScript


     

### ES6

#### let，const 和 var 的区别
1）局部作用域
新引入的let，const声明，不会再产生变量提升。避免了变量提前访问的场景，间接的提高了严谨性。我们可以在程序运行时就知道了报错，而非后期的调试中。
2）禁止重复声明
如果一个标识符已经在代码块内部被定义，那么在此代码块内使用同一个标识符进行 let 声明就会导致抛出错误
3）区分常量与变量
这是let与const的区别。const 声明会阻止对于变量绑定与变量自身值的修改，避免了我们日常开发中，了不小心改到常量的问题。
4）暂时性死区 (temporal dead zone)
JavaScript引擎在扫描代码发现变量声明时，要么将它们提升至作用域顶部（遇到var声明），要么将声明放到TDZ中（遇到let和const声明），访问TDZ中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从TDZ中移除，然后方可正常访问。  
The variables are created when their containing Lexical Environment is instantiated but may not be accessed inany way until the variable’s LexicalBinding is evaluated.


```js
var tmp = 123;
if(true){
tmp='abc';//Uncaught ReferenceError: Cannot access 'tmp' before initialization
let tmp;
}
```



#### Symbol

#### 箭头函数

#### 拓展运算符

#### 对象解构

#### class和构造函数的区别

1.class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。 2.class 声明内部会启用严格模式。 3.class 的所有方法（包括静态方法和实例方法）都是不可枚举的。 4.class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。 5.必须使用 new 调用 class。 6.class 内部无法重写类名。 7.ES5 和 ES6 子类 this 生成顺序不同。ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象。




#### map 和 forEach 的区别
forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

### 字符串的一些常用方法

### 手写深度遍历节点

#### 高阶函数
#### 柯里化函数
#### 纯函数

#### js 性能优化

- **垃圾收集**

  当数据不再有用时，需要通过将值设为null来解除引用，该做法适用于大多数全局变量和全局对象属性

- 事件委托

- 保存多次使用的全局变量

## Vue



### 响应式系统 /(单向)数据绑定
“Reactivity, among JavaScript frameworks, is the phenomenon in which changes in the application state are automatically reflected in the DOM.”
通俗的说, 就是一旦更新了 data 中的某个属性数据, 所有界面上直接使用或简洁使用了此属性的节点都会更新

https://vuejs.org/v2/guide/reactivity.html



![](./img/interview3.png)

当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。  
值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的。如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。  

当实例创建后的数据观察阶段 data 选项的内容会添加到了一个对象中, 然后通过 Object.defineProperty(obj, key, value)的方法遍历, 并设置 get set 方法, 作为响应的基础, 这也就是为什么对象后来新增的属性不是响应式的原因, 它没有经过上述阶段  

由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。深入响应式原理中有相关的讨论。  

Vue.set()(vuex用, 因为它不是vue的实例, 所以不能用后者)/this.$set()  
Vue.set( target, key, value )  
向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')。注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

可以从生命周期的角度来说:
初始化阶段: 通过 defineProperty 方法为 data 中的属性设置 getters/setters
mounted 阶段: render 函数初次渲染, 生成 DOM, 过程中 touch 的属性的 getter 方法触发, 被 Watcher 收集为依赖
数据更新阶段: 数据更新时, 属性的 setter 方法被触发, 通知 Watcher, Watcher 再触发 render函数重新渲染












### v-show和v-if的区别
v-show  
- 通过设置元素的 display 属性实现
- 可获取元素
- 如果是组件, 不会触发生命周期
- v-show是在任何条件下（首次条件是否为真）都被编译

v-if  
- 通过动态的向 DOM 树内添加或者删除元素
- v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译 (只有为 true 才可获取元素)
- 如果是组件, 会触发生命周期
- v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件

v-if会在切换过程中对条件块的事件监听器和子组件进行销毁和重建，如果初始条件是false，则什么都不做，直到条件第一次为true时才开始渲染模块。
v-show只是基于css进行切换，不管初始条件是什么，都会渲染。
所以，v-if切换的开销更大，而v-show初始化渲染开销更大，在需要频繁切换，或者切换的部分dom很复杂时，使用v-show更合适。渲染后很少切换的则使用v-if更合适。

### Vue 中的 key 有什么作用
https://vuejs.org/v2/api/#key

https://michaelnthiessen.com/understanding-the-key-attribute/

https://deepsource.io/blog/key-attribute-vue-js/

The key special attribute is primarily used as a hint for Vue’s virtual DOM algorithm to identify VNodes when diffing the new list of nodes against the old list. Without keys, Vue uses an algorithm that minimizes element movement and tries to patch/reuse elements of the same type in-place as much as possible. With keys, it will reorder elements based on the order change of keys, and elements with keys that are no longer present will always be removed/destroyed.

Children of the same common parent must have unique keys. Duplicate keys will cause render errors.

当Vue用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue将不是移动DOM元素来匹配数据项的改变，而是简单复用此处每个元素

**不使用 key (vue 不允许) / 使用 index 作为 key 时:**
Vue prefers to reuse as much of the DOM as it can and try to make the manipulations at the data level and not at the DOM level.
VUE 尽可能地减少对 DOM 的操作, 比如移动和替换; 只依据数据模型更改 DOM 展示的内容 (也就是文本节点)
- 元素的样式, 会一直保留
- 临时的 DOM 状态, 比如用户的输入, 如果不通过 v-model 传递至 data model, 那么会一直停留在原地
- 元素 / 组件不会销毁, 无法触发自定义指令的钩子 / 组件的生命周期钩子



### Vue-Router 的两种模式 (hash/history)

https://juejin.im/post/6844903841029160968

https://juejin.im/post/6854573222231605256

### computed 和 watch 的区别和运用的场景
computed  
- 支持缓存，只有依赖数据发生改变，才会重新进行计算
- 不支持异步，当computed内有异步操作时无效
- 如果一个属性依赖其他一个或多个属性, 一般用computed
*简写为 get 方法, 改变计算属性会报错; 如果需要更改, 要使用对象, 同时写上 get 和 set 方法*

watch  
- 不支持缓存，数据变，直接会触发相应的操作  
- 支持异步
- 监听数据必须是data中声明过或者父组件传递过来的props中的数据
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

https://vuejs.org/v2/guide/computed.html


### vue 异步更新的策略以及 nextTick 的用途和原理
https://juejin.im/post/6844903609822363661#comment

vue实现响应式并不是数据发生变化后 dom 立即变化，而是异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。  
如果同一个 watcher 被多次触发，只会被推入到队列中一次。

然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的Promise.then和MessageChannel，如果执行环境不支持，会采用setTimeout(fn, 0)代替。



```js
export default {
  data () {
    return {
      msg: 0
    }
  },
  mounted () {
    this.msg = 1
    this.msg = 2
    this.msg = 3
  },
  watch: {
    msg () {
      console.log(this.msg)
    }
  }
}
//这段脚本执行我们猜测会依次打印：1、2、3。但是实际效果中，只会输出一次：3
```
nextTick: 在修改数据之后立即使用这个方法，可以获取更新后的 DOM。








### keep-alive
缓存组件，不需要重复渲染
如多个静态tab页面切换，可以优化性能
常用的2个属性 include exclude
两个生命周期 activated deactivated



### 动态组件

<component v-bind:is="currentTabComponent"></component>

<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。

#### 生命周期

- 初次进入时：created > mounted > activated；退出后触发 deactivated
- 再次进入：会触发 activated；事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中

#### 应用场景

- 商品列表页点击商品跳转到商品详情，返回后仍显示原有信息
- 订单列表跳转到订单详情，返回，等等场景。



### Vue 组件间通讯有哪几种方式

https://weichen93333.github.io/my_notes/#/Vue/communication

#### 父子传值 (props + 自定义事件)

- 通过props传递, 可以传递任何数据类型, 不只是属性, methods 中定义的函数也可以传递给子组件
- 初始化时父组件数据(对象类型)还未传过来会导致控制台报错(不影响最终的效果)
  方案一: 设置与数据类型匹配的默认值; 方案二: 使用v-if=”数据”, 拿到数据才渲染
- 自定义事件的传参问题
  父组件接收子组件自定义事件时, 如果只接收子组件携带的参数, 那么就不写(), 否则报错; 如果要自定义参数, 加上(参数)即可, 如果两个参数都要, ($event, 参数)即可



#### 兄弟之间

事件总线，

vuex，

以父组件作为中转



#### vue怎么实现强制刷新组件

- this.$forceUpdate

- 模板上绑定 key, 更改 key

- v-if

  ```js
  // 移除组件
  this.update = false
  // 在组件移除后，重新渲染组件
  // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
  this.$nextTick(() => {
      this.update = true
  })
  ```

  

  

### Vue 常见的性能优化方式

- 合理使用 v-show 和 v-if
- 合理使用 computed 有缓存
- v-for 加 key,以及避免和 v-if 同时使用
- 自定义事件，DOM 事件及时销毁 （会导致内存泄露）
- 路由按需加载/懒加载 `component: () => import('@/components/HelloWorld')`
- 合理使用异步组件
- 合理使用 keep-alive
- data 层级不要太深，扁平化（深度监听时的一次性监听完成）
- 使用vue-loader 在开发环境做模板编译（预编译）
- webpack 层级的优化
- 前端通用的性能优化，如图片懒加载              



### 路由跳转与传参

```js
// 字符串
this.$router.push('home')

// 命名的路由
this.$router.push({
  name: 'user',
  params: {userId: '123'}
})
//接收参数
this.userId = this.$route.params.userId

// 带查询参数，变成 /user?userId=123
this.$router.push({
  path: '/user',
  query: {userId: '123'}
})
//接收
this.userId = this.$route.query.userId;

name 和 path 跳转的区别在于
name 传参用 params，path 传参用 query。
用 name 跳转后参数不会携带到 url 上，用 query 传参参数会携带到 url 上。
```



## webpack

**打包工具**

webpack 的默认配置文件是 `webpack.config.js` 。

webpack 默认只能处理 js 文件，如果想处理图片等其他文件，则需要用到相应的 loader。比如 `file-loader` 、 `url-loader` 、 `css-loader` 、 `style-loader` ，如果用 sass 的话会用到 `sass-loader` 。

其他几个重要的概念是：

- mode: 指定打包的模式，development 或 production。

- devtool：指定生成 sourceMap 的方式。

- entry：配置入口文件，多文件打包的话要打包几个文件，就在 entry 中写几个入口，output 的 filename 用占位符 `[name]` 表示。

- output: 出口。

- loader：辅助打包的各种工具。

- plugins：插件，loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。如 HtmlWebpackPlugin，CleanWebpackPlugin。

  - ## compression-webpack-plugin

    所有现代浏览器都支持 `gzip` 压缩，启用 `gzip` 压缩可大幅缩减传输资源大小，从而缩短资源下载时间，减少首次白屏时间，提升用户体验。

- devServer：使用 WebpackDevServer 开启热更新，提升开发效率。



## git

## 场景题



### 返回十万条数据

- 和后台沟通做分页
- 缓存 + 懒加载
- node 中间层



## 项目

### 在你的项目里面解决了什么样的难题

### 在你的项目里面如何做的登录

### 在你的项目里面，如何解决 xss 攻击





## 浏览器

### 浏览器存储 -- cookie、SessionStroage、LocalStroage, IndexedDB
https://weichen93333.github.io/my_notes/#/related/storage

### 浏览器缓存
1.Service Worker 是运行在浏览器背后的独立线程。
必须HTTPS。
三个步奏：注册（下载：sw.js），监听（等其他worker失效），查看缓存
1）sw线程能够用来和服务器沟通数据（service worker的上下文内置了fetch和Push API）
2）能够用来进行大量复杂的运算而不影响UI响应。
3）它能拦截所有的请求
2.Memory Cache
将资源缓存在了内存中。事实上，所有的网络请求都会被浏览器缓存到内存中，当然，内存容量有限，缓存不能无限存放在内存中，因此，注定是个短期缓存。
内存缓存的控制权在浏览器，前后端都不能干涉。
3.Disk Cache
存储在硬盘中的缓存
强缓存和协商缓存， HTTP Header 来实现的。
Cache-Control > Expires(http1.0产物, 受本地时间影响) > ETag(http1.1出现) > Last-Modified（Last-Modified 打开文件的时候会变，以秒计算的）
4.Push Cache
服务器推送，http2

1.强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的network选项中可以看到该请求返回200的状态码;

2.协商缓存：向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；

两者的共同点是，都是从客户端缓存中读取资源；区别是强缓存不会发请求，协商缓存会发请求。

### 浏览器渲染

### 同源策略

同源策略是一个重要的安全策略，它用于限制一个origin的文档或者它加载的脚本如何能与另一个源的资源进行交互。  
同源策略是浏览器方面的, 请求可以发送出去, 服务器也可以接收到并返回数据, 但是浏览器会把它拦在外面, 于是请求失败.  
如果两个 URL 的 protocol, host, port 都相同的话，则这两个 URL 是同源。


#### 当触发同源策略/发生跨域时, 怎么办?
- JSONP: 原理是 src 本来就是用来请求外部资源的, 自然不受同源策略影响
- CORS: 跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。
- 反向代理: 原理是服务器之间的通讯不受同源策略影响 (代理是一个服务器: 反向代理在客户端架设, 正向代理在服务端架设)

### 垃圾回收

### 浏览器常见兼容问题

## 网络 (http)

### 原生Ajax和axios的区别，Ajax怎么发送http请求的？

### http常见状态码
1××：保留

2××：表示请求成功地接收

3××：为完成请求客户需进一步细化请求

4××：客户错误

5××：服务器错误

200: '请求被正确处理并返回了结果',  201: '新增或修改数据成功',  202: '请求已进入任务队列，被异步处理',
  203: '令牌或登录状态失效',
  204: '删除数据成功',  301: '请求的资源被永久重定向到新的位置，将从新的地址重新请求',  302: '请求的资源被临时重定向到新的位置',  400: '请求参数错误，服务器没有对数据做新建或修改',  401: '无访问权限，用户名、密码、令牌错误',  403: '得到访问授权，但访问是被禁止',  404: '访问的是不存在的资源',  405: '请求方式不正确',  406: '请求的数据格式不是服务接收的类型',  410: '请求的资源被永久删除',  422: '服务器创建对象时发生错误',  500: '服务器不可用，未返回正确的数据',  502: '服务器网关错误',  503: '服务器过载或维护中',  504: '服务器响应超时',



### http, https 以及 websocket 的区别

1.https需要证书。 2.http是超文本传输协议，是明文传输，https则是具有安全性的ssl加密传输协议。 3.http和https使用的端口不同，前者是80，后者是443。 4.http的连接很简单，无状态；HTTPS是由SSL+HTTP构建的可进行加密传输、身份认证的网络协议，比http协议安全。


### http的握手和挥手过程

## 安全
**xss 攻击 || csrf 攻击**

https://juejin.im/post/6844903502968258574#comment

https://juejin.im/post/6844903685122703367

https://www.imooc.com/article/296767

https://www.imooc.com/article/76207

![](./img/interview5.png)

## 性能优化
性能优化是把双刃剑，有好的一面也有坏的一面。好的一面就是能提升网站性能，坏的一面就是配置麻烦，或者要遵守的规则太多。并且某些性能优化规则并不适用所有场景，需要谨慎使用.

### 方式

#### 减少 http 请求

- 合并 js
- 合并 css
- 图片 sprite  || base64

#### 静态资源使用 CDN

#### 延迟(/懒)加载内容

- 图片懒加载 (在页面中，先不给图片设置路径，只有当图片出现在浏览器的可视区域时，才去加载真正的图片，这就是延迟加载。)
- 数据懒加载 (点击查看更多)
- 功能懒加载(曝光后或者点击后加载 html 模块 / js 功能模块)

#### 使用浏览器&离线缓存

把常用的变动又少的 js, css, 图片存储到 localStorage, 第二次访问的时候直接走本地缓存

#### css, js 放在正确的位置

- css 放在 head 中, 保证用户看到页面的时候样式是对的
- 把 js 放在 body 里最后的位置 (或者加上 defer 属性), 防止 js 加载阻塞页面

#### 使用字体图标 iconfont 代替图片图标



### 感知性能
对于用户来说，用户的感知性能才是最重要的，你的页面可以做的不快，但是你可以让你的用户觉得你很快(慢的很稳定, 就像井然有序的队伍)。
- loading 加载
- 骨架屏

### 客观性能
#### 项目开发- 本地开发时 (主要在于减少客户端负担)
#####  减少重排与重绘  
https://segmentfault.com/a/1190000016990089

##### 防抖与节流

https://weichen93333.github.io/my_notes/#/javascript/practices


#### 项目构建 - 打包生成文件时 (主要在于减少体积)
##### gzip 压缩
下方代码可忽略: 不知道是 vue 自动压缩了, 还是 Nginx
```js
//npm i -D compression-webpack-plugin
configureWebpack: config => {
  const CompressionPlugin = require('compression-webpack-plugin')
  config.plugins.push(new CompressionPlugin())
}
```

#### 项目上线 - 页面呈现时 (主要在于网络资源优化)
##### Service Worker
##### http 缓存
##### 预加载, 按需加载


## 其他 (综合)

### 前端的异常处理

https://blog.csdn.net/LuckyWinty/article/details/103268296






























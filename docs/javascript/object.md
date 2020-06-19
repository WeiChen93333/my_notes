### 对象


#### 构造器、原型、原型链
##### 构造函数 constructor
&emsp;&emsp;构造函数和普通函数在形式上是一样的, 只是名字首字母大写作为区分, 关键在于调用上, 作为构造函数调用需要使用 new 关键字, 执行结果是一个对象. 

&emsp;&emsp;构造函数是函数对象, 天生自带一个属性 prototype, 它的值是一个对象. 一个构造函数的实例对象没有 prototype 属性, 只有 _proto_ 属性. instance._proto_ 和 Object.getPrototypeOf(instance) 都等于constructor.prototype. 实例还含有 constructor 属性, 指向它的构造函数. 

&emsp;&emsp;构造函数内部 this.attribute = "xxx", 将成为实例自身的属性, instance.hasOwnProperty('attribute') 为 true; 同时, 实例可以访问构造函数 prototype 对象的属性; 但是, 实例无法访问构造函数自身的属性 (通过对象赋值法赋予的属性), 只能构造器自身调用. 

&emsp;&emsp;内置构造函数(函数对象)有 Object, Array, Date, Function等. typeof 都是 function; constructor 都是Function (包括 Function 自己); 都是 Object 的实例 
<!-- 那么问题来了, 先有鸡还是先有蛋呢？...这些都不是自然的啊, 是设计语言的人定义的....是不是就把Function自身赋给它的constructor属性了呢 -->
数组的 constructor 是Array, 但它同时是 Array 和 Object 的实例, 所有引用类型都是对象, 所有对象都是 Object 的实例


&emsp;&emsp;此外, Math, JSON 是以对象形式存在的, 无需 new. 它们的 \__proto__ 是 Object.prototype. 

##### 原型 prototype
构造函数的一个属性, 值是一个对象, 包含一个属性 constructor, 指向构造函数自身. 原型对象含有 \__proto__ 属性, 指向 Object.prototype. 

函数对象既具有 prototype, 又具有 \__proto__

![](./img/object1.png)

##### 原型链
js中内置了函数对象 Object 和 Function, 它们处于原型链的最上游, 当定义一个函数 func1 作为构造函数的时候, func1 是 Function 的实例, 可以访问 Function.prototype 上的属性和方法, 同时可以定义 func1 的prototype, 它的实例对象可以访问 func1.prototype, 以此类推, 就形成了原型链. 因为这种机制, 我们在任何地方通过任何方式创建的对象都可以访问到原型链上游的属性和方法, 最大可能共享和轻量化.

##### 一些问题
- **所有通过 new 构造函数() 得到的都是实例对象吗?**
不是. 通过 new Function() 得到的是一个函数对象, 可以充当构造函数创建对象; 它同时是 Function 和 Object 的实例

##### new 关键字
在 js 中, new 关键字用来创建一个类 (模拟类) 的实例对象, 实例化对象之后, 也就继承了类的属性和方法.
```js
//普通函数使用, this为window; 构造函数使用, 如下
  function Foo(){    
    // console.log(this) //Foo {}
    // console.log(this.__proto__) {name: "li", constructor: ƒ}
    this.name = 'wei'
    // console.log(this) Foo {name: "wei"}    
    function getName(){
      console.log('name')
    }    
    return this
  }
  Foo.prototype.name = 'li'
  var obj = new Foo()
  console.log(obj)

```
**总结:**  
(1) var this = {}  
(2) this.\__proto__ = Person.prototype  
(3) 通过call(this, parameters) 执行函数并接收为result  
(4) return typeof result === ‘object’ ? result : this  
构造函数内没有以 this 作为前缀的变量, 不会包含在对象中; 构造函数自身的属性, 不会包含在对象中


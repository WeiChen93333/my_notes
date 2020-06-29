### 对象
> 无序属性的集合, 其属性可以包含基本值, 对象, 或者函数

#### 理解对象 
##### 对象属性描述符

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

- 数据描述符  
  - value
  - configurable
  - enumerable
  - writable

- 存取描述符
  - configurable
  - enumerable
  - get
  - set

  ```js
  // 字面量指定
  const obj ={
    get a(){
        return this._a
    },
    set a(val){
        this._a = val*2
    }
  }  
  // Object.defineProperty 指定
  Object.defineProperty(obj,'a',{
    get: function(){
      return this._a
    },
    set :function(val){
      this._a = val*2
    }
  })
  //存取
  obj.a = 1;
  console.log(obj.a) //2
  ```


> 继承就是子类可以使用父类的所有功能，并且对这些功能进行扩展。

#### 创建对象
##### 工厂模式
```js
function createPerson(name, age, job){
  const person = {}
  person.name = name
  person.age = age
  person.job = job
  return person
}
const person1 = createPerson('chen', 27, 'programmer')
const person2 = createPerson('hang', 21, 'student')
console.log(person1, person2)
//{ name: 'chen', age: 27, job: 'programmer' } { name: 'hang', age: 21, job: 'student' }
```

##### 构造函数模式
```js
function Person(name, age, job){  
  this.name = name
  this.age = age
  this.job = job  
}
const person1 = new Person('chen', 27, 'programmer')
const person2 = new Person('hang', 21, 'student')
console.log(person1, person2)
//Person { name: 'chen', age: 27, job: 'programmer' } Person { name: 'hang', age: 21, job: 'student' }
```

- 构造函数 constructor
  - 构造函数也是函数, 和普通函数只存在调用方式的不同, 构造函数调用需要使用 new 关键字; 构造函数名字首字母大写作为区分

  - 构造函数是函数对象, 天生自带一个属性 prototype, 它的值是一个对象. 一个构造函数的实例对象没有 prototype 属性, 只有 _proto_ 属性. instance._proto_ 和 Object.getPrototypeOf(instance) 都等于constructor.prototype. 实例对象还含有 constructor 属性, 指向它的构造函数. 

  - 构造函数内部 this.attribute = "xxx", 将成为实例自身的属性, instance.hasOwnProperty('attribute') 为 true; 同时, 实例可以访问构造函数 prototype 对象的属性; 但是, 实例无法访问构造函数自身的属性 (通过对象赋值法赋予的属性), 只能构造器自身调用. 
  
  **new 操作符(做了什么) -- 模拟实现**  
  ```js
  function newMock(){
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
  const final = newMock(Creation, 'chen', 27, 'programmer')
  console.log(final) //Creation { name: 'chen', age: 27, job: 'programmer' }
  ```
  (1) 创建空对象 obj  
  (2) 将构造函数的原型对象与空对象的 \__proto__ 属性绑定  
  (3) 通过 apply 方法, 使得 obj 成为构造函数的调用者; 并执行构造函数    
  (4) 对构造函数的返回值进行判断
  - 构造函数内没有以 this 作为前缀的变量, 不会包含在实例对象中; 构造函数自身的属性, 不会包含在实例对象中
  - 构造函数体中的 return 语句, 原始值会被忽略, 引用类型会返回 (这样, 使用 new 操作符就没有意义了, 所以千万不要写)

  *好多人云亦云的文章, 不知所谓! 越看越糊涂, 怎么也理解不了; 然后找到一篇讲得好的, 感觉一下子就通了, 但是这样的好文章也会存在漏洞和不严谨; 务必自己多思考多实践, 手底下见真章! (把这个写出来, 看到预期的运行结果的时候真的打心底里快乐, 我是真的喜欢, 要加油鸭, 为了自己所爱冲鸭*

  **内置构造函数**
  - Object, Array, Date, Function 
    - typeof 都是 function; constructor 都是Function (包括 Function 自己); 都是 Object 的实例 
    - 数组的 constructor 是Array, 但它同时是 Array 和 Object 的实例, 所有引用类型都是对象, 所有对象都是 Object 的实例
  
  **Math, JSON 是以对象形式存在的, 无需 new. 它们的 \__proto__ 是 Object.prototype.**

- 原型 prototype
  - 构造函数的一个属性, 值是一个对象, 包含一个属性 constructor, 指向构造函数自身. 原型对象含有 \__proto__ 属性, 指向 Object.prototype. 
  - 函数对象既具有 prototype, 又具有 \__proto__  
  ![](./img/object1.png)

- 原型链  
js中内置了函数对象 Object 和 Function, 它们处于原型链的最上游, 当定义一个函数 func1 作为构造函数的时候, func1 是 Function 的实例, 可以访问 Function.prototype 上的属性和方法, 同时可以定义 func1 的prototype, 它的实例对象可以访问 func1.prototype, 以此类推, 就形成了原型链. 因为这种机制, 我们在任何地方通过任何方式创建的对象都可以访问到原型链上游的属性和方法, 最大可能共享和轻量化.

- 一些问题
  - 所有通过 new 构造函数() 得到的都是实例对象吗?  
    不是. 通过 new Function() 得到的是一个函数对象, 可以充当构造函数创建对象; 它同时是 Function 和 Object 的实例


##### 原型模式
创造对象最常见的方式就是组合使用构造函数模式与原型模式. 构造函数模式用于定义实例属性, 而原型模式用于定义方法和共享的属性.


#### 继承

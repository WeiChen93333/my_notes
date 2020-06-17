### function
> member of the Object type that may be invoked as a subroutine  
In addition to its properties, a function contains executable code and state that determine how it behaves when invoked.

##### 函数定义与调用
- 回调函数
- 函数嵌套

嵌套的特殊形式--递归:
- 第一：函数是如何实现调用自身的--词法作用域向上访问；
- 第二：递归是如何工作的--需要多次使用函数, 需要出口；
- 第三：如何将递归用非递归的形式实现；
- 第四：递归的内存不够如何处理；
- 第五：什么类型的问题可以去考虑用递归来实现。

嵌套的"副"作用--某些情况会生成闭包:
闭包是函数嵌套和词法作用域的共同结果
对于函数来说, 作用域在定义时就已经确定, 与谁来调用, 在哪里调用无关; 函数能够记住自己定义时候所处的作用域, 哪怕被放到了其他地方执行也可以访问作用域链上的变量

**块级作用域也会产生闭包, 这一点容易忽视; 函数赋值给变量也会产生闭包, 这一点容易迷惑**
*嵌套在没有块级作用域之前是函数嵌套在函数里, 有了之后是嵌套在其他作用域中, 这样看来, 访问window的变量, 也是一种闭包啊*

```
{
  let a = 1
  window.module1 = function() {
      console.log(a)
  }
}      
{
  let a = 2
  window.module2 = function() {
      console.log(a)
  }
}     
setTimeout(()=>{
    window.module1()
},1000)
window.module2()
//2
//1
```
    
我的笔记

##### 函数如何从外部获取信息
- 上下文-this指向的对象:
this是JavaScript的一个关键字，是指函数执行过程中，自动生成的一个内部对象，是指当前的对象，只在当前函数内部使用。
(1)在独立函数调用时, 非严格模式下, 默认指向window; 严格模式下this为undefined;
(2)在带修饰的函数调用时, 如调用方式为obj.fn()时, this指向obj;
(3)call, apply, bind可以改变默认的指向

特殊情况:
构造函数: 构造函数函数体{}内的this指向实例; 构造函数原型对象内的方法的this也指向实例
计时器: 参数是普通函数, this指向window; 参数是箭头函数, 跟随它上级的this, 也就是计时器(参数)所在的函数体的this
vue实例:vue实例的this指向实例本身; vue实例中函数的this指向实例本身
事件处理函数: 事件处理函数的this指向事件源(事件绑定的元素)
数组/类数组的成员函数: this指向数组/类数组
      注意: this看调用, 但是箭头函数不是
      箭头函数的this是在定义函数时绑定的，不是在执行过程中绑定的。箭头函数没有自己的this, 而是继承自父执行上下文
      也就是说, 箭头函数作为什么不重要, 作为参数也好, return的值也好, 就直接看它写在哪里就行了   
      var opt = {
          name:"Amy",
          say:function(){setTimeout(()=>{return this.name})}
      }
      opt.say() //undefined
    
- 作用域链

- 传参
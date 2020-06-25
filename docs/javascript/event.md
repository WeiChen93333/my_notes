### 事件
**DOM 事件分为两种: "浏览器本身触发的事件"; "人造事件"**  
内置的事件会由浏览器根据某些操作进行触发, 也可以使用 js 触发; 同时, 开发者可以通过事件构造函数手动创建事件并发送给某个 DOM 元素 (这个发送的过程就相当于用户鼠标键盘等操作触发事件)

#### 触发事件的方式
- 某些元素自动触发, 如 audio 标签的 timeupdate 事件, 随着音频播放触发
- 用户外接设备操作, 浏览器 "得知" 后发送事件
- 开发者 js 代码触发: 在目标对象上调用函数, 如 focus(); 创造事件并发送
**值得注意的是: 人造事件仅仅能触发事件, 而对事件的处理完全需要自己来完成; 浏览器触发的一些事件拥有默认行为**
**这是某种安全策略, 就像对"自动播放"的禁止一样, 只有当用户点击按钮触发事件, 然后处理函数中的 audio.play() 才会调用, 如果使用 js 代码模拟按下按钮, 仅仅会触发点击事件, 而不会调用 audio.play()**
https://wiki.developer.mozilla.org/zh-CN/docs/Web/%E5%AA%92%E4%BD%93/Autoplay_guide

#### 内置事件
##### 键盘事件 - KeyboardEvent 的实例
事件对象中:  
key, code 均为键名, 一般的键二者是一样的, 如 Enter 键为 "Enter"; 也有不一样的, 如 Shift 键, key 为 "Shift", code 为 "ShiftLeft"; A 键 key 为 "a", code 为 "KeyA" 
keyCode 为键码, 大键盘 "Enter" 键码为 13


#### 人造事件

创建与触发事件: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events

##### 使用 Event 构造函数创建
```js
//创建内置事件 -- 点击某个元素, 让一个 ref="loginRef" 发生点击事件
const mevent = new Event('click', {bubbles: true}) 
this.$refs.loginRef.dispatchEvent(event)


//创建自定义事件
// add an appropriate event listener
ele.addEventListener('build', function (e) { ... }, false);
// create and dispatch the event
const event = new Event('build');
ele.dispatchEvent(event)
```

##### 使用细分的 MouseEvent, KeyboardEvent 构造函数
```js
methods: {
  // moveFocus 方法监听在 input 输入框中按下 Enter 键
  moveFocus(e){     
    const key = {
      key: 'a',
      code: 'KeyA',
      keyCode: '65'
    }
    const e1 = new KeyboardEvent('keydown', key)
    const e2 = new KeyboardEvent('keypress', key)
    const e3 = new KeyboardEvent('keyup', key)
    e.currentTarget.dispatchEvent(e1)    
    e.currentTarget.dispatchEvent(e2)    
    e.currentTarget.dispatchEvent(e3)    
  }
}
//三个事件均发送成功, 但是输入框并不会出现 a, 也就是说, 输入 a 会触发三个事件, 但是触发三个事件并不会"写出" a, 貌似要自己用事件处理函数处理...
//还有一点, 如果 key 为 "Tab", 并不会出现 Tab 键切换焦点的效果
```
我们经常可以主动触发某个事件，比如 el.click() 就可以调用点击事件，或者使用 dispatchEvent 。但是键盘和鼠标事件却不行。在浏览器中，JavaScript 无法操作用户的键盘或者鼠标，这是出于安全策略的考虑。仔细想一下，如果可以用一段 JavaScript 脚本控制用户键盘和鼠标的话，那么用户只需要打开一个黑客网站，黑客就可以瞬间得到他想得到的一切。所以，如果要通过除 Tab 键以外的其他方式来触发焦点切换， focus 几乎是唯一的选择。

##### 使用 CustomEvent 构造函数创建, 可添加自定义数据
```js
methods: {
  // moveFocus 方法监听在 input 输入框中按下 Enter 键
  moveFocus(e){   
    //绑定事件/开启事件监听
    e.currentTarget.addEventListener("test", function(e) { console.log(e) })
    //创建事件对象
    const customevent = new CustomEvent('test', {detail: {'name': 'chen'}})
    //触发事件
    e.currentTarget.dispatchEvent(customevent)
  } 
  //为元素添加事件, 如果是内置事件, 如单击, 会自动调用处理函数; 在本例中, 元素添加自定义事件名, 然后手动触发, 结果为打印出 customevent 对象  
}
```

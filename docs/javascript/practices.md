### js 技巧
#### 防抖与节流 (debounce & throttle)
Throttling and debouncing are two widely-used techniques to improve the performance of code that gets executed repeatedly within a period of time.  
我们无法控制用户触发事件的频率, 但是可以控制事件处理函数的执行. 加上防抖和节流的函数相当于在事件和函数执行之间加了一个控制层, 可以提升性能并改善用户体验.
##### 防抖
第一次触发事件后, 不立即执行函数, 而是进行计时. 如果计时过程中有其他触发，则重置计时; 否则执行函数。这样将一个连续的调用归为一个, 只有最后一次会执行. 多用于一些用户操作停止之后再执行事件处理函数

```js

```
**使用场景**
- 搜索框输入: 只需用户最后一次输入完，再发送请求
- 滚动加载
- 窗口 resize

##### 节流
第一次触发后, 事件处理函数执行, 然后进行计时, 在这段时间内都不执行, 直到计时时间到, 执行, 然后再开始计时, 如此反复.

```js

```

##### 使用场景
- mousemove 时减少计算次数：debounce
- input 中输入文字自动发送 ajax 请求进行自动补全： debounce
- ajax 请求合并，不希望短时间内大量的请求被重复发送：debounce
- resize window 重新计算样式或布局：debounce 或 throttle
- scroll 时触发操作，如随动效果：throttle
- 对用户输入的验证，不想停止输入再进行验证，而是每n秒进行验证：throttle

##### 文章与摘录
https://blog.bitsrc.io/understanding-throttling-and-debouncing-973131c1ba07

To throttle a function means to ensure that the function is called at most once in a specified time period (for instance, once every 10 seconds). Conversely, a debounced function will ignore all calls to it until the calls have stopped for a specified time period. 

**Why would you want to throttle or debounce your code?**  
Supposing you have an event E that invokes a function F when it is triggered. Normally, F would be called every time E is triggered, and that’s okay.
But what happens if E is triggered at a high frequency, for instance, 200 times per second? If F does something trivial like a simple calculation, that might still be okay. However, if F performs an expensive operation like calling an external API, heavy computations or complex DOM manipulations, you’d want to limit how often F gets called to avoid a drop in performance. Another reason why you’d also want to limit how often F gets called is if some other application component depends on the result from F.

https://segmentfault.com/a/1190000018428170
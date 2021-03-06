### 元素尺寸与距离 
##### 获取元素尺寸 (window)
- window 是前端可操作的局域, 是最顶层的对象, 接下来是 document(html > body >...)  
- window 宽度和高度: window.innerWidth/Height  
- window 卷去的高度, 实则为文档卷去的高度, 保证兼容, 写成 document.documentElement.scrollTop || document.body.scrollTop  
  注意: documentElement代表html 
- 在所有的浏览器中，如果你想获取视窗可见部分的高度，应该使用documentElement.clientHeight，因为body.clientHeight是由它的内容决定的。  
- 在html实际高度被body撑开为2000的时候, 它的clientHeight并非那么多, 而是视窗高度减去滚动条
  ```
   body{
      width: 2000px;
      height: 2000px
    }

  document.documentElement.clientWidth //1004
  document.documentElement.clientHeight //960
  document.body.clientWidth //2000
  document.body.clientHeight //2000
  ```

##### 获取元素尺寸 (普通元素)
- clientHeight: 只读属性, 代表内部可视区高度, 也就是 height + padding - 水平滚动条高度(如有)

- offsetHeight: 只读属性, 元素自身的高度, 也就是盒子模型的高度
  
  *当有padding时，滚动条依然占据content的宽度，但在显示却是浮在了padding的上方。文字旁边，依然会留出一段滚动条宽度的空白位置。*
##### 元素偏移量  
- offsetLeft：只读属性, 元素左边(包括 margin )相对于最近的有定位的父元素左边的距离，更准确一点是与它的包含块左侧边缘的距离, 如果没有则是相对于body
  注意: offsetLeft 和 offsetTop 非定位元素独有, 所有的元素都有, 规则是一样的, 有定位父级相对于定位父级, 没有相对于body  
  offsetTop 仅与 margin 和定位设置有关，与鼠标滚轮无关

##### 滚轮滚动
- 一个元素要拥有如下属性, 需要满足两个条件: 子元素溢出; overflow-y 不为 hidden
- scrollHeight: 只读属性, 子元素高度  
- scrollTop：卷去的长度, 也就是子元素顶部与该元素顶部的距离

##### 事件中鼠标的位置  
e.offsetX: 鼠标与事件触发元素 (而不是事件绑定元素) padding box 左边的距离;  
e.layerX: 鼠标与最近的定位元素左边的距离; 如果没有定位元素, 那么相对于当前文档  
  This property takes scrolling of the page into account and returns a value relative to the whole of the document unless the event occurs inside a positioned element, where the returned value is relative to the top left of the positioned element.  
e.clientX: 鼠标距文档可视区域左边的距离(不受滚轮滚动影响)  
e.pageX: 鼠标距文档(布)左边的距离(受滚轮滚动影响)  


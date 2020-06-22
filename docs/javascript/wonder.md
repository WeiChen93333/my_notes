### 满足好奇心
#### querySelector 和 getElementById方法的区别
http://www.imooc.com/article/13027

#### 为什么 script 标签一般放在 body 下面
https://www.jianshu.com/p/86250c123e53
按照HTML5标准中的HTML语法规则，如果在后再出现或任何元素的开始标签，都是 parse error，浏览器会忽略之前的，即视作仍旧在 body 内。所以实际效果和写在之前是没有区别的

把 script 脚本放在 html 结束标签外会怎么样
效果等同于放在 body 中的尾部 ...

自己页面审查元素,虽然你把 script 标签放在 body 之外,但是解析结果是在body的尾部...
把在 head 中不支持的元素放在 head ,结果一样会渲染在 body 的头部 ... 
都是为了防止这种不规范的操作出现错误的渲染结果


#### 获取给定范围的随机数
Math.ceil(Math.random()*(this.wordBase.length-1)) 似乎取不到 0, Math.ceil(0) 的结果是 0 啊, 为什么取不到呢
parseInt(Math.random()*(this.wordBase.length)) 这样就没问题了
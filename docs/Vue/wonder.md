> 两个数组相等的情况

有数组 A, 基于数组 A 渲染 input/checkbox (label 包裹); data 中定义数组 B, 与循环渲染出的各项通过 v-model 绑定
如果所有选项都被选上, 此时 A == B, 为什么呢

> 单独打印属性值没有, 打印对象却有
```
console.log(this.queryInfo.word) //空
console.log(this.queryInfo) //打开对象看却是有值的...why
this.queryInfo.word = this.currentWord   
console.log(this.queryInfo.word) //有值
console.log(this.queryInfo)  //有值
```
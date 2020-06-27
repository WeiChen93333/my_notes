> 让代码组织更加优雅 (简洁易读); 免去不必要的浪费 (不让 Vue 做多余的事); 

实战技巧，Vue原来还可以这样写:  
https://juejin.im/post/5eef7799f265da02cd3b82fe

### Object.freeze(obj)  
  - 对于data 或vuex 里使用 Object.freeze() 冻结的对象，vue 不会做 getter 和 setter 的转换。因此, 如果确信数据不会修改，使用 Object.freeze() 可以让性能大幅提升。并且，Object.freeze() 冻结的是值，仍然可以将变量的引用替换掉。
  - 注意, 是 "浅冻结", 只会冻结一层, 也就是无法为对象的直接元素赋值: 如果一个数组中包含数个对象, 那么对象无法被赋值替换, 但对象的属性是可以修改的
  - 如果需要 "深冻结", 需要自己编写一个函数...

### 函数式组件 (慎用)
- 函数式组件不需要实例化，无状态，没有生命周期，渲染性能要好于普通组件
- 使用情景: 只需要将外部传入的数据进行展现，不需要有内部状态，不需要在生命周期钩子函数里面做处理

```vue
<!--在template 上面添加 functional属性-->
<template functional>

</template>
```

https://juejin.im/post/5eef7799f265da02cd3b82fe#heading-22
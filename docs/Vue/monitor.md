### 因为其他属性变化而变化或行动

> watch  

watch 只能监听响应式属性, 通过数组变异方法进行变更是可以监听到的, 直接改变对象的值是不行的, 需要使用 Vue.set 或 vm.$set, 同时 watch 需要加上 deep: true
```
queryInfo: {
  handler(){ 
    console.log(this.queryInfo)
  },
  deep: true
} 
```

不要将计算属性作为 data 的属性值, 这是两个静态属性...没法达到说计算属性改变了, data 的属性值也跟着变, 而是一直是初始值; 同时, 如果是互相引用, 还会造成死循环;  
同样地, prop 作为 data 的属性值时, 如果是基本数据类型, 那么也一直是初始值, 是不会随着 prop 的变化而变化的  
要做到跟随变化, 那么只能在 methods 或 watch 中
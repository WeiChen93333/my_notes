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
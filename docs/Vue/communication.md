### vue 组件间的信息传输
> 正经的传输方式
1. 父子传值 (props + 自定义事件)
  - 通过props传递, 可以传递任何数据类型, 不只是属性, methods 中定义的函数也可以传递给子组件
  - 初始化时父组件数据(对象类型)还未传过来会导致控制台报错(不影响最终的效果)  
  方案一: 设置与数据类型匹配的默认值; 方案二: 使用v-if=”数据”, 拿到数据才渲染  
  - 自定义事件的传参问题  
    父组件接收子组件自定义事件时, 如果只接收子组件携带的参数, 那么就不写(), 否则报错; 如果要自定义参数, 加上(参数)即可, 如果两个参数都要, (参数, 参数)即可  
  
2. 父子访问 ($refs, $parent)
  - <my-component ref='mycom'></my-component> 
  - 父访子: this.$refs.mycom.(属性名称或者方法) 
  - 子访父: this.$parent.(属性名称或方法)
**$refs**
ref 和 class 不一样, 它只在当前 "作用域" 有用, 也就是说子组件元素的 ref 父组件是无法获取的. 如果一个子组件元素上有 ref, 而在父组件用了很多次, 在子组件中通过 ref 只能获取到"激活"(focus 状态) 的 input 元素.  
ref 可以用在组件上, 也可以用在元素上, 用在组件上时获取到组件实例, 用在元素上获取到元素. 当使用 v-for 渲染多个拥有相同 ref 的组件/元素的时候, 获取到包含所有组件/元素的数组; 而如果不是 v-for 渲染, 而是手写, 只能获取最后一个组件/元素

  
3. 事件总线 (非父子关系)
  ```js  
  //vue 原型链挂载总线 
  Vue.prototype.$bus = new Vue()
  // 发送
  this.$bus.$emit("eventName",value); 
  //接收
  mounted(){
    this.$bus.$on("eventName", value =>{ })
  }
  //解绑，否则会 $on 会多次执行 -- 事件总线, 给 window 添加的方法, 定时器, 等等, 全局的东西不会随着组件销毁而销毁, 所以要手动去除  
  mounted(){
    this.$bus.$off("eventName") // this.$bus.$on 前面加上
    this.$bus.$on("eventName", value =>{ })
  }
  //或  --  beforDestroy 钩子里
  beforDestroy(){
    this.$bus.$off("eventName") 
  }
  //或  --  通过 hook 监听组件销毁钩子函数，并取消监听事件
  mounted(){    
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.$_handleResizeChart)
    })
  }
  ```

> 非典型传输方式--插槽
待整理补充

> (全体共享数据的)状态管理工具 vuex


### 数据流动
一个公有组件用在两个地方, 是创建了两个备份, 这两个备份之间毫无关联, 数据不共通不共享
要做到他们之间数据的同步, 除非他们使用的是一个对象类型数据, 他们的操作只改变其中的值. 一个数据在很多地方都需变更, 并需要同步的即时的结果, 它最好是对象的属性, 可以把这个对象通过传递和复制在很多地方使用, 作为引用类型, 都指向一个对象, 这个特性实在是太好用了
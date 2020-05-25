>插件通常用来为 Vue 添加全局功能。

**步骤:**  

1. 建一个 vue 文件 *mo-message.vue*, 内部代码写法同子组件   
```
<template>
  <div v-show="isShow" class="mo-message">{{message}}</div>
</template>
<script>
export default {
  name:'mo-message',  
  data(){
    return {
      message: '',
      isShow: false
    }
  },  
  methods:{
    show(message, duration=2000){
      this.message = message;
      this.isShow = true;      
      setTimeout(()=>{        
        this.isShow = false;
        this.message = ''
      }, duration)
    }
  }  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-message
  width 25%
  height 50px
  line-height 50px 
  font-size 16px
  color black
  text-align center
  position fixed
  top 25%
  left 0
  right 0  
  margin: 0 auto
  border-radius 4px
  background-color rgb(244, 242, 230)
</style>
```  

2. 建一个 js 文件 *mo-message.js*
```
//引入第 1 步创建的组件选项对象
import MessageOptions from './mo-message.vue'
const Message = {};
Message.install = function(Vue){
  //创建 Vue 构造器的 "子类", 参数为一个组件选项对象
  const MessageConstructor = Vue.extend(MessageOptions);
  //创建 div 元素并插入到页面中
  const mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint); 
 //创建 vue 实例并使用 vm.$mount() 将实例挂载到 div 元素上
  Vue.prototype.$message = new MessageConstructor().$mount(mountPoint);  
}
export default Message
```

3. 在 main.js 中引入第 2 步中导出的 Message 对象, 并调用 Vue.use() 方法  
```
import Message from "@/plugins/mo-message.js"
Vue.use(Message)
//注意: Vue.use() 必须写在 new Vue() 之前
new Vue({
  //... options
})
```
4. 在子组件中使用
```
this.$message.show('I am a message.')
```

链接:  
[https://vuejs.org/v2/guide/plugins.html](https://vuejs.org/v2/guide/plugins.html)  
[https://vuejs.org/v2/api/index.html#Vue-extend](https://vuejs.org/v2/api/index.html#Vue-extend)




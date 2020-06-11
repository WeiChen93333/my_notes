##### 常用插件
- 

##### 设置代码片段
(1) 点击 "文件" > "首选项" > "用户片段" > "新建全局代码片段"  
(2) 以 vue 组件为例
```
"Print to console":{
  "prefix": "vue",
  "body": [
    "<template>",
    "  <div id=\"$1\"></div>",
    "</template>",
    "",
    "<script>",
    "export default {",
    "  name: '$0',",		
    "  props: {},",
    "  data(){",
    "    return {",
    "    }",
    "  },", 			
    "  methods: {}",
    "}",        
    "</script>",
    "<style lang=\"stylus\" rel=\"stylesheet/stylus\" scoped>",
    "#$1",
    "</style>"
  ],
  "description": "A vue file template"
}
```
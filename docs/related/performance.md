### 前端性能优化
<!-- 先整自己用得上的, 能懂的 -->

#### 感知性能
对于用户来说，用户的感知性能才是最重要的，你的页面可以做的不快，但是你可以让你的用户觉得你很快(慢的很稳定, 就像井然有序的队伍)。
- loading 加载
- 骨架屏

#### 客观性能
##### 项目开发- 本地开发时 (主要在于减少客户端负担)
- **减少重排与重绘**  
https://segmentfault.com/a/1190000016990089

- **防抖与节流**

https://weichen93333.github.io/my_notes/#/javascript/practices


##### 项目构建 - 打包生成文件时 (主要在于减少体积)
- gzip 压缩
```js
//npm i -D compression-webpack-plugin
configureWebpack: config => {
  const CompressionPlugin = require('compression-webpack-plugin')
  config.plugins.push(new CompressionPlugin())
}
```

##### 项目上线 - 页面呈现时 (主要在于网络资源优化)
- Service Worker
- http 缓存
- 预加载, 按需加载


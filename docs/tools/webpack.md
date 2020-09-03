
//以下代码不保证正确
```js
module.exports = {
  publicPath: isProd ? './' : '/',
  configureWebpack: config => {
    if(isProd){
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      )
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {// 别名配置
          'assets': path.resolve(__dirname, '@/assets'),
          'common': path.resolve(__dirname, '@/common'),
          'components': path.resolve(__dirname, '@/components'),                
          'network': path.resolve(__dirname, '@/network'),                
          'views': path.resolve(__dirname, '@/views'),
          'mock': path.resolve(__dirname, '@/mock')
        }
      }
    })
  }
}
```

vue-cli3搭建完整项目之webpack配置: https://blog.csdn.net/u014440483/article/details/87267160
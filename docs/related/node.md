>Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).
### 一、我的理解
*node.js 是一个服务器环境, 可以看成是 apache/tomcat; JavaScript 可以对应看成是php/jsp语言。google v8 引擎被嵌入到node.js当中，用来解释 JavaScript 语言。
简单来说 node filename.js 命令的意思就是在服务器端执行执行 js 文件, 和用 apache 跑 php 一个意思, 但是 js 只能跑在 node 上, 而其他后台语言可以跑在各种服务器环境中*

### 二、node中的模块化
Node.js 规定一个 js 文件就是一个模块, 模块内部定义的变量和函数默认情况下外部无法得到(通过立即执行函数形成的闭包), 只能通过module.exports导出需要暴露的变量
node 中的导入导出使用 common.js 规范
node 中的系统模块: 即由 node 官方提供的 api, 这些 api 都是以模块化的方式进行开发的 js 文件, 暴露接口供导入使用), 如 fs 模块和 path 模块
node中还可以使用第三方开发的模块, 这些模块由多个文件组成并放在一个文件夹中, 也称之为包
包管理工具 npm 本身也是第三方模块, 但是由于都要使用, 所以在安装 node 的时候就已经集成了, 不需要自行安装

### 三、简单使用
##### 使用内置 http 模块搭建服务器
```
    const http = require('http') 
    const hostname = '127.0.0.1';
    const port = 3366;
    const onRequest = (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain'); //Content-Type的值还有 'text/html', 'application/json'
      //也可以写作res.writeHead('200': {'Content-Type': 'text/plain'})
      res.end('hello world'); //参数必须是字符串或二进制数据类型
    }
    server.listen(port, hostname, () => {
      console.log(`服务器运行在 http://${hostname}:${port}/`);
    });    
```
```
// 通过流返回 html 给客户端
    const fs = require('fs')
    const onRequest = (req, res) => {
      res.writeHead(200, {'Content-Type': 'text/html'})  
      const myReadStream = fs.createReadStream(__dirname + '/test.html', 'utf8')
      myReadStream.pipe(res)
    }
```
```
//另一种搭建方式
    const server = http.createServer()
    server.on('request', (req, res) =>{ 
      const method = req.method
      const {pathname} = url.parse(req.url)
      if(method == 'GET'){
        console.log(pathname)
      }else if(method == 'POST'){
        if(url == '/test'){
          res.end('test')
        }
      }  
    })
    server.listen(3366)    
```
**访问:**
可以通过地址栏输入地址访问服务器, 也可以通过 axios 发送 http(get) 请求请求这个网址, 并可携带参数. 这二者的差别在于, 直接在地址栏输入, 返回的数据会直接渲染在请求地址的页面上, 而 axios 发送的请求可以使用变量接收.

**跨域问题:**
- 表现 (控制台报错)
```
Access to XMLHttpRequest at 'http://localhost:3366/dict' from origin 'http://localhost:8080' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
- 产生原因: 请求协议 http,https 的不同, 域 domain 的不同, 端口 port 的不同
- 解决方法 (如何避免同源策略 (cors) 的影响/成功发送跨域请求)
(1) 设置响应头
```
response.setHeader("Access-Control-Allow-Origin","请求地址");//*则允许所有域名访问
例: res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
//注意 writeHead 和 setHeader 不能一起写, 否则报错 Can't set headers after they are sent
```
(2) script 标签的 src 属性不受同源策略影响, 属性值为网址的时候也会发送 http 请求

##### 使用内置 fs 模块处理文件
```
//读取文件
    const fs = require('fs') 
    //异步方法, 有回调函数:  err 为 null 表示成功, data 为文件内容
    fs.readFile(__dirname + '/blocktest.txt', 'utf-8', function(err, data){ }) 
    //同步方法, 直接接收文件内容
    const data = fs.readFileSync(__dirname + '/colinstest.txt', 'utf-8') 
```
```
//往文件中写入内容
  // api 之一 : fs.write (比较麻烦, 要打开关闭)
    fs.write(fd, string[, position[, encoding]], callback) 参数为文件描述符, 要写入的内容, 开始写入的位置(从0开始的索引)      
    const fd = fs.openSync(__dirname + '/words.json', 'w') 参数为要操作文件的路径和操作(w是写)
    fs.writeSync(fd, 要写入的内容[, 开始写入的位置(从0开始的索引)])
    fs.closeSync(fd) 写入结束后关闭文件
  // api 之二 : fs.writeFile
    fs.writeFile(file, data[, options], callback) 
    参数为文件描述符或文件路径(使用文件描述符, 操作符要用open函数的一致), 要写入的内容, 参数{flag: 'a'}设置操作符 (操作符为 'a', 则可以追加写入; 'w' 为覆盖写入   )
    fs.writeFileSync(__dirname + '/words.json', JSON.stringify(wordObj), {flag: 'a'})
```
```
//将一个文件中的内容写入另一个文件 
    const fs = require('fs') 
    let readStream = fs.createReadStream(__dirname + '/blocktest.txt')
    readStream.on('data', (chunk) => {
      console.log(chunk); //数据获取后执行回调函数, 打印内容为数据 (buffer 格式)
    })
    let writeStream = fs.createWriteStream(__dirname + '/test.txt')
    readStream.pipe(writeStream)      
```


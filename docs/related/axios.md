### 一、请求与处理 (axios 发送, node 处理)
- 发送 GET 请求
```
    (1)
      axios.get('/user?ID=12345')
    (2)
      axios.get('/user', {
        params: {
          ID: 12345
        }
      })
    //这两种方式都可以传入变量, 但是一定注意第二种写params, 而不是query
    (3) request for remote image
      axios({
        method: 'get',
        url: 'http://bit.ly/2mTM3nY',
        responseType: 'stream'
      })     
```
- 处理 GET 请求
```
//[onRequest 函数体内]
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')  
    const method = req.method  
    if(method == 'GET'){
      const { pathname, query } = url.parse(req.url, true) 
      if(pathname == '/dict'){
        WordModel.findOne({word: query['word']}, function(err, doc){
          if(!err){
            res.end(JSON.stringify(doc))
          }
        })           
      }
    }
```
- 发送 POST 请求
```     
    (1)
      axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
    (2)
      axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      })  
```
- 处理 POST 请求
```
    else if(method == 'POST'){      
      req.on('data', (chunk)=> {
        let postData = JSON.parse(chunk)                     
      })        
    }
    //chunk 是 Buffer 实例, typeof 是 object, 使用 JSON.parse(chunk) 或 chunk.toString 可以看到数据原本的样子, 但是有些许区别, 前者是数据对象, 后者是数据字符串
```
- 发送 PUT 请求: 和 POST 一样
客户端提供改变后的完整资源

- 处理 PUT 请求
node 本身自带的 http 模块支持 get 和 post 操作，但似乎不支持 put 操作, 需要使用框架 express/koa

### 二、配置默认值
You can specify config defaults that will be applied to every request.
```
    Global axios defaults:
      axios.defaults.baseURL = 'https://api.example.com';
      axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    Custom instance defaults:
      // Set config defaults when creating the instance
      const instance = axios.create({
        baseURL: 'https://api.example.com'
      });        
      // Alter defaults after instance has been created
      instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;    
```
### 三、拦截器/Interceptors
to be continued...

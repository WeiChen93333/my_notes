### 一、请求与处理 (axios 发送, node 处理)
> 特别注意, 前台发送的数据, 如果数据类型是 Number, 传到后台会变成 String, 这是 JSON 转换导致的; 但是好奇怪, GET 请求携带的参数也是如此, 它不是携带在 url 里的吗
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
      let postData = '' 
      req.on('data', (chunk)=> {
        postData += chunk.toString()       
      })
      req.on('end', ()=> {
        //在此处理 postData      
      })       
    }
    //chunk 是 Buffer 实例, typeof 是 object, 使用 chunk.toString 累加, 得到 JSON 字符串, 使用 JSON.parse(postData) 即可得到原本的数据
```
- 发送 PUT 请求: 和 POST 一样  
客户端提供改变后的完整资源

- 处理 PUT 请求
发送 PUT 请求会受到 CORS policy 影响, 需要配置响应头
```js
res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
```

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

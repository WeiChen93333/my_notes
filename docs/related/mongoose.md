### 连接
调用 mongoose.connect() 时，Mongoose 会自动创建默认连接 (mongoose.connect() 返回 Promise 对象)。 可以使用 mongoose.connection (一个 NativeConnection 对象) 访问默认连接。 
```
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dict', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=> console.log('dict')) //连接成功则...
```
使用两个 mongoose.connect 连接本地主机不同数据库, 两个数据库都会打开(监听 open 回调函数会执行), 同时连接位于第一个数据库, 
无论在什么地方调用 mongoose.connection 结果都是一样的, 信息包含host: localhost; id: 0; name: 第二个数据库名...这一点有点迷, 我猜想它显示的是位于连接池最上面的数据库      

### 集合约束
如果加入不符合要求的文档, 会报错
```
const wordSchema = new mongoose.Schema({
  word: String,
  meanings: Array
})
```
###  Model
doc 是 Model 的实例
```
const Vocabulary = mongoose.model('words', wordSchema)  
```

### 连接多个数据库
必须使用 mongoose.createConnection  
mongoose.createConnection 返回 NativeConnection 对象, 信息包含host: localhost; id: 1; name: dict | host: localhost; id: 2; name: userInfo
connection 对象后续用于创建和检索 models。 models 的范围总是局限于单个连接。对集合和文档的操作位于当前连接的数据库  
[连接一个数据库]:   
```
const connection = mongoose.createConnection('mongodb://localhost/dict', { useNewUrlParser: true, useUnifiedTopology: true })      
const wordSchema = new mongoose.Schema({
  word: String,
  meanings: Array
})
const Vocabulary = connection.model('words', wordSchema) //注意: mongoose.connect 连接时是 mongoose.model
```

[连接两个数据库]
```
//连接词典
const conn1 = mongoose.createConnection('mongodb://localhost/dict', { useNewUrlParser: true, useUnifiedTopology: true })
const wordSchema = new mongoose.Schema({
  word: String,
  meanings: Array
})
const WordModel = conn1.model('words', wordSchema)

//连接用户信息
const conn2 = mongoose.createConnection('mongodb://localhost/userInfo', { useNewUrlParser: true, useUnifiedTopology: true })
const userSchema = new mongoose.Schema({
  username: String,
  password: Number,
  wordbase: Array
})
const UserModel = conn2.model('users', userSchema)  
```  

### 增删改查  
- 查找文档
```
//查找一个, 找到返回 doc 对象, 找不到返回 null
MyModel.findOne({word: query['word']}, function(err, doc){
  if(!err){
    console.log(doc)
  }
})
//doc 是一个 Model 实例对象, 使用 JSON.stringify(doc) 或 doc.toString 可以看到数据原本的样子(string 类型), 但是有些许区别; 
在 node 中, 通过 JSON.parse(JSON.stringify(doc)) 可以得到数据对象; 而 axios 请求返回的 data 已经是数据对象, 应该是 axios 内部下了功夫
//查找多个, 找到返回包含一个或多个 doc 对象的数组, 找不到返回空数组
MyModel.find({word: query['word']}, function(err, docs){
  if(!err){
    console.log(doc)
  }
})
//正则查找
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })
参数为变量时
SentenceModel.find({sentence: {$regex: eval(`/${query['word']}/ig`)}}, null, { skip: 10, limit: 5 }, function(err, docs){
  if(!err){   
    res.end(JSON.stringify(docs)) 
  }
})
```

- 增加文档
```
MyModel.create({} | []) 
Shortcut for saving one or more documents to the database. 
MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
```  

- 修改文档   
```
MyModel.update({conditions}, { $set: { username: 'li' }}, error=>{})
//若有多条匹配的数据, 只修改第一条
Model.updateMany() //匹配全部
```

- 查找并修改
```
MyModel.findOneAndUpdate({conditions}, { $set: { username: 'li' }, {new: true}, (err, doc)=>{    
  res.end(JSON.stringify(doc))
}) 
//new: true 返回更新后的 doc; new: false 返回更新前的 doc
```

- 删除文档  
```
MyModel.remove({conditions}, error=>{})
```
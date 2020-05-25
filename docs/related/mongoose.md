```
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dict', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=> console.log('dict')) //连接成功则...
调用 mongoose.connect() 时，Mongoose 会自动创建默认连接。 可以使用 mongoose.connection (一个 NativeConnection 对象) 访问默认连接。 mongoose.connect() 返回 Promise 对象
***使用两个 mongoose.connect 连接本地主机不同数据库, 两个数据库都会打开(监听 open 回调函数会执行), 同时连接位于第一个数据库, 
无论在什么地方调用 mongoose.connection 结果都是一样的, 信息包含host: localhost; id: 0; name: 第二个数据库名...这一点有点迷, 我猜想它显示的是位于连接池最上面的数据库      

//创建集合约束, 如果加入不符合要求的文档, 会报错
const wordSchema = new mongoose.Schema({
  word: String,
  meanings: Array
})
//创建 Model, doc 是 Model 的实例
const Vocabulary = mongoose.model('words', wordSchema)  
```

连接多个数据库时, 必须使用 mongoose.createConnection  
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
[连接两个]
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

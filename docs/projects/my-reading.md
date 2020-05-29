### 项目描述

**标记说明:**  
【ongoing】: 进行中  
【to be continued】: 待办;   
【extension】: 可办可不办     

#### 一、前端部分
##### 界面设计:
- 标题部分
  - 注册、登录登出
- 主体部分
  - 上栏为各种功能按钮  
  - 下栏分为左右两个区域: 左边为内容展示区域(阅读区), 右边为单词信息展示区域  
  - 弹出框: 单词集 单词仓 搜索框 注册登录表单

##### 主要模块:
###### 1. 注册 & 登录
- 注册
   - 信息: 用户名, 密码, 确认密码
   - 格式验证: 用户名全是小写字母, 密码全是数字
   - 验证完毕, 保存至数据库 userInfo 的 users 集合中
- 登录
   - 发起登录请求, 后台验证, 返回 success 或 failure 的信息, 前端根据信息进行不同操作; 
   - 登录成功后, 将后台返回的 userId 保存在 sessionStorage 中 ( cookie 也可), 每次涉及到操作 users 中的 wordbase 时都需要这个参数; (sessionStorage 刷新页面不会消失)
   - 登录之后才可以使用单词仓功能
   - token  
     http://www.pangbo51.com/node/167.html  
     ```
     //生成
     const jwt  = require('jsonwebtokens');
     let payload = {name:'张三',admin:true};
     let secret = 'I_LOVE_JING';
     let token = jwt.sign(payload,secret); 
     //解码
     let payload = jwt.verify(token, secret)
     ```

###### 2. 阅读区与文本输入/输出
- 点击 "导入文本片段" 按钮, 弹出内容输入框, 可输入散乱的单词和有意义的文本片段
- 点击 "取消输入" 按钮取消本次输入并关闭内容输入框
- 点击 "全部加入" 按钮将阅读区所有内容加入 "单词集"
- 点击 "清空阅读区" 按钮将阅读区所有内容清空
- 在阅读区内, 单击单词, 则获取单词信息并展示在单词信息展示区, 双击则将单词加入单词集 
- You are Absolutely Unique

You do not have to pretend in order to seem more like someone else. You do not have to lie to hide the parts of you that are not like what you see in anyone else. You were meant to be different.

###### 3. 单词集
- 点击 "单词集" 按钮, 弹出单词集面板
- 点击 "全选" 按钮, 选择所有单词
- 点击 "删除" 按钮, 删除选中单词
- 点击 "放入单词仓" 按钮, 将选中单词放入单词仓
- 点击 "记忆卡片" 按钮, 进入 "卡片学习" 模块  
通过 vuex 保存加入的单词; 在三个地方变更, 阅读点击, 单词集界面, 单词仓界面  
将当前单词集保存在localStorage中, 随着阅读手动更新(加入操作和删减操作); 因为清理浏览器缓存时 localStorage 会清空, 同时考虑到会换电脑, 需要将单词集保存到单词仓中  

###### 4. 卡片学习
- 点击卡片, 显示单词信息
- 点击 "记下了" 按钮, 进入下一个单词的学习, 当前单词从 "单词集" 中删除
- 点击 "下一个" 按钮, 进入下一个单词的学习
- 点击 "返回" 按钮, 返回 "单词集" 模块 

###### 5. 单词仓
- 点击 "单词仓" 按钮, 弹出单词仓面板
- 点击 "全选" 按钮, 选中所有单词
- 点击 "随机" 按钮, 随机选择 20 个单词(包含 20 个或以上单词时有效)
- 点击 "选择当前列" 按钮, 选中一列所有单词
- 点击 "删除" 按钮, 删除选中单词
- 点击 "取出至单词集" 按钮, 将选中单词取出至单词集

###### 6. 句集  
【extension】: 添加句子到句集  

###### 7. 查询
【to be continued】  
- 点击切换模式释义 or 例句; 默认为释义模式
- 点击单词信息展示区的红线, 弹出查词输入框, 输入单词或者正则查询单词释义或例句
- 最前显示用户句集中的内容 (如有)
- 例句模式需要分页组件 

<!-- 三处查词: 阅读区单击查词; 搜索框搜索查词; 记忆卡点击查询 (点击正面单词页, 则显示背面释义页  )
(第一二个查询是共用的, 第三个是单独的, 不过有背景模糊, 做到一起就可以, 把处理函数放在父组件里)  
【extension】查词需要优化, 因为如果有变形, 比如三单, 就查不到, 那么就考虑规则变形, 去掉后面两位, 进行模糊查询   -->

###### 8. 个人中心
【to be continued】
- 导入资料集 如新概念全 48 篇
- 导出句集  md 格式 就是写文件操作啊 很简单

<!-- 手机版方案  
注册登录放在最前面 如黑马后台那样  
使用 tabbar 和路由: reading, search, wordCollection, wordBase  
例句模式使用下拉加载更多  
这些都是做过的功能 要学会利用起来 整合到一个项目里  
不要想着开新项目 先把能做的做了再说 -->

<!-- 为什么回害怕没有"难题"呢? 为什么没有遇到难题呢? 是因为没有深入, 没有纠缠细节...一旦仔细抠, 问题不就来了...哈哈哈哈
难点不一定要是界面的啊 比如单词的处理 从判断换行 到人工加换行 两种情况合一
又比如加入单词集 单个单词加入 和数组加入 最开始也是判断 后来使用递归
只要是自己觉得惊喜巧妙突破了当时的自己都可以说一说 有些问题不一定要说的多好 毕竟初学者
想想这个项目的特色 其实就是文章/单词的查询与处理 -->


###### 问题与解决
 
- 查完一个词往后滚动, 再查下一个词没有返回顶端 ==> 自定义指令
- 阅读区单词最好分散对齐  
- 表单没有自动聚焦第一个 ==> 自定义指令
- 刷新页面之后, 如何用户已经登录, 那么显示用户名, 否则显示登录字样; 会出现闪现切换, 体验不好, 应该是请求到数据有延迟, 此时模板已经渲染



#### 二、后端部分
##### 接口

|  描述         | 接口       |  方法 |  参数  | 备注  |
|  ------------| --------  |----  |----     |----  |
| 获取单词释义   | /dict     |get   |word     | |
| 用户注册      | /userInfo/register |post |包含 username, password 的注册信息对象 | |
| 用户登录      | /userInfo/login |post |包含 username, password 的登录信息对象 | |
| 获取 wordbase | /userInfo |get  | userId | |
| 修改 wordbase | /userInfo/:userId |post | revised wordbase | 修改后的单词仓|

##### 数据库
1. convert txt to json
2. import json into mongoDB
3. in database  
db: dict  
collection: words  
```
document:
{
  word: structure,
  meanings: [
    {
      explanation: The structure of something is the way in which it is made, built, or organized. 
      sentences: The typical family structure of Freud's patients involved two parents and two children.
    },
    {
      explanation:
      sentences: 
    }
  ]
}
//数据库没区分, 但是前端需要区分的: 单词其他词性词形和例句, 通过是否包含 [part of speech] 判断 class 是否激活  
```
db: userInfo  
collection: users
```
document:
{
  userId: ''
  username: '',
  password: '',
  wordbase: []
}
```

##### 前后交互:
通过地址(在地址栏输入, 在src和href中填写)获取静态资源, 如网页, 图片; 通过get post请求获取和修改数据  
 
发出 GET 请求:   
dict 单词搜索  
userInfo 用户资料内的单词仓[ 单词仓界面 ]  
发出 POST 请求: 注册  
发出 PUT 请求:   
userInfo 修改单词仓(增/删) [ 单词集界面(增), 单词仓界面(删)]  


#### 三、部署上线
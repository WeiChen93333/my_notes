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
**说明**
- 注册
   - 信息: 用户名, 密码, 确认密码
   - [ongoing]格式验证: 用户名全是小写字母, 密码全是数字
   - 验证完毕, 保存至数据库 userInfo 的 users 集合中
- 登录
   - 发起登录请求, 后台验证, 返回 success 或 failure 的信息, 前端根据信息进行不同操作; 
   - 登录成功后, 将后台返回的 userId 保存在 sessionStorage 中, 涉及到操作 users 集合时都需要这个参数; 同时 Login 组件发送事件携带 username, 用于展示; 刷新页面之后, 如用户已经登录, 那么显示用户名, 否则显示登录字样
   - 登录之后才可以使用单词仓功能
   - 登出后, 清空 userId 和 username

**问题与解决**
- [ongoing]刷新页面之后, 如用户已经登录, 那么显示用户名, 否则显示登录字样; 会出现闪现切换, 体验不好, 应该是请求到数据有延迟, 此时模板已经渲染


###### 2. 阅读区与文本输入/输出
**说明**
- 点击 "导入文本片段" 按钮, 弹出内容输入框, 可输入散乱的单词和有意义的文本片段
- 点击 "取消输入" 按钮取消本次输入并关闭内容输入框
- 点击 "全部加入" 按钮将阅读区所有内容加入 "单词集"
- 点击 "清空阅读区" 按钮将阅读区所有内容清空
- 在阅读区内, 单击单词, 则获取单词信息并展示在单词信息展示区, 双击则将单词加入单词集 
- 示例文本  
  You are Absolutely Unique

  You do not have to pretend in order to seem more like someone else. You do not have to lie to hide the parts of you that are not like what you see in anyone else. You were meant to be different.

**问题与解决**
- [ongoing]阅读区单词分散对齐
- [ongoing]双击加入单词集, 同时也会触发单击查询此件

###### 3. 单词集
**说明**
- 点击 "单词集" 按钮, 弹出单词集面板
- 点击 "全选" 按钮, 选择所有单词
- 点击 "删除" 按钮, 删除选中单词
- 点击 "放入单词仓" 按钮, 将选中单词放入单词仓
- 点击 "记忆卡片" 按钮, 进入记忆卡片模块  
通过 vuex 保存加入的单词; 在三个地方变更, 阅读点击, 单词集界面, 单词仓界面  
将当前单词集保存在 localStorage 中, 随着阅读手动更新(加入操作和删减操作); 因为清理浏览器缓存时 localStorage 会清空, 同时考虑到会换电脑, 需要将单词集保存到单词仓中  
**问题与解决**

###### 4. 记忆卡片
**说明**
- 点击卡片, 显示单词信息
- 点击 "记下了" 按钮, 进入下一个单词的学习, 当前单词从 "单词集" 中删除
- 点击 "下一个" 按钮, 进入下一个单词的学习
- 点击 "返回" 按钮, 返回 "单词集" 模块 
**问题与解决**

###### 5. 单词仓
**说明**
- 点击 "单词仓" 按钮, 弹出单词仓面板
- 点击 "全选" 按钮, 选中所有单词
- 点击 "随机" 按钮, 随机选择 20 个单词(包含 20 个或以上单词时有效)
- 点击 "选择当前列" 按钮, 选中一列所有单词
- 点击 "删除" 按钮, 删除选中单词
- 点击 "取出至单词集" 按钮, 将选中单词取出至单词集
**问题与解决**

###### 6. 句集 
**说明** 
【ongoing】: 
- 右键菜单选择 "添加到句集", 则将选中内容作为句子添加到句集  
- 登陆后点击用户名, 出现"句集"选项, 点击进入"句集"界面
- [ongoing]点击句子右边的圆圈, 图形变成 X, 再点一次就删除当前的句子
- [ongoing]抠词填空...使用自定义指令来做即可
**问题与解决**

###### 7. 查询
**说明**
- 点击切换模式释义/例句模式 (默认为释义模式)
- 释义模式
  - 阅读区单击单词查询; 记忆卡片点击查询 (点击正面单词页, 则显示背面释义页); 搜索框输入单词查询(点击单词信息展示区的红线, 弹出查词输入框); 右键菜单选择 "查询释义"
  - 显示内容为词典中该单词的释义
- 例句模式
  - 阅读区单击单词查询; 搜索框输入单词查询; 右键菜单选择 "查询例句"
  - 显示内容为词典中包含该单词的所有例句
  - 例句模式需要分页组件  
- 两种模式携带不同的参数
  - 两种模式使用同一个处理函数, 通过 mode 的值进行判断; 释义模式参数仅包含单词自身; 例句模式参数除了单词外, 还包括 pagesize, pagenum, 在以上三种场景中, pagesize, pagenum 使用初始值, 可以通过分页组件改变
- 查词跳转历史
  将查询的单词放入 vuex-state 中定义的数组, 通过右键菜单的 "返回" 回到上一个查询的单词(记忆卡片模块不支持)
- 单词集-记忆卡片不支持例句模式, 打开该模块时, 将强行切换为释义模式

**问题与解决**
- 分页组件中, 需要选择每页显示多少条数据, option-select 太丑, 又不能改, 虽然自己做的也不多好看...  
使用 input 加上列表来模拟, 点击 input 元素会出现聚焦, 如果加上 disabled 属性, 不会聚焦了, 但是无法触发点击事件, 需要使用 readonly 属性
- 发生单词查询的场景太多了, 比较分散, 原本在 MainPart.vue 中定义 searchThroughDict 处理函数进行统一处理, 然而通过子组件自定义事件和事件总线发送事件太乱, 自己都整迷糊了
  在 vuex-state 中加入 searchHistory, 1. 保存查词跳转记录, 方便回退; 2. 重新打开页面时恢复展示; 3. 使用 watch 监控 searchHistory, 一旦发生变化, 立刻执行 searchThroughDict 进行查词, 减少事件发送 (记忆卡片查词除外)
- [extension]模式切换的时候, 之前的单词信息还在, 然后切换到新单词的信息, 不太友好, 不过问题不大
- 查询单词高亮显示
  正则匹配全部需要修改的内容，书写高亮颜色的标签并用 replace 替换 
<!-- - 组件交互不要跑太远了, 一个组件特别是要复用的组件, 不要通过事件总线向不知名的组件发消息, 要和自己的父组件交互, 然后由父组件出面去处理事情 -->


###### 8. 右键菜单
**说明**
- 点击 "返回", 从查词历史中删除当前单词, 并返回上一个查询的单词
- 点击 "清空查词历史", 清空查词历史
- 点击 "查询释义", 查询单词在词典中的释义
- 点击 "查询例句", 查询单词在词典中的例句
- 点击 "添加到单词集", 添加单词到单词集
- 点击 "添加到句集", 添加单词到句集

**问题与解决**
- 父元素设置 overflow 为 auto/scroll 时, 绝对定位元素超出父元素会导致滚动条出现, 同时自己也无法完全看到...
  - 如果涉及到设置 overflow, 那么不要使用绝对定位的子元素
  - 改弦易辙, 用 fixed 定位来做
- 系统的右键菜单在同一个地方点击会消失再出现, 是怎么样做的呢?
- 获取鼠标选中的文本
  在 mouseup 事件中使用 window.getSelection().toString() 方法即可

###### 9. 个人中心
**说明**
【extension】
- 导入资料集 如新概念全 48 篇
- 导出句集  md 格式 就是写文件操作啊 很简单
**问题与解决**

<!-- 手机版方案  
注册登录放在最前面 如黑马后台那样  
使用 tabbar 和路由: reading, search, wordCollection, wordBase  
例句模式使用上拉加载更多  
这些都是做过的功能 要学会利用起来 整合到一个项目里  
不要想着开新项目 先把能做的做了再说 -->

<!-- 为什么回害怕没有"难题"呢? 为什么没有遇到难题呢? 是因为没有深入, 没有纠缠细节...一旦仔细抠, 问题不就来了...哈哈哈哈
难点不一定要是界面的啊 比如单词的处理 从判断换行 到人工加换行 两种情况合一
又比如加入单词集 单个单词加入 和数组加入 最开始也是判断 后来使用递归
只要是自己觉得惊喜巧妙突破了当时的自己都可以说一说 有些问题不一定要说的多好 毕竟初学者
想想这个项目的特色 其实就是文章/单词的查询与处理 -->


**问题与解决(整个项目)**
 
- 查完一个词往后滚动, 再查下一个词没有返回顶端 ==> 自定义指令 
- 表单没有自动聚焦第一个 ==> 自定义指令

【extension】: 可以通过网址引入文本, 方便阅读官方文档
【extension】: 引入谷歌接口, 方便查询, 尽可能地避免频繁切换页面
<!-- 越做想法越多, 越做越来劲, 越来越好 -->


#### 二、后端部分
##### 接口

|  描述         | 接口       |  方法 |  参数  | 返回结果  |
|  ------------| --------  |----  |----     |----  |
| 获取单词释义   | /dict/words |get   |{params: {word: word}}   | 单词在词典中的释义, 若无为 null|
| 获取单词例句   | /dict/sentences |get   |{params: {word: word, pagenum: pagenum, pagesize: pagesize}} | 单词在词典中的例句总数和部分例句, 若无为 {total: 0, sentences, []}|
| 用户注册      | /userInfo/register |post |包含 username, password 的注册信息对象 | 成功返回 { message: 'success' }|
| 用户登录      | /userInfo/login |post |包含 username, password 的登录信息对象 | 成功: 包含 userId, username, message('success') 的对象; 失败: 包含 message('failure') 的对象  |
| 获取用户信息 | /userInfo |get  | userId | {params: {userId: userId}} |
| 修改用户信息 | /userInfo/update/:userId |post | 修改后的信息 | 更新后的全部信息|

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
  history: {},
  wordbase: []
}
```

##### 前后交互:
<!-- 通过地址(在地址栏输入, 在src和href中填写)获取静态资源, 如网页, 图片; 通过get post请求获取和修改数据   --> 
发出 GET 请求:   
dict 单词搜索  
userInfo 刷新页面后如用户已登录获取信息; 获取单词仓[ 单词仓界面 ]; 获取查词历史  
发出 POST 请求: 注册  
发出 PUT 请求:   
userInfo/update 修改单词仓(增/删) [ 单词集界面(增), 单词仓界面(删)]; 修改查词历史     

试图封装一个 axios 请求函数:
```
import Vue from 'vue'
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3366"
Vue.prototype.$http = axios

const request = (method, path, payload) => {
  if(method == 'GET'){
    console.log(this)
    return this.$http.get(path, payload)
  }
}
export { request }
//会报错, 因为 this 是undefined, 箭头函数 this 定义时已经绑定, 无法指向当前实例

//我傻了, 用函数就不用挂载原型和 this 啊, 但是在这种情况下, 在 main.js 引入会报错 request undefined, 只有在哪里使用在哪里引入才行
// main.js 中导入 css 文件就是全局通用的呀, 但是如果是方法确实需要挂载到原型链上才能用, emmm, 那就挂吧
```


#### 三、部署上线
Vue + node + mongoDB 项目部署至阿里云服务器
> 自学路上第一个自己独立完成的项目, 以此为记.   
因为这方面完全不懂, 花了挺长时间的, 找了很多教程, 这个看一点, 那个看一点, 拼拼凑凑, 总算是搞成功了. 这篇文章是自己做的时候记录的流程, 一来作为自己的备忘, 二来也希望能给看到的人一点提示或帮助.


**项目环境如下:**
- 部署时间: 20200606 - 20200609 (共使用 19 小时)
- 本地环境: windows
- 服务器: 阿里云服务器 ECS 突发性能型, CentOS 8.1; 主要使用宝塔面板, 内含 SSH 终端, 没有使用 Xshell Xftp 等
- 前端项目 vue(v2.6) & vue-cli(v4.2)
- 后端项目 node.js(v12.16.0, 使用 http 模块 + mongoose) + mongoDB


##### (1) 服务器准备与配置
- 购买阿里云服务器 ECS, 最便宜的那种, 赶上 618 优惠 91 元一年, 系统是 CentOS
- 进入云服务器管理控制台, 点击: "实例与镜像" > "实例". (开始看不到实例, 百度得知要在页面左上角选择区域, 选择我购买的区域 "华南1(深圳)" 就能看到了)
- 在 "实例" 页面中, 点击: "更多" > "密码/秘钥" > "重置实例密码"; 密码设置完成后, 点击: "更多" > "实例状态" > "重启", 重启实例, 使设置生效
- 在 "实例" 页面中, 点击: "远程连接" > "Workbench" > 填入系统用户名 root 与上一步设置的实例密码
- 安装 "宝塔 Linux 面板"
  - 进入 https://www.bt.cn/bbs/thread-19376-1-1.html
  - 复制 CentOS 安装命令 yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
  - 在打开的远程连接界面中, 粘贴安装命令, 等待安装完成即可
  - 根据提示, 要访问面板, 需要进行安全组配置, 点击: "更多" > "网络和安全组" > "安全组配置" > "配置规则" > "手动添加" > 设置端口范围为: 8888/8888, 设置授权对象为: 0.0.0.0/0
  - 在浏览器中访问安装界面中给出的链接, 输入给出的用户名和密码, 即可访问面板
- 在 "宝塔 Linux 面板" 中的 "软件商店" 安装需要的软件并进行配置  
  (第一次登录面板, 面板推荐了一些软件, 选择 "编译安装", 安装了 Pure-Ftpd 和 Nginx)  
  - Nginx 配置 => 点击: "设置" > "配置修改" > 作出如下修改 (作出修改后需重启 Nginx)
    ```    
    **基本配置**
    server
    {
        listen 80; //端口, 需要在安全组规则中开放此端口 (80 端口用于: ECS 实例作为网站或 Web 应用服务器)
        server_name ********;  //公网 IP
        index index.html index.htm index.php;
        root  /www/wwwroot/myproject; //项目所在文件夹
    }
    //在 myproject 下放入 index.html, 通过 ********(:80 可不输入) 即可访问到该页面

    **反向代理**   
    server
    {
      location /api/ 
      {
          proxy_pass http://127.0.0.1:3366/;
      }
    }    

    ```    
  - pm2: 搜索安装 pm2
  - mongoDB: 搜索安装 mongoDB

##### (2) 前端项目上线
- 打包
  - 在 vue.config.js 中配置路径, 以免找不到资源
    ```
    module.exports = {
      publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    }
    ```
  - 在 router/index.js 中改 mode 为 "hash"
  - 更改 axios baseURL, 例如 axios.defaults.baseURL = "http://localhost:3366", 将其中的 localhost:3366 改为云服务器公网 IP, 并在后面加上 /api (与 Nginx 反向代理的设置一致)
  - 执行 npm run build 命令
- 上传至服务器
  - 在宝塔面板中, 点击: "文件" > 进入 /www/wwwroot/myproject 路径下, 新建文件夹 reading > 将 dist 文件夹中的文件上传到该文件夹下
  - 在浏览器中访问 IP 地址/reading, 即可看到自己的前端页面


##### (3) 后台项目上线
- 后台文件注意事项
  - node 服务主机名: 127.0.0.1; 端口: 3366
  - 如果使用了第三方模块, 文件中引入时不能直接写模块名称, 需要加上 /www/server/nvm/versions/node/v12.16.0/lib/node_modules/, 以 mongoose 为例, 就是 const mongoose = require('/www/server/nvm/versions/node/v12.16.0/lib/node_modules/mongoose')

- 在宝塔面板中, 点击: "文件" > 进入 /www/wwwroot/myproject/reading 路径下, 新建文件夹 server > 将后台文件上传到该文件夹下  

- 在宝塔面板中的 "安全" 界面下, 放行 node 服务端口, 如我使用的 3366

- 在宝塔面板中的 "软件商店" 界面下, 进行相关配置
  - pm2 配置 => 点击: "设置"
    ```
   > "项目列表": /www/wwwroot/myproject/reading/server/ | www.js | reading_server 
   > "Node 版本": 切换至本地开发时的版本 v12.16.0
   > "模块管理": 安装使用的依赖 mongoose
   //完成如上设置后返回 "项目列表", 点击 "启动" 启动 node 服务
    ```

- mongoDB 配置与操作
  - 在宝塔面板中的 "安全" 界面下, 放行 mongoDB 默认端口 27017
  - 权限 (可以不设置, 但有一定风险)  
  ```
  创建管理员账户
  在宝塔面板中的 "文件" 界面下, 打开终端, 使用如下命令
  mongo
  use admin
  db.createUser({user: '用户名', pwd: '用户密码', roles: ['root']})
  db.auth('用户名', '用户密码') // 如果返回 '1' 表示验证成功
  创建普通账户
  use 自定义数据库名称
  db.createUser({user: '用户名', pwd: '用户密码', [{role: 'readWrite', db: "自定义数据库名称"}]}) 
  db.auth('用户名', '用户密码')
  使用 mongose 连接数据库
  (不使用权限时) mongoose.connect('mongodb://127.0.0.1/数据库名称', { useNewUrlParser: true, useUnifiedTopology: true })
  (使用权限时) mongoose.connect('mongodb://用户名:用户密码@127.0.0.1:27017/数据库名称', { useNewUrlParser: true, useUnifiedTopology: true })
  或:
  mongoose.createConnection('mongodb://用户名:用户密码@127.0.0.1:27017/数据库名称', { useNewUrlParser: true, useUnifiedTopology: true })
  ```

  - 如果设置了权限, 那么在宝塔面板中的 "软件商店" 界面下, 点击 MongoDB 的 "设置" > "配置文件" > 作出如下修改
  ```
  security:
  authorization: enabled
  ```

  - 导入本地数据库
    - 将数据库文件(json 或 csv 格式)上传至云服务器 /www/wwwroot/myproject/reading/db 文件夹下
    - 打开终端, 使用如下命令
    ```
    mongo
    mongoimport -h 主机名:端口 -u 用户名 -p 密码 -d 数据库名 -c 集合名 --file 文件地址(如: /www/wwwroot/myproject/reading/db/words.json)
    //主机名:端口默认为 127.0.0.1:27017; 用户名密码为权限设置中设置的用户名和密码; 数据库和集合名为要导入文件的数据库和集合名称; 文件地址为要导入的文件存放的地址
    ```
 
  <!-- mongoimport -h 127.0.0.1:27017 -u whydict -p 3366 -d dict -c words --file /www/wwwroot/myproject/reading/db/words.json -->

**至此, 大功告成 !**

后记:  
进入全然未知的领域还是要谨慎一些, 有一定的知识储备, 否则很容易找不到北, 在坑里爬不起来, 这一次花了时间和力气做出来了, 但是被 404 Not Found, 502 Bad Gateway 伤的不轻; 再有就是用惯了图形用户界面, 没有命令行意识, 教程里给出命令都不知道往哪里输入.  
还有花了时间依然不行, 只能暂且放下的. 在四月份的时候跟着视频做后台管理系统, 资料里的接口用不了, 在完全不了解 phpstudy node MySQL 的情况下一通操作, 死在 'localhost' is not allowed to connect to this MySQL server 上, 跟着看不懂的资料改看不懂的配置, 结果是失败, 失败, 失败, ... 失败  
这也是我学习过程中的困难和困惑, 我不知道什么时候接触什么样的内容, 哪些新知识是目前可以试一试的, 哪些是要放一放, 等有一定前置知识才去学习的. 走了一些弯路, 受了一些打击, 只能安慰自己更加坚强了...


<!-- 
服务器公网 IP: 120.79.214.0
远程连接密码: 454574 
实例用户名: root
实例密码: CZwhy1111~-->
<!-- 
Bt-Panel: http://120.79.214.0:15500/chen.cn
username: chen
password: 1111eeee
 -->
 <!-- orangewhy66@gmail.com -->

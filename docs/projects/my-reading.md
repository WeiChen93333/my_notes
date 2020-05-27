### 接口设计

|  描述         | 接口       |  方法 |  参数  | 备注  |
|  ------------| --------  |----  |----     |----  |
| 获取单词释义   | /dict     |get   |word     | |
| 用户注册      | /userInfo/register |post |包含 username, password 的注册信息对象 | |
| 用户登录      | /userInfo/login |post |包含 username, password 的登录信息对象 | |
| 获取 wordbase | /userInfo |get  | userId | |
| 修改 wordbase | /userInfo/:userId |post | revised wordbase | 修改后的单词仓|

感觉可以优化一下 让接口更能见名知义

### 注册 & 登录
1. 注册
   - 格式验证: 用户名, 密码, 确认密码
   - 验证完毕, 保存至数据库 userInfo 的 users 集合中
2. 登录
   - 发起登录请求, 后台验证, 返回 success 或 failure 的信息, 前端根据信息进行不同操作; 
   - 登录成功后, 将后台返回的 userId 保存在 sessionStorage 中 ( cookie 也可), 每次涉及到操作 users 中的 wordbase 时都需要这个参数; (sessionStorage 刷新页面不会消失)
   - 先这么做, 因为接口就是这么设计的, 不要瞎改, 万一真的要改, 也要等到学习 express 优化后台之后

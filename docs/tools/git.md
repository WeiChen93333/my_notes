### git 配置流程与常用命令
##### 1. 腾讯应用中心下载安装 
##### 2. 创建用户名和密码
```
//在任何地方打开命令行窗口
git config --global user.name "用户名"
git config --global user.email "邮箱"
```
##### 3. 初始化
(1) 在需要用 git 管理的文件夹下， 按住 shift 的同时按下鼠标右键, 点击 "在此处打开 Powershell 窗口"  
(2) 执行 git init 命令把这个目录变成 git 可以管理的仓库  

#### 4. 与远程仓库连接
(1) 生成和配置 ssh key 
执行命令
```
ssh-keygen -t rsa -C "邮箱"
```
登录 github, 点击 "Settings" > "SSH and GPG keys" > "New SSH key", 用记事本打开 .ssh/id_rsa.pub, 并将内容贴入 Key 文本框中
(2) 在 github 上创建一个远程仓库 (不要勾选 "Initialize this repository with a README")
(3) 仓库创建完成后会出现提示, 按照提示在本地文件夹中操作即可
#### 5. 常用命令
- 添加工作区内文件到缓存区: git add 文件名; (git add . 批量添加)

- 将缓存区的文件提交到本地仓库: git commit -m “描述”

- 将分支推送到远程仓库: git push -u origin 分支名

- 将分支的内容合并到 master 分支  
(1) 切换到 master 分支: git checkout master  
(2) 合并: git merge 分支名

- 查看分支状态: git status  

- 查看所有分支(当前所在分支前有星号*)
  - 不包括远程: git branch
  - 包括远程: git branch -a

- 创建子分支: git checkout -b 分支名

- 重命名分支
git branch - m 旧名字 新名字

- 删除分支
  - 本地分支: git branch -d 分支名
  - 远程分支: git push -d origin 分支名

#### 7. andVue
通过 vue cli 创建的项目带有 .git 文件夹, 也就是说这个项目所在文件夹已经是一个 git 管理的仓库了, 不需要执行第 3 步

### 安装与初始化

(1) 安装 docsify-cli 工具，方便创建及本地预览文档网站。

```bash
npm i docsify-cli -g
```

(2) 初始化一个项目

创建一个文件夹 如: my_notes

进入文件夹, 执行 ``docsify init ./docs``

(3) 执行 ``docsify serve docs`` 启动项目, 即可在 [http://localhost:3000](http://localhost:********/) 看到效果

### 配置
- 在 _sidebar.md 中, 地址是绝对路径, / 前面省略的是 docs; 后面不写代表 "首页", 也就是 README.md; 如果子级文件夹中没有 README.md, _sidebar.md 等, 那么将使用父级文件夹中的
  ```
  * [Home](/javascript/)
  * [递归](/javascript/递归.md)
  ```

### 与 github pages 协作

(1) 进入 my_notes 文件夹, 执行``git init``, 按照一般流程将此项目推送到远程仓库即可

(2) 进入远程仓库的 settings 页面, 将 source 设置为 master branch/docs

(3) 进入提示的地址即可访问
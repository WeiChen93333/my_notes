使用过的node模块
http fs path url
mongoose

node 和 js 的区别
js 运行在浏览器, node 是一个 js 运行时, 使得js可以在服务器端运行
js 的全局对象为 window, node 有多个全局对象
__dirname 是当前执行的 js 文件的目录的绝对路径
__filename 是当前执行的 js 文件的绝对路径
console
node 的全局对象还包括 setInterval()/clearInterval()，setTimeout()/clearTimeout() 和 setImmediate()/clearImmediate() 函数，所以我们在 node 中也可以像在浏览器环境中一样使用定时器方法。
### 一、什么是 promise
>promise 是一种异步编程解决方案  

##### 语法
new Promise( function(resolve, reject) {...})  
**参数 executor**  
executor是带有 resolve 和 reject 两个参数的函数 。Promise构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给executor。executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，要么调用reject 函数将promise的状态改为rejected。

*既然 promise 包含的是一个异步的操作/一个将来的结果, 那么 resolve, reject 这两个钩子由谁来触发呢? 应该是有两种, 一是该异步操作的回调函数中触发(自动); 二是设置条件判断来触发(手动)*

**异步操作的回调函数中触发**
```
const handWordRouter = (req, res) => {  
  const method = req.method
  const url = require('url') 
  const { pathname } = url.parse(req.url, true)
  if(method == 'GET' && pathname == '/dict'){     
    const { query } = url.parse(req.url, true)  
    function process(){
      const result = new Promise((resolve, reject) => {
        WordModel.findOne({word: query['word']}, function(err, doc){
          if(!err){
            resolve(doc)          
            }
          })  
        })     
      return result
    }
    return process() 
  }
}
```

**设置条件判断来触发**
```
export default {
  name:'MoMessageBox', 
  data(){
    return {
      confirmBoxVisible: false,
      type: '',
      message: '',      
      promiseStatus: null
    }
  },
  methods:{
    showConfirmBox(message, type){
      this.type = type;
      this.message = message;
      this.confirmBoxVisible = true
      const p = new Promise((resolve, reject) => {     
        this.promiseStatus = {resolve, reject}        
      })  
      return p
    },
    clickToCancel(){      
      this.confirmBoxVisible = false
      this.promiseStatus && this.promiseStatus.reject('cancel')
    },
    clickToConfirm(){       
      this.confirmBoxVisible = false    
      this.promiseStatus && this.promiseStatus.resolve('confirm')
    }
  }
}
```

### 二、与 async await 协作
async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。
```
const handWordRouter = (req, res) => {  
  const method = req.method
  const url = require('url') 
  const { pathname } = url.parse(req.url, true)
  if(method == 'GET' && pathname == '/dict'){     
    const { query } = url.parse(req.url, true)  
  async function process(){
      const result = await new Promise((resolve, reject) => {
        WordModel.findOne({word: query['word']}, function(err, doc){
          if(!err){
            resolve(doc)          
            }
          })  
        })      
      console.log(result) //最后打印, 结果是 doc
      return result
    }    
    const result = process()
    console.log(result) //最先打印, 结果是 Promise 对象{resolved, model}
    return result
  }
}
console.log(result) //第二打印, 结果是 Promise 对象{resolved, model}
// 如果不加 async await, 就是从上至下依次打印, 三次结果是一样的: Promise 对象{resolved, model};
//即使加了 async await 也只是对被 async 修饰的函数的函数体内的语句有效; 其他的语句不会等

  const result = handWordRouter(req, res)
  result.then(wordData => {
    flag = true
    res.end(JSON.stringify(wordData))
    console.log(flag)  //后打印
  })   
  console.log(flag) //先打印

  const test = result.then(wordData => {
    flag = true
    res.end(JSON.stringify(wordData))
    console.log(flag) //后打印
  })   
  console.log(test.PromiseValue) //先打印
  //result.then() 的返回值为 Promise 对象 { PromiseStatus: resolved, PromiseValue: undefined }; 返回值立刻就可以拿到了, 参数函数体中的语句还未执行

 
```


我的理解: async用于申明函数中包含异步操作, 比如数据请求  
await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。  
阻塞后面的代码: 也就是阻塞它后面的语句; 但是函数外部的其他代码是不受影响的  
不需要写 then; catch 是不能省略的
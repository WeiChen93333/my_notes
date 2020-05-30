> 程序外部存储/浏览器存储: js代码是运行在内存中的， 代码运行时的所有变量， 函数， 也都是保存在内存中的。 刷新页面， 以前申请的内存被释放， 重新加载脚本代码， 变量重新赋值， 所以这些数据要想储存就必须储存在外部， 例如： localStorage, sessionStorage, IndexDB等

- vuex
  vuex 中的数据刷新页面就会清空  
  可以在刷新时将其中的数据存储至 "外部"
  ```
  const store = new Vuex.Store({
    state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
      //数据初始状态
    }
  })

  在主组件中:
  mounted(){
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
        sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
  ```

- cookie  
  cookie的诞生: 由于HTTP协议是无状态的，而服务器端的业务必须是要有状态的。 cookie诞生的最初目的是为了存储 web 中的状态信息，以方便服务器端使用。比如判断用户是否是第一次访问网站。  
  cookie的处理：服务器向客户端发送 cookie; 浏览器将 cookie 保存; 之后每次 http 请求浏览器都会将 cookie 发送给服务器端  
  JavaScript 可以使用 document.cookie 属性来创建 、读取、及删除 cookie。这也是唯一可以操作cookie的属性
  ```
  (1)设置与变更
  document.cookie = 'name = chen'
  document.cookie = 'age = 27'
  function setCookie(key, value, expires){
    var time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + expires * 1000)
    document.cookie = `${key} = ${value}; expires = ${expires ? time : ''}`
  }
  setCookie('day', 'may', '10')

  (2)获取
  function getCookie(key){
    var value = ''
    var cookieArr = document.cookie.split('; ')
    cookieArr.forEach(item => {
      var tempArr = item.split('=')     
      if(tempArr[0] == key) value = tempArr[1]
    })    
    if(value) return value
    return '未找到目标cookie'
  }
  console.log(getCookie('day'))
  ```

- sessionStorage  
  当前会话期有效, 关掉页面存储的数据会清空, 刷新页面不会

- localStorage  
  无法设置有效期, 永久有效, 除非手动删除. (清楚缓存会清除存储的数据)  
  不同浏览器无法共享 localStorage, 相同浏览器的不同页面间可以共享相同的 localStorage (页面属于相同域名和端口)

- indexedDB

- jwt/json web token (尝试过, 但是后台配置不成功)   
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
- 自己主动使用的第一个递归
场景描述: 添加单词到单词集, payload 既有可能是一个单词, 也有可能是一个两层数组(一个数组套着一个或多个小数组, 里面是数个单词)
递归说白了就是在函数体中调用自身. 先递再归, "出口" 就是最小的那个点, 就是那个能处理的点
```
 addWord(state, payload){      
      function process(param){
        if(typeof param == 'string'){
          const reg = /([a-zA-Z]|')+/     
          if(reg.exec(param)){
            param = reg.exec(param)[0]
            state.wordCollection.push(param)            
          }
          return        
        }
        for(let item of param){
          process(item)         
        }
      }     
      process(payload)    
    }
```

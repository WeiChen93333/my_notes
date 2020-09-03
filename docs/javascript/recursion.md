## 递归

递归说白了就是在函数体中调用自身  
当一个问题可以层层分解为一个个子问题, 而问题和子问题是一样的, 那么就可以使用递归  
- 子问题须与原始问题为同样的事，且更为简单；
- 不能无限制地调用本身，须有个出口，化简为非递归状况处理。

### 动态规划 -- 聪明的递归
动态规划在查找有很多重叠子问题的情况的最优解时有效。它将问题重新组合成子问题。为了避免多次解决这些子问题，它们的结果都逐渐被计算并被保存，从简单的问题直到整个问题都被解决。因此，动态规划保存递归时的结果，因而不会在解决同样的问题时花费时间。  
(如下面的斐波拉契数列的第二种解法)

### 自己主动使用的第一个递归
场景描述: 添加单词到单词集, payload 既有可能是一个单词, 也有可能是一个两层数组(一个数组套着一个或多个小数组, 里面是数个单词)
```js
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

### 斐波拉契数列
1, 1, 2, 3, 5, 8

#### 普通递归
```js
const fib = function(n) {
    if (n == 0 || n == 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
```

#### 动态规划
```js
const fib = function(n) {
  if (n == 0) {
      return 0;
  }
  let a1 = 0;
  let a2 = 1;
  for (let i = 1; i < n; i++) {
    [a1, a2] = [a2, a1 + a2];
  }
  return a2;
}
console.log(fib(5)) //5
```

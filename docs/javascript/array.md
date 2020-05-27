### 数组常用方法
> 构造函数的方法:

转换传入参数为数组: Array.from; 判断是否为数组: Array.isArray

> 原型链上的方法:

增减: push, pop, shift, unshift; 拷贝/切片: slice; 拼接: concat, splice, join; 转为字符串: soString; 翻转: reverse; 排序: sort  
查询与检测: indexOf/lastIndexOf, includes, find(返回第一个符合要求的项), every(全部符合要求才返回true), some(有一个符合要求就返回true);  
遍历: forEach, map, reduce; 过滤: filter

> 重写ES6方法:  

- find    
  ```
  Array.prototype.myfind = function(fn){
    for(var i of this){
      if(fn(i)){
        return i
      }
    }      
  }
  const arr = [1, 2, 3, 4]
  const result = arr.myfind(item => item > 2) 
  console.log(result) //3
  可以定义内置对象的原型链, 但只在当前页面有效, 因为每个页面都会初始化内置对象    
  ```

- every  
  ```
  Array.prototype.myevery = function(fn){    
    for(var i of this){
      if(!fn(i)){
        return false
      }
    }
    return true
  }
  ```

- reduce  
  这个方法本质上就是提供基底(参数提供或使用数组第一项), 这个基底和调用方法的数组各项交互  
  ```
  Array.prototype.myreduce = function(callback, initialValue){    
    if(initialValue){
      var accumulator = initialValue
      for(let i = 0; i < this.length; i++){
        accumulator = callback(accumulator, this[i])
      }
      return accumulator
    }else if(!initialValue && this.length !== 0){
      var accumulator = this[0]
      for(let i = 1; i < this.length; i++){
        accumulator = callback(accumulator, this[i])
      }
      return accumulator
    }else{
      throw new Error("TypeError: Reduce of empty array with no initial value")
    }    
  }
  let arr = ['a', 'b', 'c', 'a']
  //计算数组中每个元素出现的次数使用的callback：
  fn = function(accumulator, currenValue){    
    if(currenValue in accumulator){
      accumulator[currenValue]++
    }else{
      accumulator[currenValue] = 1
    }
    return accumulator
  }  
  console.log(arr.myreduce(fn, {}));
  //数组去重使用的callback：
  fn = function(accumulator, currenValue){    
    if(!accumulator.includes(currenValue)){
      accumulator.push(currenValue)
    }
    return accumulator
  }  
  console.log(arr.myreduce(fn, []))
  ```

### 数组常用算法
> 数组去重

1. 普通循环方法
   ```
   (1)
      let arr = [1, 2, 2, 2, 4, 5, 3, 1, 2, 3, 3, 4, 5]
      const newArr = []
      for(let item of arr){
        if(!newArr.includes(item)) newArr.push(item)
      }   
    (2)
      let arr = [1, 2, 2, 2, 4, 5, 3, 1, 2, 3, 3, 4, 5]
      arr.sort((a, b) => a - b) 
      for(var i = 0; i < arr.length - 1; i ++){
        if(arr[i] == arr[i+1]){
          arr.splice(i + 1, 1)
          i --
        }      
      }
    
   ```
2. es6的Set数据结构
   ```
    let arr = [1, 2, 2, 2, 4, 5, 3, 1, 2, 3, 3, 4, 5]
    const set = new Set(arr)
    arr = [...set]      
   ```

> 数组排序

1. 冒泡排序
   ```
    function bubbleSort(arr){
      for(var i = 0; i < arr.length - 1; i++){
        for(var j = 0; j < arr.length -1 - i; j++){
          if(arr[j] > arr[j + 1]){
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp
          }
        }
      }
      return arr
    } 
    console.log(bubbleSort(arr));
   ```
2. 快速排序
   ```
   let arr = [1, 22, 2, 7, 19, 5, 3, 53, 2, 9, 68, 74, 85, 17]
    function quickSort(arr){
      if(arr.length == 1 || arr.length == 0) return arr
      const pivot = arr[0]
      var bigger = []
      var smaller = []
      for(let i = 1; i < arr.length; i++){
        if(pivot >= arr[i]){
          smaller.push(arr[i])
        }else{
          bigger.push(arr[i])
        }
      }
      return quickSort(smaller).concat(pivot, quickSort(bigger))
    }
    console.log(quickSort(arr));
   ```

### js 中循环 (目标对象/数组)

#### for while do...while
没什么特别没什么好说的

> 以下方式遍历时的区别主要在三个方面: 是否自身, 是否原型链(继承), 是否可枚举

**可枚举属性**  
指那些内部 “可枚举” 标志设置为 true 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true，对于通过 Object.defineProperty 等定义的属性，该标识值默认为 false  
*数组自定义属性也是自有属性; 数组 'length' 为不可枚举自有属性*

- for...in 可枚举
- Object.getOwnPropertyNames 自身, 但不包括Symbol值作为名称的属性
- Object.keys 自身, 可枚举

*(所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。)*

#### for in/0f 循环
for (let item in/of obj){}  
- for in 循环遍历属性名/索引; for of 循环遍历值
- for...in 遍历对象的可枚举属性，包括自有属性、继承自原型的属性 (循环数组时返回的除了数字索引，还有自定义的属性名字)

```js
const obj = {
  name: "chen",
  family: 4
} 
Object.defineProperty(obj, "age", {value:"27", enumerable: false})
Object.prototype.hobby = 'programming' 
for(let item in obj){
  console.log(item) //name, family, hobby
} 
console.log(Object.getOwnPropertyNames(obj)) //["name", "family", "age"]
console.log(Object.keys(obj)) //["name", "family"]
```

#### 获取索引/属性名, 用于遍历
- Object.keys()  
返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致   

- Object.getOwnPropertyNames()
返回一个由指定对象的所有自身属性的属性名 (包括不可枚举属性但不包括Symbol值作为名称的属性) 组成的数组。

```js
const menu = [
  {
    content: '查询释义'
  
  },
  {
    content: '查询例句'
    
  },
  {
    content: '添加到单词集'
  
  },
  {
    content: '添加到句集'
      
  }
]  
menu.test = 'test'
console.log(Object.keys(menu)) //["0", "1", "2", "3", "test"]
console.log(Object.getOwnPropertyNames(obj)) //["0", "1", "2", "3", "length", "test"]
```

```js
const obj = {name: 'wei', surname: 'chen'}       
console.log(Object.getOwnPropertyNames(obj)) //["name", "surname"]
```

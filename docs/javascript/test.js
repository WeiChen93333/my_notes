function Person(name, age, job){  
  this.name = name
  this.age = age
  this.job = job   
}
const person = new Person('chen', 27, 'programmer')

console.dir(person)

//原始值忽略

function newMock(){
  const obj = {}  //(1)
  const Constructor = [].shift.apply(arguments)
  obj.__proto__ = Constructor.prototype  //(3) 
  const result = Constructor.apply(obj, arguments)  //(2)  
  return result instanceof Object ? result : obj  //(4)
}
function Creation(name, age, job){    
  this.name = name
  this.age = age
  this.job = job  
  const love = 'love'
  return function(){
    console.log('true')
  }
}
const final = newMock(Creation, 'chen', 27, 'programmer')
console.log(final) //Creation { name: 'chen', age: 27, job: 'programmer' }


console.log(typeof Creation)
console.log(Creation instanceof Object)


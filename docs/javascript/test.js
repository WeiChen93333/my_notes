function isObject(source){
  return source.constructor == Object
}
function isArray(source){
  return source.constructor == Array
}
function isBasic(source){
  return typeof source !== 'object' || typeof source === null
}
function deepClone(source){ 
  if(isBasic(source)) return source
  const clone = isObject(source) ? {} : isArray(source) ? [] : null
  console.log(clone)
  const propNames = Object.getOwnPropertyNames(source)      
  propNames.forEach((value) => {
    if(isBasic(source[value])){
      clone[value] = source[value]
      console.log(clone)
      return clone
    }
    if(isObject(source[value]) || isArray(source[value])){
      deepClone(source[value])
    }     
  })
  return clone
}

const obj = {
  simple: 'chen',
  complex: {
    age: 27
  }
}
const objClone = deepClone(obj)
console.log(objClone)

const arr = [
  30,
  ['today', 'happy']
]

const arrClone = deepClone(arr)
console.log(arrClone)


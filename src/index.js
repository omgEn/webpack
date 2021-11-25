let str = require('./a.js')
console.log(str)

require('./index.css')
require('./index.less')

// require('./indexDB.js')

let fn = B => {
  console.log('fn')
}
fn()

// @annotation
class A {
  a = 1
}

console.log(new A().a)

function add () {
  // const args = Array.from(arguments)
  const len = arguments.length
  const arg = Array.from(arguments)
  if (len === 0) return
  if (len === 1) {
    return arg[0]
  } else {
    const arr = arg.slice(1)
    return Number(arg[0]) + add(arr)
  }
}

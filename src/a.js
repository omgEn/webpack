// module.exports
require('@babel/polyfill')
class B {}
// * 处理异步流程的
function * gen (params) {
  yield 1
}
console.log(gen().next())
'aaa'.includes('a')

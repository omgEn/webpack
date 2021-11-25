var db
var version = 5

// 初始数据
const customerData = [
  { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' }
]
function openDB () {
  // 连接数据库
  var DBOpenRequest = window.indexedDB.open('toDoList', version)

  // 生成处理函数
  // DBOpenRequest.onsuccess = function (e) {
  //   db = DBOpenRequest.result
  //   // db = e.target.result
  //   // console.log('success',db,e)
  // }

  DBOpenRequest.onerror = function (e) {
    console.log('error', e)
    alert('Database error: ' + e.target.errorCode)
  }

  // onupgradeneeded 是唯一可以修改数据库结构的地方,
  // 可创建和删除对象存储空间以及创建和删除索引
  DBOpenRequest.onupgradeneeded = function (e) {
    console.log(33)
    db = e.target.result

    // 创建对象仓库
    // 存储用户相关信息，用key作为键路径（唯一的）
    var objectStore = db.createObjectStore('customers', { keyPath: 'ssn' })

    // 建立一个索引来通过姓名搜索客户。名字可能重复， 所以不能使用unique索引
    objectStore.createIndex('name', 'name', { unique: false })

    // 使用邮箱建立索引，邮箱不会重复，所已可使用unique索引
    objectStore.createIndex('email', 'email', { unique: true })

    // 使用事务的oncomplete事件确保在插入数据前对象仓库已经创建完毕
    objectStore.transaction.oncomplete = function (e) {
      // 将数据保存到新创建的对象仓库
      var customerObjectStore = db
        .transaction('customers', 'readwrite')
        .objectStore('customers')
      console.log('customerObjectStore', customerObjectStore)
      customerData.forEach(function (customer) {
        customerObjectStore.add(customer)
      })
    }

    // 设置 autoIncrement 标志为 true 来创建一个名为 names 的对象仓库
    // 因为 names 对象仓库拥有键生成器，所以它的键会自动生成。
    var objStore = db.createObjectStore('names', { autoIncrement: true })
    customerData.forEach(function (customer) {
      objStore.add(customer.name)
    })
  }
}
openDB()
module.exports = db

// 。IndexedDB 的主要设计目标之一就是允许大量数据可以被存储以供离线使用
// chrome54并不会触发upgradeneeded事件
// Stackoverflow上提供的解决办法是，在open方法传入第二个参数（与已有version不同，且更大），这样就会触发chrome上的upgradeneeded事件了。不过，每次都需要调用db.version获取当前的版本号。

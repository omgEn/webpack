// ## webpack 打包图片
// - 在 js 中创建图片引入
import logo from './assets/img/xiaoxin.jpg';
console.log(logo);
let image = new Image();
image.src = logo;
document.body.appendChild(image);
// - 在 css 中引入 background
// - <img src></img>

let str = require('./a.js');
console.log(str);

require('./index.css');
require('./index.less');
// require('./indexDB.js')

// ## 设置全局变量
// - expose-loader 暴露到 window 上
// - providePlugin 给每个人提供一个$
// * 引入 cdn 不打包的方式

// import $ from 'jquery';
// // 通过webpack.ProvidePlugin
// console.log('$', $);
// // 通过cdn
// console.log('window.$', window.$);

let fn = (B) => {
  console.log('fn');
};
fn();

// @annotation
class A {
  a = 1;
}

console.log(new A().a);

function add() {
  // const args = Array.from(arguments)
  const len = arguments.length;
  const arg = Array.from(arguments);
  if (len === 0) return;
  if (len === 1) {
    return arg[0];
  } else {
    const arr = arg.slice(1);
    return Number(arg[0]) + add(arr);
  }
}

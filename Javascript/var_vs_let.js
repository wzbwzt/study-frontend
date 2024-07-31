/**
 * 在 JavaScript 中，var 和 let 主要有以下区别：
作用域
var 声明的变量具有函数作用域，即在函数内声明的 var 变量在整个函数内都是可见的。
let 声明的变量具有块级作用域，即在 if 语句、for 循环、{} 等代码块中声明的 let 变量只在该代码块内可见。
变量提升
var 存在变量提升，即在变量声明之前使用该变量，不会报错，只是值为 undefined。
let 不存在变量提升，如果在声明之前使用，会报错。
重复声明
可以使用 var 多次声明同一个变量，后面的声明会覆盖前面的声明。
不允许使用 let 重复声明同一个变量。
综上所述，在现代 JavaScript 开发中，通常更推荐使用 let 来声明变量，以避免一些由于作用域和变量提升带来的潜在问题。
 * **/

function foo() {
  var a_var = 1;
  let b_let = 2;
  {
    let b_let = 3;
    var c_var = 4;
    let d_let = 5;
    console.log(a_var); //1
    console.log(b_let); //3
  }
  console.log(b_let); //2
  console.log(c_var); //4
  console.log(d_let); //报错
}

foo();

## 什么是 promise

- promise A+ : 定义了什么是 promise,即有 then 属性的对象叫 promise

```js
{
    then(...){}
}
```

- ES6 promise: 是对 promiseA+规范的实现,then 其实就是调用 then(null,()=>{})

```js
new Promise(); //创建一个promise实例
```

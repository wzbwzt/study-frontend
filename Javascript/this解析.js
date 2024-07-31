var obj = {
  foo: function () {
    console.log(this.bar);
  },
  bar: 1,
};

var foo = obj.foo;
var bar = 2;

obj.foo(); // 1
foo(); // 2

/*
对于obj.foo()来说，foo运行在obj环境，所以this指向obj；对于foo()来说，foo运行在全局环境，所以this指向全局环境。所以，两者的运行结果不一样。
*/

/*
对象存储时，属性变量存的是内存地址(reference)，如果value是函数的话，那么执行时就会有不同的上下文(context),this 相当于指代了当前的原先环境
*/
var f = function () {};
var obj = { f: f };

// 单独执行: 上下文为全局
f();

// obj 环境执行: 上下文为obj
obj.f();

/*
https://segmentfault.com/a/1190000040823905#item-1
 */

var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  },
};
function sayName() {
  var sss = person.sayName;
  sss();
  person.sayName();
  person.sayName();
  (b = person.sayName)();
}
sayName();

//output:
//window
//person
//person
//window

//定义对象时是不产生作用域的
var name = "window";
var person1 = {
  name: "person1",
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};
var person2 = { name: "person2" };

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);

//outpus:
//person1
//person2;
//window;
//window;
//window;
//window;
//person2;
//person1;
//person2;
//person1;

//构造函数中定义函数，该函数的上级作用域是构造函数
var name = "window";
function Person(name) {
  this.name = name;
  (this.foo1 = function () {
    console.log(this.name);
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name);
      };
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name);
      };
    });
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);

//output:
//person1
//person2
//person1
//person1
//window
//window
//person2
//person1
//person2
//person1

//区分作用域
var name = "window";
function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()();
person1.obj.foo1.call(person2)();
person1.obj.foo1().call(person2);
person1.obj.foo2()();
person1.obj.foo2.call(person2)();
person1.obj.foo2().call(person2);

//output:
//window
//window;
//person2;
//obj;
//person2;
//obj;

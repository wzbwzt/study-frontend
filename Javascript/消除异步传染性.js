//消除异步函数的传染性：也就是代数效应

function getUser() {
  return fetch("./demo.json");
}

function m1() {
  const user = getUser();
  return user;
}

function m2() {
  const user = m1();
  return user;
}

function main() {
  console.log(1);
  const user = m2();
  console.log(user);
  return user;
}

//通过局部修改fetch 使用cache，使得main调用两次
function run(f) {
  //注意： 如果getUser()中存在多个fetch时，这里改为数组存储多个缓存
  let cache = {
    status: "pending",
    value: null,
  };
  let oldFetch = window.fetch;
  window.fetch = function (...args) {
    if (cache.status == "fulfilled") {
      return cache.value;
    }
    if (cache.status == "rejected") {
      throw cache.value;
    }

    //发送请求
    const prom = oldFetch(...args)
      .then((res) => res.json())
      .then((res) => {
        cache.status = "fulfilled";
        cache.value = res;
      })
      .catch((err) => {
        cache.status = "rejected";
        cache.value = err;
      });

    //抛出错误
    throw prom;
  };

  try {
    f();
  } catch (err) {
    if (err instanceof Promise) {
      err.then(f, f).finally(() => {
        window.fetch = oldFetch;
      });
    }
  }
}

run(main);

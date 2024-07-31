//去抖动

const exec = (i) => {
  i++;
  debugger;
  console.log(i);
};

function debounce(fn, delay) {
  let timeid;
  return function (...args) {
    clearTimeout(timeid);
    timeid = setTimeout(() => {
      fn(args);
    }, delay);
  };
}

const df = debounce(exec, 1000);
for (let i = 0; i <= 10; i++) {
  df(i);
}

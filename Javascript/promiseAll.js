//实现一个Promise.all

Promise.myall = function (proms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  let result = [];
  let count = 0;
  let completedCount = 0;
  let i = 0;
  for (const prom of proms) {
    const index = i;
    i++;
    count++;
    Promise.resolve(prom).then((data) => {
      result[index] = data;

      completedCount++;

      console.log(completedCount, count);

      if (completedCount == count) {
        res(result);
      }
    }, rej);
  }
  if (!count) return res(result);
  return p;
};

Promise.myall([1, 2, 3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("err", err);
  });

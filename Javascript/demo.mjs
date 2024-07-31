console.log(import.meta);

(async () => {
  const res = await import("./debounce.js");
  console.log(res);
})();

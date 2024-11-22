export const debouncedFetch = (callback, delay) => {
  let timer;
  console.log(callback)

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

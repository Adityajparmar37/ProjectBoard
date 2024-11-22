export default function throttle(fn, limit) {
  let flag = true;
  console.log(flag)

  return function (...args) {
    let context = this;

    if (flag) {
      fn.call(context, args);
      flag = false;
      console.log("Cannot Messgae for ",limit)
      setTimeout(() => {
        console.log("Now you can message")
        flag = true;
      }, limit);
    }
  };
}

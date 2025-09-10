export const debounce = (fn: Function, wait: number) => {
  let timerId: number;

  return function (this: any, ...args: Array<any>) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), wait);
  };
};

/* 

 Step 0 - Wrap a function inside another function to understand the basic setup

 Step 1 - Understand concept of debounce with just setTimeout 

Step 2 - Introduce clearTimeout at outer level to understand the behaviour of debounce - This is a non-reusable implementation

Step 3 - Take care of `this` and `args`

*/

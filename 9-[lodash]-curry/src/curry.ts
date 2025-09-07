// Loose curry (official solution and works on GFE) - Where initially will accept multiple args

export function curry(fn: Function) {
  return function curried(this: any, ...args: any) {
    if (args.length >= fn.length) return fn.apply(this, args);

    return (arg: any) =>
      arg === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, arg]);
  };
}

export function singleCurry(fn: Function) {
  function curried(this: any, ...args: Array<any>) {
    if (args.length >= fn.length) return fn.apply(this, args);

    return (next: any) =>
      next === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, next]);
  }

  return function (this: any, arg: any) {
    // no args needed
    if (fn.length === 0) return fn.call(this);

    return arg === undefined ? curried.call(this) : curried.call(this, arg);
  };
}

/* Note, the above solutions can be done using .call as well where .apply is used */

/* Using .bind */
export function curryUsingBind(fn: Function) {
  return function curried(this: any, ...args: Array<any>): any {
    if (args.length >= fn.length) return fn.apply(this, args);

    // The above can be replaced with bind. To understand bind better, read https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb

    return curried.bind(this, ...args);
  };
}

/* Curry to support multiple args - Curry II */

export function curryII(func: Function): Function {
  return function curried(this: any, ...args: Array<any>): any {
    if (args.length >= func.length) return func.apply(this, args);

    return (...newArgs: Array<any>) =>
      curried.apply(this, [...args, ...newArgs]);
  };
}

export function classNames(...args: Array<unknown>): string {
  const result: Array<unknown> = [];

  const filteredArgs = args.filter(Boolean);

  for (let i = 0; i < filteredArgs.length; i++) {
    const current = filteredArgs[i];

    if (Array.isArray(current)) {
      const res = current.map((el) => classNames(el));
      result.push(...res);
    } else if (current != null && typeof current === "object") {
      // The object values will be either true or false only. So we are more interested in keys. We need to consider only keys whose values are true

      const res = [];
      for (const [key, val] of Object.entries(current)) {
        if (!!val) {
          res.push(classNames(key)); // note that key will always be string in an object, so no need to convert that to string
        }
      }
      result.push(...res);
    } else {
      result.push(current); // result is an array of unknown, so it doesn't complain what we push. So we need to always confirm what kind of values are possible in inputs
    }
  }

  return result.join(" ");
}

// ["foo",'bar']

classNames("foo", "bar"); // 'foo bar'
classNames("foo", { bar: true }); // 'foo bar'
classNames({ "foo-bar": true }); // 'foo-bar'
classNames({ "foo-bar": false }); // ''
classNames({ foo: true }, { bar: true }); // 'foo bar'
classNames({ foo: true, bar: true }); // 'foo bar'
classNames({ foo: true, bar: false, qux: true }); // 'foo qux'

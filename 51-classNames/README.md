## [ClassNames](https://www.greatfrontend.com/questions/javascript/classnames?practice=practice&tab=coding)

`Approx time - 15m`

Very similar to [flatten-array](https://www.greatfrontend.com/questions/javascript/flatten?practice=practice&tab=coding), so I strongly recommend you do that before doing this.

```ts
classNames("foo", "bar"); // 'foo bar'
classNames("foo", { bar: true }); // 'foo bar'
classNames({ "foo-bar": true }); // 'foo-bar'
classNames({ "foo-bar": false }); // ''
classNames({ foo: true }, { bar: true }); // 'foo bar'
classNames({ foo: true, bar: true }); // 'foo bar'
classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
```

## [Transfer List](https://www.greatfrontend.com/questions/user-interface/transfer-list?practice=practice&tab=coding)

Do [Transfer list logic](https://github.com/sandeep194920/CodingPractice/tree/main/41-transfer-list-using-map) first and then continue this question. It is based on the previous question's logic.

We will use Map to store the data. See [Transfer list logic](https://github.com/sandeep194920/CodingPractice/tree/main/41-transfer-list-using-map) first.

### Things learnt

- If you see this pattern where a component has checkbox + label, it's better to make it a component because we need to use `useId()` to get the unique Id. This will be a clean approach.

```css
[x] Item
```

- `map.entries()` is very much same as doing `map itself`

```ts
Array.from(map.entries());

// is same as
Array.from(map);
```

**So feel free to skip `map.entries()` and use map only**

# [TODO List](https://www.greatfrontend.com/questions/user-interface/todo-list)

`Approx time - 20m`

## Things learnt

- How to create unique `id` for creating todo-list?

- How to improvise above unique `id` and make it secure so that it can be used to just read and not modify using IIFEE here (immediately invoked function)

- How to submit on enter? -> By wrapping input and submit button inside the form.

- How to add window confirmation before deleting the task?

- How to add `aria-live` for live updates based on user actions?

- QUIZ - What if you want to re-render only the items that have changed to the UI?

---

### How to create unique `id` for creating todo-list?

While creating a new task, each task should have unique ID:

- We can either use uuid to generate unique id
- OR we can use a simple incrementing counter
  - We will see how to secure it as well

1. Using uuid

```ts
import { v4 as uuidv4 } from "uuid";

// Inside handleAddTask
setTasks((prev) => {
  const newMap = new Map(prev);
  newMap.set(uuidv4(), task.trim()); // uuidv4() generates a unique string
  return newMap;
});
```

2. Unique ID generation using simple counter

We could just do

```ts
let taskId = 0;
```

and then increment this by doing `taskId++` while using it. This works, but we need to be careful and not let other code update it at any point. So just to be safe, we can follow IIFEE pattern (immediately invoke function).

```ts
// newId gets back a function () => id++. Here this is possible due to closure of id where it cannot be editted in other places. We can only increment it by calling newId()
const newId = (() => {
  let id = 0;
  return () => id++;
})();
```

---

### How to add `aria-live` for live updates based on user actions?

`aria-live` for live updates - Important where something updates based on actions. For example, in todo list, the render area changes when a todo is added, deleted and so on.

```ts
/* aria-live = polite  so that the current screen reader voice will not interrupt*/

<div aria-live="polite">{message}</div>
```

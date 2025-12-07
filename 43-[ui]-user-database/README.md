## [Users Database](https://www.greatfrontend.com/questions/user-interface/users-database/react?framework=react&tab=coding)

`Approx Time - 20minutes`

### Things Learnt

#### Select and options

- In `select` we generally see one option by default. We can set `size` prop to show number of options we need.

```ts
<select
  size={5}
  value={selected || "default"}
  onChange={({ target }) => {
    const selectedId = target.value;

    setSelected(selectedId);

    const user = users.find((user) => user.id === selectedId);

    if (user) {
      setFname(user.fname);
      setLname(user.lname);
    }
  }}
  className="select"
/>
```

---

#### Multiple buttons for form submissions - button `name` and `value` prop pair usage.

- Say we have multiple buttons in the form that all leads to submit. Then we can define same `name` for each button. Each button will have different `value`.

```tsx
// the name is 'intent' here
<form>
  <div className="buttons">
    <button name="intent" value="create" disabled={disabledStates.create}>
      Create
    </button>
    <button name="intent" value="update" disabled={disabledStates.update}>
      Update
    </button>
    <button name="intent" value="delete" disabled={disabledStates.delete}>
      Delete
    </button>
    <button name="intent" value="cancel" disabled={disabledStates.cancel}>
      Cancel
    </button>
  </div>
</form>
```

We can then write `handleSubmit` like this

```ts
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(
    e.currentTarget,
    (e.nativeEvent as SubmitEvent).submitter
  );

  const intent = formData.get("intent");

  switch (intent) {
    case "create":
      handleCreate();
      break;
    case "update":
      handleUpdate();
      break;
    case "delete":
      handleDelete();
      break;
    case "cancel":
      handleCancel();
      break;
    default:
      throw new Error(`Invalid intent ${intent}`);
  }
};
```

The keypart is

```ts
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
e.preventDefault()
const formData = new FormData(
  e.currentTarget,
  (e.nativeEvent as SubmitEvent).submitter
);

const intent = formData.get("intent");

```

---

#### How to deal with a problem with `select` where an `option` still remains selected after clicking cancel button.

I observed this in [official solution](https://www.greatfrontend.com/questions/user-interface/users-database/react?framework=react&tab=coding) as well where,
you select an option -> cancel -> select the same option again and you see the first and last name inputs won't be filled. The reason for that is, `onChange` will not be triggered.

So do this

- Use a hidden value `<option value="default" style={{ display: "none" }}>` and do

```ts
<select
  value={selected || "default"}
```

This will select `default` value when selected is `null` which enable what you exactly want.

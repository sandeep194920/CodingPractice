## [useDebounce hook](https://www.greatfrontend.com/questions/javascript/use-debounce?practice=practice&tab=coding)

`Approx time - 5 mins`

## Without new hook (with in same component)

```tsx
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const [delayedSearch, setDelayedSearch] = useState("");

  // Delay the search
  useEffect(() => {
    const timerID = setTimeout(() => {
      setDelayedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [search]);

  return (
    <>
      <h1>Use debounce hook</h1>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>The delayed search string is - {delayedSearch}</p>
    </>
  );
}

export default App;
```

---

## Same concpet by making a separate hook

```tsx
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const delayedSearch = useDebounce(search);

  return (
    <>
      <h1>Use debounce hook</h1>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>The delayed search string is - {delayedSearch}</p>
    </>
  );
}

export default App;

const useDebounce = (search: string) => {
  const [delayedSearch, setDelayedSearch] = useState("");

  // Delay the search
  useEffect(() => {
    const timerID = setTimeout(() => {
      setDelayedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [search]);

  return delayedSearch;
};
```

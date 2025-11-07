# Data table II

`Approx time - 10m`

This is a continuation of [Data Table I](https://github.com/sandeep194920/CodingPractice/tree/main/27-%5Bui%5D-data-table-I). So first complete that.

## Things learnt

- Why do we need to reset page number to 1 when we sort the field - similar to how we set the page number to 1 when page changes.
- How to sort table data?
- Why we do `localCompare` to sort strings and not `>` or `<`

---

### Why do we need to reset page number to 1 when we sort the field - similar to how we set the page number to 1 when page changes.

First of all the fact is, when we sort by clicking on any field, the entire data gets sorted - not just the pageData that is in view. Let's say if user is on 5th page and sorts the data, then he might be seeing some other data that he didn't see before which can be confusing.

If we take the approach of sorting on the data in that page, then we might have to chunk the data (make array of arrays) - probably getting the page data from backend would be ideal at the point.

For now, lets focus on sorting all data and because of above mentioned reason we need to reset the page to 1 to avoid confusion of seeing unseen data as soon as sorted.

---

### How to sort table data?

Each field can be sorted `ascending` or `descending`

| id  | name | occupation | age |
| :-- | ---: | :--------: | :-: |

So we can maintain two states - one for `field` that is sorted on and the other one is `direction`.

Sorting can be first done before even pagination function is called.

**Can't we do in one state?**

Basically we need to keep track of 2 data. one for which field to be sorted and one for sort direction. Hence 2 states are needed.

```ts
const sortUsers = (
  userList: User[],
  field: SortField | null,
  direction: SortDirection
) => {
  switch (field) {
    case "name":
    case "occupation":
      return userList.sort((a, b) =>
        direction === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field])
      );
    case "id":
    case "age":
      return userList.sort((a, b) =>
        direction === "asc" ? a[field] - b[field] : b[field] - a[field]
      );
    default:
      return userList;
  }
};
```

---

### Why we do `localCompare` to sort strings and not `>` or `<`?

This is one of those things that seems weird until you see what’s actually happening.

**Why we can’t just do > or < for strings**

When you do:

`"apple" < "banana"`

JavaScript can compare strings this way — but it does a basic Unicode code-point comparison, not a human-friendly (alphabetical) comparison.

So "ä" or "Á" or "ß" or characters from other languages can mess things up in sorting, because > and < don’t understand locale, accents, or cultural sorting rules.

```ts
Example: console.log("Z" < "a"); // true (because "Z" has a lower Unicode code point number)
```

But alphabetically, humans would treat lowercase and uppercase as equal.

**Why localeCompare() exists**

`localeCompare()` compares strings the way humans expect:

```ts
"apple".localeCompare("banana"); // -> -1 (apple comes before banana)
"banana".localeCompare("apple"); // -> 1 (banana comes after apple)
"apple".localeCompare("apple"); // -> 0 (equal)
```

It handles:
| Feature | `>` / `<` | `localeCompare()` |
|--------------------------|--------------------------|-------------------------------|
| Alphabetical sorting | ✅ basic only | ✅ correct & human-friendly |
| Case-insensitive sorting | ❌ | ✅ supported |
| Accented characters | ❌ often wrong | ✅ correct |
| Multi-language sorting | ❌ | ✅ correct based on locale |

Output:

```ts
Without  localeCompare:

["Banana", "Zebra", "apple"] // Weird ordering

---

With localeCompare:

["Zebra", "apple", "Banana"].sort((a, b) => a.localeCompare(b));

["apple", "Banana", "Zebra"]; // Correct alphabetical result

```

So when do you use which?
Scenario Use
Sorting strings for UI / search / tables ✅ localeCompare
Comparing plain ASCII strings in algorithms `> / <` is fine

Because for anything user-facing, people expect alphabetical logic, not raw unicode value comparison.

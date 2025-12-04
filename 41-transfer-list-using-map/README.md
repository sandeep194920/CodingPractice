## Transfer List

A pre-requisite to solve [Transfer List UI question](https://www.greatfrontend.com/questions/user-interface/transfer-list/react?framework=react&tab=coding)

This problem teaches you how to

- Iterate a map
- Why map is better when searching by key, inserting, deleting from a big list.

We will do this exercise of moving elements from one map to another map. If the list is big, it's better to use map if we are **deleting something from the list**.

In our next problem [Transfer List](https://www.greatfrontend.com/questions/user-interface/transfer-list/react?framework=react&tab=coding) we need to delete items from one list and add it to the other one.

**You see, the hint is,**, if we are going to **delete something from a list, then map is better than array** as map will have O(1) time. Array has O(N) time because, after deletion of elements in the array, the remaining elements need to readjust it's position which is O(N).

---

#### Maps are more efficient than Arrays

# Array vs Map Time Complexity Comparison

## Operations Comparison

| Operation               | Array          | Map      | Notes                                             |
| ----------------------- | -------------- | -------- | ------------------------------------------------- |
| **Access by index/key** | O(1)           | O(1) avg | Array: `arr[i]`, Map: `map.get(key)`              |
| **Search by value**     | O(n)           | O(n)     | Array: `arr.find()`, Map: iterate values          |
| **Search by key**       | O(n)           | O(1) avg | Array: `arr.findIndex()`, Map: `map.has(key)`     |
| **Insert at end**       | O(1) amortized | O(1) avg | Array: `arr.push()`, Map: `map.set()`             |
| **Insert at beginning** | O(n)           | O(1) avg | Array: `arr.unshift()`, Map: `map.set()`          |
| **Insert at middle**    | O(n)           | O(1) avg | Array: `arr.splice()`, Map: `map.set()`           |
| **Delete by index/key** | O(n)           | O(1) avg | Array: `arr.splice(i, 1)`, Map: `map.delete(key)` |
| **Delete at end**       | O(1)           | O(1) avg | Array: `arr.pop()`, Map: `map.delete()`           |
| **Update by index/key** | O(1)           | O(1) avg | Array: `arr[i] = val`, Map: `map.set(key, val)`   |
| **Check existence**     | O(n)           | O(1) avg | Array: `arr.includes()`, Map: `map.has(key)`      |
| **Get size/length**     | O(1)           | O(1)     | Array: `arr.length`, Map: `map.size`              |
| **Clear all**           | O(1)           | O(1)     | Array: `arr.length = 0`, Map: `map.clear()`       |
| **Iterate all**         | O(n)           | O(n)     | Both: `forEach`, `for...of`                       |

## Space Complexity

| Structure | Space | Notes                                             |
| --------- | ----- | ------------------------------------------------- |
| Array     | O(n)  | Contiguous memory, better cache locality          |
| Map       | O(n)  | Hash table + linked list, more overhead per entry |

## When to Use What

### Use **Array** when:

- ✅ Order matters and you access by numeric index
- ✅ You need array methods (`.map()`, `.filter()`, `.reduce()`)
- ✅ You're storing simple lists
- ✅ Memory efficiency is critical

### Use **Map** when:

- ✅ You need key-value lookups (not by index)
- ✅ Keys can be any type (objects, functions, etc.)
- ✅ Frequent additions/deletions by key
- ✅ You need to check if a key exists frequently
- ✅ Insertion order matters (Map preserves it)

## Example Use Cases

```typescript
// Array - good for ordered lists
const users = ["Alice", "Bob", "Charlie"];
users[0]; // O(1)
users.push("Dave"); // O(1)

// Map - good for lookups
const userStatus = new Map([
  ["Alice", true],
  ["Bob", false],
]);
userStatus.get("Alice"); // O(1)
userStatus.has("Bob"); // O(1)
```

## Key Insight

**The main difference:** Arrays are optimized for **numeric index access**, while Maps are optimized for **key-based lookups**. Use the right tool for your access pattern!

---

#### Problem

Say we have two lists

```ts
const leftItems = ["HTML", "JavaScript", "CSS", "TypeScript"] as const;

const rightItems = ["React", "Angular", "Vue", "Svelte"] as const;
```

1. Generate a map both left and right items where key is item and value is boolean (initially set to false)
2. Write a function to set a few items from one of the maps to true
3. Write a function to transfer items from one map to another map based on src and dest selected. Note that only items with value "true" must move to another list

### Things learnt

- The important point is, forEach signature will have (val, key). You can't use map or filter but can use forEach on Map.

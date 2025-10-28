## [Find Duplicates](https://www.greatfrontend.com/questions/algo/array-find-duplicate?practice=practice&tab=coding)

`Approx time - 10 minutes`

**3 approaches**

- Brute force
- Sort
- Set

## Things learnt

### 1. Right way to sort

```
    const sorted = [...numbers].sort()
```

`Sort` mutates the original array and sorts in-place. You can do the above so that it creates a new array before sorting which is the best practice.

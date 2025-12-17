# Data table III

`Approx time - 20m`

This is from the official solution but mostly similar to my solution `29-[ui]-data-table-III-generics`. The difference is mostly the `sort` functionality will come as prop itself where the comparator function is tied to the column itself - which is a good practice. So to demo that part I decided to make it a separate question - so we can practice the best practices in more isolated way.

The main thing is `renderCell` that needs practice here.

```ts
{
label: "City",
key: "city",
comparator: (a: House, b: House, sortDirection: SortDirection) =>
    sortDirection === "asc"
    ? a.city.localeCompare(b.city)
    : b.city.localeCompare(a.city),
renderCell: (row: House) => row.city,
},
```

We convert this

```ts
{
  pageData.map((row) => (
    <tr key={row.id}>
      {Object.entries(row).map(([key, val]) => (
        <td key={key}>{val}</td>
      ))}
    </tr>
  ));
}
```

to

```ts
{
  pageData.map((row) => (
    <tr key={row.id}>
      {columns.map((col) => (
        <td key={col.key as string}>{col.renderCell(row)}</td> // This one is important to practice
      ))}
    </tr>
  ));
}
```

Also practice `sortData` function

```ts
const sortData = <T>(
  data: T[],
  columns: Column<T>[],
  field: SortField<T> | null,
  direction: SortDirection
) => {
  const dataClone = data.slice();

  // if (field === null) return dataClone;

  // return dataClone.sort((a, b) => {
  //   const aVal = a[field];
  //   const bVal = b[field];

  //   if (typeof aVal === "string" && typeof bVal === "string")
  //     return direction === "asc"
  //       ? aVal.localeCompare(bVal)
  //       : bVal.localeCompare(aVal);

  //   if (typeof aVal === "number" && typeof bVal === "number")
  //     return direction === "asc" ? aVal - bVal : bVal - aVal;

  //   // default - not sorted
  //   return 0;
  // });

  const comparator = columns.find((col) => col.key === field)?.comparator;

  if (comparator == null) return dataClone;

  return dataClone.sort((a, b) => comparator(a, b, direction));
};
```

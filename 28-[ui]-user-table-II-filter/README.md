# Data table I

`Approx time - 30m`

This is a continuation of [Data Table I](https://github.com/sandeep194920/CodingPractice/tree/main/27-%5Bui%5D-data-table-I). So first complete that.

For sorting, refer sort question present in [GreatFrontend](https://www.greatfrontend.com/questions/user-interface/data-table-ii/react?framework=react&tab=coding).

This question is **NOT** exactly [Data Table IV](https://www.greatfrontend.com/questions/user-interface/data-table-iv?practice=practice&tab=coding). Data Table IV is to be done after completing [Data Table III](https://www.greatfrontend.com/questions/user-interface/data-table-iii/react?framework=react&tab=coding)

This filtering question is done on my own before attempting to generalize the user table using generics.

_This question involves filtering the data directly after completing [Data table](https://www.greatfrontend.com/questions/user-interface/data-table/react?framework=react&tab=coding)_

## Things learnt

### How to filter the data on multiple fields

.filter() is the method where, if returned `true` it _keeps_ the _current element_ in the array. If returned `false` it _removes_ the _current element_ in the array.

So we can do this for multiple level filtering (based on multiple conditions) in filters.

```ts
const getFilteredUsers = (filter: Filter, users: User[]) => {
  return users.filter((user) => {
    const matchesName =
      filter.name === "" ||
      user.name.toLowerCase().includes(filter.name.toLowerCase());

    const matchesOccupation =
      filter.occupation === "" ||
      user.occupation.toLowerCase().includes(filter.occupation.toLowerCase());

    const matchesMinAge = filter.age.min === "" || user.age >= +filter.age.min;
    const matchesMaxAge = filter.age.max === "" || user.age <= +filter.age.max;

    // We keep this user if all of these conditions match
    return matchesName && matchesOccupation && matchesMinAge && matchesMaxAge;
  });
};
```

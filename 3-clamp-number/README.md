## Lodash - Clamp number

2 solutions (cleanClamp is the most efficient and good to think in that terms)

`Approx time needed - 15 minutes (7 minutes for each solution)`

Implement a function clamp(number, lower, upper) to restrict a number within the inclusive lower and upper bounds.

```ts
Arguments
value (number): The number to clamp.
lower (number): The lower bound.
upper (number): The upper bound.
Returns
(number): Returns the clamped number.

Examples

// Within the bounds, return as-is.
clamp(3, 0, 5); // => 3

// Smaller than the lower bound.
clamp(-10, -3, 5); // => -3

// Bigger than the upper bound.
clamp(10, -5, 5); // => 5
```

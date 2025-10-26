## Check number isPrime

`Approx time - 10 minutes`

## Things learned

#### How to check if a number is prime or not?

`0` and `1` are not a prime numbers.

Check from 2 basically. A number is not prime if it is divisble by something other than itself and `1`.

Eg. 2, and 3 are prime numbers as they are not divisible by anything else except themselves (2 and 3).

4 is not a prime number because 4 is divisible by 2

**Simple checks**

_2 is prime or not?_

2 % 1 is 2 (not 0)
2 % 2 is 0 (but we are checking same number, so we can ignore this check)

2 is hence prime as we didn't get any 0 remainder

_3 is prime or not?_

3 % 1 is 3 (not 0)
3 % 2 is 1 (not 0)
3 % 3 is 0 (but we are checking same number, so we can ignore this check)

3 is hence prime as we didn't get any 0 remainder

_4 is prime or not?_

4 % 1 is 4 (not 0)
4 % 2 is 0 -> so it is not a prime

---

#### Can we optimize the prime number check?

Yes, we can check until square root of that number.

Optimized check - We can check till square root of the number. We can ignore all other numbers. Why?

Say we are checking if 36 is a prime number? The divisors for 36 will be

| i   | num / i | Pair    |
| --- | ------- | ------- |
| 1   | 36      | (1, 36) |
| 2   | 18      | (2, 18) |
| 3   | 12      | (3, 12) |
| 4   | 9       | (4, 9)  |
| 6   | 6       | (6, 6)  |
| 9   | 4       | (9, 4)  |
| 12  | 3       | (12, 3) |
| 18  | 2       | (18, 2) |
| 36  | 1       | (36, 1) |

Notice something?

Once you hit the square root (6), the pairs start repeating in reverse.

🔢 Example: num = 36

√36 = 6
You check: 2, 3, 4, 5, 6

👉 So, if num is not divisible by any number up to √num,
there’s no way it can be divisible by anything above √num either.

That’s why we can safely stop at Math.sqrt(num).

Once 6² = 36 → you’ve covered all possible factor pairs.

#### Can we optimize further based on even number fact? Yes

To further optimize, we can use the fact that:

- 2 is the only even prime number.
- Any even number greater than 2 is divisible by 2 and hence not prime.
  So we can skip all even numbers entirely.

```ts
export function isPrimeMoreOptimized(num: number): boolean {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false; // no even numbers except for 2 are prime, so we can early return them

  // Check for only odd numbers (i = i+2)
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true; // no divisors found, so prime number
}
```

🧩 Complexity

Time: O(√n / 2) ≈ O(√n)

Space: O(1)

---

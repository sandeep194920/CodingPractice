export function isPrime(num: number): boolean {
  for (let i = 2; i <= num; i++) {
    if (num % i === 0 && i !== num) return false; // Found a divisor → not prime
  }
  return true; // no divisors found, so prime number
}

console.log("2", isPrime(2)); // true
console.log("3", isPrime(3)); // true
console.log("4", isPrime(4)); // false

export function isPrimeOptimized(num: number): boolean {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false; // && i !== num can be removed because the check will only be upto the sqrt of num and never reach num
  }
  return true; // no divisors found, so prime number
}

/* Optimized check - We can check till square root of the number. We can ignore all other numbers. Why?

Say we are checking if 36 is a prime number? The divisors for 36 will be

| i  | num / i | Pair     |
|----|----------|----------|
| 1  | 36       | (1, 36)  |
| 2  | 18       | (2, 18)  |
| 3  | 12       | (3, 12)  |
| 4  | 9        | (4, 9)   |
| 6  | 6        | (6, 6)   |
| 9  | 4        | (9, 4)   |
| 12 | 3        | (12, 3)  |
| 18 | 2        | (18, 2)  |
| 36 | 1        | (36, 1)  |

Notice something?

Once you hit the square root (6), the pairs start repeating in reverse.

🔢 Example: num = 36

√36 = 6
You check: 2, 3, 4, 5, 6

👉 So, if num is not divisible by any number up to √num,
there’s no way it can be divisible by anything above √num either.

That’s why we can safely stop at Math.sqrt(num).

Once 6² = 36 → you’ve covered all possible factor pairs.

*/

/* 
To further optimize, we can use the fact that:
- 2 is the only even prime number.
- Any even number greater than 2 is divisible by 2 and hence not prime.
So we can skip all even numbers entirely.
*/

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

/* 

🧩 Complexity

Time: O(√n / 2) ≈ O(√n)

Space: O(1)

*/

export function gcd(a: number, b: number): number {
  // ensure inputs are non-negative
  const num1 = Math.abs(a);
  const num2 = Math.abs(b);

  let [bigger, smaller] = [Math.max(num1, num2), Math.min(num1, num2)];

  /* The idea is to get the remainder between bigger and smaller until the remainder becomes 0. Once it becomes 0, GCD will be stored in smaller number */

  let remainder = bigger % smaller; // 48 % 18 -> 12 - The new pair should become 18, 12

  while (remainder > 0) {
    bigger = smaller; // 12
    smaller = remainder; // 6
    remainder = bigger % smaller; // 0
  }

  return smaller;
}

/* 
Example 48, 18

Bigger = 48
Smaller = 18

remainder -> 48 % 18 = 12
new pair ->  18, 12

Bigger -> 18,
Smaller -> 12

remainder -> 18 % 12 = 6
new pair -> 12, 6

Bigger -> 12
Smaller -> 6

remainder -> 0

Once you get remainder 0, smaller one is the answer
*/

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

console.log(lcm(4, 6)); // 12

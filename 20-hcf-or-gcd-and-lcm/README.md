## Get the HCF or GCD of two numbers

`Approx time - 20 minutes`

#### Things learnt

###### What is GCD or HCF?

Highest common factor of 2 numbers.

Example - 48, 18

48 => 6 x 8
18 => 6 x 3

6 is common here, so it is the HCF.
I could have taken 3 as well like this

48 => 3 x 16
18 => 3 x 6

But then we need to check for highest number. 6 is the highest number that divides both 48, and 18. No other common factor higher than 6, so 6 is the HCF.

**Algorithm**

```ts
Example 48, 18

Bigger = 48
Smaller = 18

remainder -> 48 % 18 = 12
new pair -> 18, 12

Bigger -> 18,
Smaller -> 12

remainder -> 18 % 12 = 6
new pair -> 12, 6

Bigger -> 12
Smaller -> 6

remainder -> 0

Once you get remainder 0, smaller one is the answer
```

---

###### What is LCM?

**LCM (Least Common Multiple)** is: The smallest number that both numbers can divide exactly (no remainder).

Or in plain words: It’s the first number where their “times tables” meet.

```ts
2️⃣ Example

Take 4 and 6:

Multiples of 4 → 4, 8, 12, 16, 20, …
                        -
Multiples of 6 → 6, 12, 18, 24, …
                     -
First common multiple → 12 // times table meet at 12. I mean, 4 times something is 12, and 6 times something is 12. So that 12 is the first number that's common between both 4 and 6

✅ So LCM(4, 6) = 12

Another one: 3 and 5

Multiples of 3 → 3, 6, 9, 12, 15, 18…

Multiples of 5 → 5, 10, 15, 20…

First common multiple → 15

✅ LCM(3, 5) = 15
```

###### How LCM is related to GCD?

**Remember this formula**

```ts
LCM of a and b = Math.abs(a * b) / gcd(a,b)
```

So `lcm = product/gcd`

If any number is 0, then lcm will also be 0.

---

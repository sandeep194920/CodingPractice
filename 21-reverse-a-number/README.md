## Reverse a number

`Approx time - 15 minutes`

It's easy to first convert to string and then reverse, but this question focuses and teaches on doing it mathematically on number itself.

### Things learnt

#### Core concept of reversing a number

Say you have input = `123`. output should be `321` -> The idea is to make it 300 + 20 + 1 to get 321.

**To get 300**

number = 123
initialize reverse = 0

- get last digit by doing `123 % 10` -> 3

- Store this 3 in reversed, but make sure you store like this, `reversed = reversed * 10 + 3` -> 3 is stored because reversed was 0. Reverse becomes 3 now.

- divide `number / 10` and get floor value -> so you get `12`

Continue until number becomes 0...

number is `12` now

- get last digit by doing `12 % 10` -> 2

- store this 2 in reversed, `reversed = reversed * 10 + 2` -> reversed was 3, so it becomes (3 \* 10) + 2 = 32

- divide `number/10` and get floor value -> so you get `1`

Continue until number becomes 0...

- get last digit by doing `1 % 10` -> 1

- store this 1 in reversed, `reversed = reversed * 10 + 1` -> reversed was 32, so it becomes (32 \* 10) + 1 = 321

- divide `number/10` and get floor value of 0 and then stop

Stop since you got number to be 0. The reversed is now 321.

**Idea**

So the idea was - to reverse 123

- Get 3 (last digit) and then add it at beginning -> utlimately somehow this should become 300
- So remember this, multiply by certain number that it fits into it's place. I mean when it comes to first place it should become 3, when it comes to second place, it should become 30, when it comes to 3rd place it should become 300 and so on.

So the way to do that is by multiplying with 10. Since first time it should remain 3 itself, the hint is to multiply it with 0.

I know it's tough first time. BUT PRACTICE!!

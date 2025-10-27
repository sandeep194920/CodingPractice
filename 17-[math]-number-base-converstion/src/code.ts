/* Decimal to Binary

_Manual approach_

* Core concept: Simple tip is (D)ecimal to <something>  -> (D)ivide by <something>

Decimal to <anything> - Keep dividing decimal number by that <anything> until you get quotient 0. 
While you do this, collect all the remainders and keep adding it to the beginning.

Example 1 - 10 (decimal) to be converted to 1010 (binary)

binary means base - 2
So we divide the decimal by 2 everytime until that number becomes 0

Example 2 - 100 (decimal) to be converted to 144 (Octal)

octal means base - 8
So we divide the decimal by 8 everytime until that number becomes 0

That's the core idea


*Process*

100 (decimal) to be converted to 1010 (binary)

init a string = '' (binStr)

temp = 10 (copy decimal into this as temp must be divided everytime, so we dont change the given number)

10 % 2 -> 0 -> Add this to string at the beginning
binStr = '0'
10 / 2 -> 5 -> Floor value is 5 which is the new temp. Repeat this


5 % 2 -> 1 -> Add this to string at the beginning
binStr = '10'
5 / 2 -> Floor value 2 (the number is not yet 0 so repeat)

2 % 2 -> 0 -> Add this to start of str
binStr = '010'
2 / 2 -> 1 (the number is not yet 0 so repeat)

1 % 2 -> 1 -> Add this to str
binStr = '1010'
1 / 2 -> Floor is 0 (the number is 0 so stop)


Notice we need a while loop as it repeats
*/

export const decimalToBinary = (decimal: number): string => {
  let binStr = "";
  let temp = decimal;

  if (decimal === 0) return "0"; // known case that u can return early to save some time

  while (temp > 0) {
    const remainder = temp % 2;
    binStr = remainder + binStr; // adding at the beginning (type coersion happens as remainder is number that gets added to a string)
    temp = Math.floor(temp / 2); // dividing by 2 - at some point makes temp go less than 0 and exit the while loop
  }

  return binStr;
};

console.log("The decimal to binary of 10 is", decimalToBinary(10)); // 1010

/* ********************************************************************** */

/* Decimal to Octal 

Same as decimal to binary, but instead use 8 in place of 2
Simple tip is (D)ecimal to <something>  -> (D)ivide by <something>
*/

const decimalToOctal = (decimal: number): string => {
  let octalStr = "";
  let temp = decimal;

  if (decimal === 0) return "0"; // known case that u can return early to save some time

  while (temp > 0) {
    let remainder = temp % 8;
    octalStr = remainder + octalStr; // type coersion happens as remainder is number that gets added to a string
    temp = Math.floor(temp / 8);
  }

  return octalStr;
};

console.log("The decimal to octal of 100 is", decimalToOctal(100)); // 144

/* ********************************************************************** */

/* Binary to Decimal 

* Core Concept: Simple tip is <something> to Decimal  -> Power of base-number-given 

Convert 10 (decimal) to 1010 (binary)

We can use 8 4 2 1 to solve this

Why 8 4 2 1   -> So the idea is this,

Given base ^ 0
Given base ^ 1
Given base ^ 2 and so on

Given base here is (2) that we need to convert to (binary)
So it will be 2^4 + 2^3 + 2^2 + 2^1 + 2^0  and so on, which is 8 4 2 1

Similarly, you can also do for octal, I mean Decimal to Octal. The given base then is 8. So it will be

8^4 + 8^3 + 8^2 + 8^1 + 8^0 ...

*Process*

Binary -> 1010 converting this to decimal should give us 10

1    0     1     0
                
At each digit from right side, we need to do 

(0) * 2^index -> 0 * 2^0 = 0
1 * 2^1 -> 2
0 * 2^2 -> 0
1 * 2^3 -> 8

Adding all these things would give us decimal 10

So first make a temp variable to which keep adding them
Make the for loop from right side (last element should be processed first)

Catch: Make sure you do i >= 0 in for-loop and not i > 0 because you need to also compute for very first element (this is a common mistake I make)
*/

const binaryToDecimal = (binary: string): number => {
  let decimal = 0;

  for (let i = binary.length - 1; i >= 0; i--) {
    // i will be 3, 2, 1, 0
    const currentDecimal =
      parseInt(binary[i]) * Math.pow(2, binary.length - 1 - i); // 1 * (2 ^ 0) , 0 * (2 ^ 1) and so on
    decimal += currentDecimal;
  }

  return decimal;
};

console.log("The binary to decimal of 1010 is", binaryToDecimal("1010")); // 10

/* ********************************************************************** */

/* Octal to Decimal 

Similar to Binary to Decimal, but instead of 2^0, 2^1 and so on, we do 8^0, 8^1....
*/

const octalToDecimal = (octal: string): number => {
  let decimal = 0;

  for (let i = octal.length - 1; i >= 0; i--) {
    const currentDecimal =
      parseInt(octal[i]) * Math.pow(8, octal.length - 1 - i);
    decimal += currentDecimal;
  }

  return decimal;
};

console.log("The octal to decimal of 144 is", octalToDecimal("144")); // 100

/* 
If you want to do binaryToOctal or something where decimal isn't involved, then probably you can first convert to decimal and then to that base.
Here, binaryToOctal -> You can do binary to decimal and then decimal to octal.
*/

export function reverseNumber(num: number): number {
  if (num === 0) return 0;

  let temp = Math.abs(num);
  let reverse = 0;

  /* 
  Idea 
  - Get the last digit from the input
  - Put it into right place (start with 0s place and keep moving it to 10th's 100th's place and so on)
  - keep dividing the input so it becomes less than 0
  */

  while (temp > 0) {
    const lastDigit = temp % 10;
    reverse = reverse * 10 + lastDigit; // figure out this from the fact that, first time the number should become 3, next time 30, next time 300 and so on
    temp = Math.floor(temp / 10);
  }

  return num < 0 ? -reverse : reverse;
}

console.log(reverseNumber(123)); // 321

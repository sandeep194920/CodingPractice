## [Digital Clock](https://www.greatfrontend.com/questions/user-interface/digital-clock?practice=practice&tab=coding)

`Approx Time - 40min`

### Things Learnt

- Difference between [Stop Watch Delta concept](https://github.com/sandeep194920/CodingPractice/tree/main/45-%5Bui%5D-stop-watch#why-setinterval-cannot-be-used-alone-and-need-some-kind-of-variable-to-keep-track-of-past-time) vs this question. Same applies to Anaglog clock as well as both Digital and [Analog Clock](https://www.greatfrontend.com/questions/user-interface/analog-clock?practice=practice&tab=coding) questions are similar.

- Core logic of this problem with timer.

- How to plan CSS for the digits.

- How to get first and second numbers of a double digit number like 12 or 10 or 11 and so on?

- What semantic HTML to use for the time?

---

#### Core Logic of Clock (This applies to Digital and [Analog clock](https://www.greatfrontend.com/questions/user-interface/analog-clock?practice=practice&tab=coding)). How's it different from [StopWatch](https://github.com/sandeep194920/CodingPractice/tree/main/45-%5Bui%5D-stop-watch#why-setinterval-cannot-be-used-alone-and-need-some-kind-of-variable-to-keep-track-of-past-time) logic.

In **_StopWatch_**, we use Delta approach and do the following:

- The main thing we do there is to keep track of passed duration and the same is shown on the UI.
- We didn't rely only on timer here and do the below to update the `totalDuration` due to the fact that `setInterval` might not run accurately at every 1 millisecond.

```ts
// ❌ Naive approach (inaccurate)
setInterval(() => {
  setTotalDuration((duration) => duration + 1); // Just add 1ms each tick
}, 1);
```

- So what we actually did was to have the `totalDuration` as state, and update it with time difference (Delta) when the `setInterval` actually runs by taking help of actual current time, `Date.now()` and subtracting that with last tick time. The difference indicates the time difference (the time for which the `setInterval` didn't run) and then add that to the total duration compensating that missed `setInterval` runs.

- However, in **_Clock_** (Both Analog and Digital) that delta is not necessary as we take the state as the Date itself and not the passed duration, and then update that state with latest time. So even if `setInterval` is not run continuously, whenever it is run next time, the current time updates (state) with `new Date()` and we should be good.

---

#### Here's the **core logic** for clock without any UI.

If we do `new Date()`, this gives us `getHours()`, `getMinutes()`, `getSeconds()` which we can use to show on screen. But it doesn't update continuously. To do that we need `useEffect` and update the state (current date), every millisecond. Actually running every millisecond might not be required as it adds more load. We can do it every 100ms and should be fine. 1000ms (1s) is also fine which is the actual clock tick but since `setInterval` might delay (as discussed in stopwatch question), we can add a middle ground of 100ms.

```tsx
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 100); // we don't need to have it at 1. We can make it 100 or 1000 (1second) which makes it not delayed even if setInterval doesn't execute every millisecond

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <span> {date.getHours()}:</span>
      <span> {date.getMinutes()}: </span>
      <span> {date.getSeconds()}</span>
    </div>
  );
}

export default App;
```

We can even make it a separate hook for re-usability.

```ts
const useCurrentDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 100); // we don't need to have it at 1. We can make it 100 or 1000 (1second) which makes it not delayed even if setInterval doesn't execute every millisecond

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return date;
};
```

---

#### How to plan CSS for the digits?

The core concept here to remember is, `width`, `height` and `border` thats it! If you set these 3 on a div, look how it looks. You can see the demo here in [Code Sandbox](https://codesandbox.io/p/sandbox/digit-stfg29)

```html
<div className="digit" />
```

Try

```css
.digit {
  width: 2rem;
  height: 2rem;
  border: 40px solid black;
}
```

This would create a zero kind of thing. Now, if you set border to transparent instead of black and then do `border-top-color:black`, that gives you the top part which looks like it's clipped.

Similarly you do it for `border-right-color:black` as a separate style and apply where needed.

That's the core logic. Once you know that, you can use multiple styles like these to get each digit.

Another important point to remember is, for every digit, do top and bottom part. That looks perfect. Now go and Practice!

---

#### How to get first and second numbers of a double digit number like 12 or 10 or 11 and so on?

```ts
/* For a digit like 10, we need 

<Digit digit={1}/>
<Digit digit={0}/>

so we need to separate them out. 
This function helps us do that.

For first digit we do floor value of  /10
For last digit we do mod value of 10

*/
const getFirstAndLastDigits = (num: number) => {
  const first = Math.floor(num / 10);
  const second = num % 10;

  return [first, second];
};
```

---

#### What semantic HTML to use for the time?

Use `<time>` and it should have the current time in the format you want screen readers to read - for example `hh:mm:ss` format.

```ts
const currentTimeForAlly = `${hour}:${minutes}:${seconds}`;

<time className="clock" dateTime={currentTimeForAlly}>
```

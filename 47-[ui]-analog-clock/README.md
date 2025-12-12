## [Analog Clock](https://www.greatfrontend.com/questions/user-interface/analog-clock?practice=practice&tab=coding)

`Approx Time - 40min`

You can learn this one first or digital clock, but I suggest to first refer readme of DigitalClock as it was built first and I have some notes there.

### Things Learnt

- How to get angles from hours, minutes, seconds?
- Why do we add seconds percentage to minute calculation, and minutes percentage to hours calculation?
- How transform origin works?
- Why do we need to do `transform: rotate(180deg)` on the clock and rotate it upside down?

---

#### How to get angles from hours, minutes, seconds?

- Our idea is to convert, say 15 seconds to 90deg (imagine on clock where the hand will be for 15 - it will be near number 3 which is 90deg).

The way we can do that is,

- How many seconds, the seconds-hand can travel? -> 60 seconds

- We will divide current time, say 15 seconds by 60.

- Then multiply the whole thing by 360 - 360 is the degrees that the seconds can rotate

- So that will be `(15/60)*360` which is 90(deg). 360 is the full rotation angle here (circle)

---

#### Why do we add seconds percentage to minute calculation, and minutes percentage to hours calculation?

**Without secondsPercentage in the minute calculation:**

```ts
const minutePercentage = minutes / 60;
```

At 12:30:00 → minute hand points to 6
At 12:30:59 → minute hand still points to 6
At 12:31:00 → minute hand suddenly jumps to point slightly past 6

- This creates a "ticking" or "jumping" effect where the minute hand only updates once per minute.

**With secondsPercentage added:**

```ts
const minutePercentage = (minutes + secondsPercentage) / 60;
```

At 12:30:00 → minute hand points to 6
At 12:30:30 → minute hand points halfway between 6 and 7
At 12:30:59 → minute hand is almost at 7
At 12:31:00 → minute hand smoothly arrives at 7

This creates smooth, continuous rotation that mirrors how analog clocks actually work.

The same logic applies to hour hand calculation with minutePercentage - it ensures the hour hand gradually moves as minutes pass, rather than jumping from hour to hour.

---

### How transform origin works?

`tranform-origin: center-top` OR `top-center`

`transform-origin` is used to place the origin at fixed position so that rotate will not move the origin point.

---

### Why do we need to do `transform: rotate(180deg)` on the clock and rotate it upside down?

- When we add the hand initially it will point downwards. For the clock it should start upwards. So instead of adjusting each hand, we can just rotate the clock upside down and let our calculations be for the rotated upside.

- `transform : rotate(180deg)` so that hand won't point downwards

---

## [Stop Watch](https://www.greatfrontend.com/questions/user-interface/stopwatch?practice=practice&tab=coding)

`Approx time - 20m`

### Things learnt

- How to divide the time in milliseconds into hours, minutes, seconds and milliseconds
- Why `setInterval` cannot be used alone and need some kind of variable to keep track of past time.

- What should be the second param of `setInterval` here?

#### Why `setInterval` cannot be used alone and need some kind of variable to keep track of past time.

**Why We Use lastTickTiming + Delta**

The Problem with setInterval

```ts
// ❌ Naive approach (inaccurate)
setInterval(() => {
  setTotalDuration((duration) => duration + 1); // Just add 1ms each tick
}, 1);
```

Issues:

- Not guaranteed to run exactly every 1ms - JavaScript is single-threaded
- Browser throttling - tabs in background run intervals less frequently
- Event loop delays - heavy synchronous code blocks the interval
- Cumulative drift - small inaccuracies compound over time

**The solution with delta**

```ts
// ✅ Accurate approach (measures actual time)
setInterval(() => {
  const now = Date.now();
  const timePassed = now - lastTickTiming.current; // Actual elapsed time!
  setTotalDuration((duration) => duration + timePassed);
  lastTickTiming.current = now;
}, 1);
```

**Benefits:**

- Measures **real wall-clock time**, not "number of ticks"
- Automatically compensates for delays
- If interval runs late (e.g., after 5ms instead of 1ms), it adds 5ms to duration
- Stays accurate even with browser throttling

**_Example Scenario_**

Expected: tick every 1ms
Reality: tick at 1ms, 3ms (missed 2ms!), 4ms, 8ms (missed 4ms!)

Naive: 1 + 1 + 1 + 1 = 4ms total ❌
Delta: 1 + 2 + 1 + 4 = 8ms total ✅ (accurate!)

---

#### What should be the second param of `setInterval` here?

- It must be 1 - which signifies 1 millisecond. The interval must run every millisecond so don't put 1000. 1000 means the interval should run every second which is not the case (Even if we don't show ms on the screen).

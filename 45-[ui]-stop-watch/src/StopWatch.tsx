import { useRef, useState } from "react";

const MIN_IN_HOUR = 60;
const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;
const MS_IN_MIN = SEC_IN_MIN * MS_IN_SEC;
const MS_IN_HOUR = MIN_IN_HOUR * MS_IN_MIN;

const formatTime = (timeInMs: number) => {
  const parts = { hours: 0, minutes: 0, seconds: 0, ms: 0 };

  let remainingTime = timeInMs;

  parts.hours = Math.floor(remainingTime / MS_IN_HOUR);
  remainingTime %= MS_IN_HOUR;

  parts.minutes = Math.floor(remainingTime / MS_IN_MIN);
  remainingTime %= MS_IN_MIN;

  parts.seconds = Math.floor(remainingTime / MS_IN_SEC);
  remainingTime %= MS_IN_SEC;

  parts.ms = remainingTime;

  return parts;
};

const padStart = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

const StopWatch = () => {
  const [totalDuration, setTotalDuration] = useState(0);
  const lastTickTime = useRef<number | null>(null);

  /* The core Idea is
  we can't rely fully on setTimeout and update the totalDuration based on that as it might not be accurate. There might be a delay due to JS being 
  single threaded if any other sync calls are running.
  Instead, we will have a variable (ref) that helps us track last updated time, and we update totalDuration based on that delta.

    So the idea is,

    - as soon as startTimer function runs, we set lastTickTime ref to current time. 
    - then comes setInterval which might delay due to above told reason. Once The setInterval runs, 


  */

  const [timerId, setTimerId] = useState<number | null>(null);

  const isRunning = timerId != null;

  /* 
 hours, minutes, seconds, ms. All these must be generated from continuously changing milliseconds
 */

  const startTimer = () => {
    lastTickTime.current = Date.now();

    /* 

    Problem without lastTickTime

    totalDuration -> 6m (not 4m)

    10:00 -
    10:01 -
    10:02 -
    10:03 -
    -
    -
    10:04
    

    -------------


    Solution with lastTickTime

    totalDuration -> 6m 

    10:01 - lastTick is 10:00 -> totalDuration -> 1m  -> totalDuration + lastTick
    10:02 - lastTick is 10:01 -> totalDuration -> 2m   -> totalDuration + lastTick
    10:03 - lastTick is 10:02 -> totalDuration -> 1m   -> totalDuration + lastTick
    -
    -
    10:06 -> lastTick is 10:03 -> totalDuration -> 


    In simple words, say I update totalDuration passed every second. This is my thought process

    - I see the clock at 10:06 and ask myself - when was the last time I updated the lastTick? How do i know that, i take current time - lastTick.
    I then get the last updated lastTick. I add that to totalDuration

    - Say at 10:06 I see lastTick was at 10:03. I see the current time as 10:06, I get the difference of 3 minutes, I add that 3minutes to total duration
    

    */

    const timerId = setInterval(() => {
      const now = Date.now();

      // I'm seeing when was the last updated time. I mean how many milliseconds ago I actually updated the totalDuration
      const passedTime =
        now - (lastTickTime.current ? lastTickTime.current : 0);

      setTotalDuration((duration) => duration + passedTime);

      // I now update the lastTickTime saying, I updated the totalDuration at this time (10:06 in our example) which we use for next updation
      lastTickTime.current = now;
    }, 1);

    setTimerId(timerId);
  };

  const stopTimer = () => {
    // Note that you are not clearing totalDuration, so next time, when you start the timer, the totalDuration is the current one
    if (timerId !== null) {
      setTimerId(null);
      clearInterval(timerId);
    }
  };

  const resetTimer = () => {
    // here you want to clear totalDuration as you are completely resetting the time
    stopTimer();
    setTotalDuration(0);
  };

  const toggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const { hours, minutes, seconds, ms } = formatTime(totalDuration);

  return (
    <article className="container">
      <button onClick={toggleTimer} className="timer">
        <span className="timer__times">
          {hours > 0 && <span>{padStart(hours)}h</span>}
          {(hours > 0 || minutes > 0) && <span>{padStart(minutes)}m</span>}
          {<span>{padStart(seconds)}s</span>}
          {/* doing ms / 10 so it displays only two digits in milliseconds column */}
          {<span>{padStart(Math.floor(ms / 10))}ms</span>}
        </span>
      </button>

      <div className="controls">
        <button onClick={toggleTimer}>{isRunning ? "Stop" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </article>
  );
};

export default StopWatch;

/* 

Say we pass 3690000

Idea of converting 

hours -> 1   (3690,000 / 3600 * 1000) -> Floor value

Remaining time is  (3690,000 % 3600,000) which is 90,000

minutes ->  1 min (90,000 / 60 * 1000) ->  Floor value

Remaining time is  (90,000 % 60,000) which is 30,000

seconds -> 30 (30000/1000) -> Floor value

Remaining time is milliseconds

This is the whole idea if formatTime function



*/

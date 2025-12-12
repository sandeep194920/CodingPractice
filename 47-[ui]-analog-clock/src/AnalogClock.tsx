import { useEffect, useState, type CSSProperties, type FC } from "react";

interface HandProps {
  classNames: string;
  style?: CSSProperties;
}

const FULL_CLOCK_ROTATION = 360;

const clsx = (...classNames: Array<string>) => {
  return classNames.filter(Boolean).join(" ");
};

const Hand: FC<HandProps> = ({ classNames, style }) => {
  return <div style={style} className={clsx("hand", classNames)} />;
};

const rotateStyle = (angle: number) => {
  return { transform: `rotate(${angle}deg)` };
};

const AnalogClock = () => {
  const { hours, minutes, seconds } = useGetCurrentDate();

  /* Our idea is to convert, say 15 seconds (imagine on clock where the hand will be for 15 - it will be near number 3 which is 90deg) 
     to 90deg

     The way we can do that is, 
     - how many seconds, the seconds-hand can travel? -> 60 seconds
     - we will divide current time, say 15 seconds by 60.
     - Then multiply the whole thing by 360 - 360 is the degrees that the seconds can rotate
     - So that will be (15/60)*360 which is 90(deg)
  */
  const secondPercentage = seconds / 60;
  const secondsAngle = secondPercentage * FULL_CLOCK_ROTATION;

  /* 
  - Once we get that, we can do the same for minute calculation but remember we need to 
  keep incrementing minute on clock as the seconds move. If we avoid this then at every second from 0 to 59 minute will stay
  in same place and once second hits 60 the minute moves to next minute which might not be good UX. 
  So we will add secondsPercentage to calculation of minute


  */

  const minutePercentage = (minutes + secondPercentage) / 60; // 60 here as well because minute goes from 0 to 60 on clock similar to seconds

  const minutesAngle = minutePercentage * FULL_CLOCK_ROTATION;

  /* Similarly we do it for hour with adding minutes to it due to above mentioned reason. 
  Note that we divide it by 12 as hour hand on clock can go from 0 to 12 only
  */

  const hourPercentage = ((hours % 12 || 12) + minutePercentage) / 12; // (hours % 12 || 12) because we dont want hour to be 0. We alway want it atleast 12 and equal to or below 12 always
  const hourAngle = hourPercentage * FULL_CLOCK_ROTATION;

  const currentTime = `${hours % 12 || 12}:${minutes}:${seconds}`;

  return (
    <time dateTime={currentTime}>
      <div className="clock">
        <div className="clock-mid">
          <Hand classNames={clsx("hand-hour")} style={rotateStyle(hourAngle)} />
          <Hand
            classNames={clsx("hand-minute")}
            style={rotateStyle(minutesAngle)}
          />
          <Hand
            classNames={clsx("hand-second")}
            style={rotateStyle(secondsAngle)}
          />
        </div>
      </div>
    </time>
  );
};

export default AnalogClock;

const useGetCurrentDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

/* 
Things learnt

- How to get angles from hours, minutes, seconds?
- How transform origin works?
- Why do we add seconds percentage to minute calculation?

*/

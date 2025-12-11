import { useEffect, useState, type FC } from "react";
import Digit, { type DigitType } from "./Digit";
import Separator from "./Separator";

interface Props {
  format?: "12 hour" | "24 hour";
}

const DigitalClock: FC<Props> = ({ format = "12 hour" }) => {
  const { hours, minutes, seconds } = useCurrentDate();

  const hour = format === "12 hour" ? hours % 12 || 12 : hours; // we need 12 hour format

  const currentTimeForAlly = `${hour}:${minutes}:${seconds}`;

  return (
    <time className="clock" dateTime={currentTimeForAlly}>
      <Digit digit={getFirstAndLastDigits(hour)[0].toString() as DigitType} />
      <Digit digit={getFirstAndLastDigits(hour)[1].toString() as DigitType} />
      <Separator />
      <Digit
        digit={getFirstAndLastDigits(minutes)[0].toString() as DigitType}
      />
      <Digit
        digit={getFirstAndLastDigits(minutes)[1].toString() as DigitType}
      />
      <Separator />
      <Digit
        digit={getFirstAndLastDigits(seconds)[0].toString() as DigitType}
      />
      <Digit
        digit={getFirstAndLastDigits(seconds)[1].toString() as DigitType}
      />
    </time>
  );
};

export default DigitalClock;

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

  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

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

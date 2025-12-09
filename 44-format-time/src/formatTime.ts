type FormattedTime = {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
};

export function formatTime(timeInMs: number): FormattedTime {
  const parts = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  };

  let remainingTime = timeInMs;

  parts.hours = Math.floor(remainingTime / (60 * 60 * 1000)); // 60 seconds, 60 minutes, 1000 ms
  remainingTime = remainingTime % (60 * 60 * 1000); // hours is taken

  // remaining will be the milliseconds that needs to be formatted for minutes, seconds and ms

  parts.minutes = Math.floor(remainingTime / (60 * 1000));
  remainingTime %= 60 * 1000; // minutes is taken

  // remaining will be the milliseconds that needs to be formatted for seconds and ms

  parts.seconds = Math.floor(remainingTime / 1000);
  remainingTime %= 1000; // seconds are taken

  // remaining will be in milliseconds

  parts.ms = remainingTime;

  return parts;
}

const formattedTime = formatTime(3900000);

console.log({ formattedTime });

// 60*60*1000

const MAX = 100;
const MIN = 0;

const ProgressBar = ({ progress }: { progress: number }) => {
  // This functionality came in handy from 3-clamp-number question that I learnt

  // const upperLimit = Math.min(MAX, progress);
  // const progressWidth = Math.max(MIN, upperLimit);

  // OR

  // const lowerLimit = Math.max(MIN, progress);
  // const progressWidth = Math.min(MAX, lowerLimit);

  // OR oneliner

  // const progressWidth = Math.max(Math.min(progress, MAX), MIN);

  // OR oneliner

  const progressWidth = Math.min(MAX, Math.max(MIN, progress));

  /* 
  Ex.1 - 120%
  -- 120 progress

  -- 100 MAX   // Should yield 100

  -- 0 MIN


  ---------------

  Ex.2 - -20%
  -- 100 MAX

  -- 0 MIN  // Should yield 0

  --   -20% progress

  ---------------

  Ex.3 20%
  
  -- 100 MAX

  -- 20% progress // Should yield 20%

  -- 0 MIN  


  */

  return (
    <article className="bg-gray-200 w-100 h-7 rounded-md flex items-center">
      <div
        role="progressbar"
        aria-valuenow={progressWidth}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        style={{ width: `${progressWidth}%` }}
        className={[
          "bg-amber-600 h-7 rounded-md flex items-center justify-center overflow-hidden",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="text-white">{progressWidth}%</span>
      </div>
    </article>
  );
};

export default ProgressBar;

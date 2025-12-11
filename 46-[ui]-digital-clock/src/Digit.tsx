import type { FC } from "react";

export type DigitType =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

interface DigitProps {
  digit: DigitType;
}

type DigitsType = Record<
  DigitType,
  {
    top: string[];
    bottom: string[];
  }
>;

const ALL_SIDES = [
  "digit-square-top",
  "digit-square-right",
  "digit-square-bottom",
  "digit-square-left",
];

const digits: DigitsType = {
  "0": {
    top: ["digit-square-top", "digit-square-right", "digit-square-left"],
    bottom: ["digit-square-left", "digit-square-right", "digit-square-bottom"],
  },
  "1": {
    top: ["digit-square-right", "digit-1"],
    bottom: ["digit-square-right", "digit-1"],
  },
  "2": {
    top: ["digit-square-top", "digit-square-right", "digit-square-bottom"],
    bottom: ["digit-square-top", "digit-square-left", "digit-square-bottom"],
  },
  "3": {
    top: ["digit-square-top", "digit-square-right", "digit-square-bottom"],
    bottom: ["digit-square-top", "digit-square-right", "digit-square-bottom"],
  },
  "4": {
    top: ["digit-square-left", "digit-square-bottom", "digit-square-right"],
    bottom: ["digit-square-top", "digit-square-right"],
  },
  "5": {
    top: ["digit-square-top", "digit-square-left", "digit-square-bottom"],
    bottom: ["digit-square-top", "digit-square-right", "digit-square-bottom"],
  },
  "6": {
    top: ["digit-square-top", "digit-square-left", "digit-square-bottom"],
    bottom: ALL_SIDES,
  },
  "7": {
    top: ["digit-square-top", "digit-square-right"],
    bottom: ["digit-square-right"],
  },
  "8": {
    top: ALL_SIDES,
    bottom: ALL_SIDES,
  },
  "9": {
    top: ALL_SIDES,
    bottom: ["digit-square-top", "digit-square-right", "digit-square-bottom"],
  },
};

const Digit: FC<DigitProps> = ({ digit }) => {
  return (
    <>
      {/* 0 */}
      <div>
        <div
          className={clsx(
            "digit-square",
            "digit-square-top-half",
            ...digits[digit].top
          )}
        />
        <div
          className={clsx(
            "digit-square",
            "digit-square-bottom-half",
            ...digits[digit].bottom
          )}
        />
      </div>
    </>
  );
};

export default Digit;

const clsx = (...classNames: string[]) => {
  return classNames.filter(Boolean).join(" ");
};

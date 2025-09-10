export default function clamp(value: number, lower: number, upper: number) {
  return Math.min(upper, Math.max(lower, value));

  //   OR

  //   return Math.max(lower, Math.min(upper, value));
}

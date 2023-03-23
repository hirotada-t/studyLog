export const secFromMS = (ms: number): string => {
  let sec = Math.floor(ms / 1000);
  if (sec > 60) sec %= 60;
  if (sec < 10) return '0' + sec;
  return '' + sec;
};
export const minFromMS = (ms: number): string => {
  let min = Math.floor(ms / (60 * 1000));
  if (min > 60) min %= 60;
  if (min < 10) return '0' + min;
  return '' + min;
};
export const hourFromMS = (ms: number): string => {
  const hour = Math.floor(ms / (60 * 60 * 1000));
  return '' + hour;
};
export const timeCounterFromMS = (ms: number): string => {
  return hourFromMS(ms) + ':' + minFromMS(ms) + ':' + secFromMS(ms);
};
export const timeFromMS = (ms: number): string => {
  return hourFromMS(ms) + ':' + minFromMS(ms);
};

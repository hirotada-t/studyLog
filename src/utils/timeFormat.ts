import { date } from 'quasar';

export const secFromMS = (ms: number): string => {
  const sec = Math.floor(ms / 1000) % 60;
  return sec < 10 ? '0' + sec : '' + sec;
};
export const minFromMS = (ms: number): string => {
  const min = Math.floor(ms / (60 * 1000)) % 60;
  return min < 10 ? '0' + min : '' + min;
};
export const hourFromMS = (ms: number): string => {
  const hour = Math.floor(ms / (60 * 60 * 1000)) % 24;
  return '' + hour;
};
export const timeCounterFromMS = (ms: number): string => {
  return hourFromMS(ms) + ':' + minFromMS(ms) + ':' + secFromMS(ms);
};
export const timeFromMS = (ms: number): string => {
  return hourFromMS(ms) + ':' + minFromMS(ms);
};
export const MSFromTime = (time: string): number => {
  const ms = new Date(time).getTime();
  console.log('milli - ' + ms);
  console.log(date.formatDate(ms, 'YYYY/MM/DD - HH:mm'));
  return Date.now();
};

export class Func {
  public static secFromMS = (ms: number): string => {
    const sec = Math.floor(ms / 1000) % 60;
    return sec < 10 ? '0' + sec : '' + sec;
  };
  public static minFromMS = (ms: number): string => {
    const min = Math.floor(ms / (60 * 1000)) % 60;
    return min < 10 ? '0' + min : '' + min;
  };
  public static hourFromMS = (ms: number): string => {
    const hour = Math.floor(ms / (60 * 60 * 1000));
    return '' + hour;
  };
  public static timeCounterFromMS = (ms: number): string => {
    return Func.hourFromMS(ms) + ':' + Func.minFromMS(ms) + ':' + Func.secFromMS(ms);
  };
  public static timeFromMS = (ms: number): string => {
    return Func.hourFromMS(ms) + ':' + Func.minFromMS(ms);
  };
}

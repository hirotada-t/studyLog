import { LogItems } from './util.interface';

export type State = {
  weeklyLogList: Map<string, LogItems[] | null>;
  today: string;
  dayOfWeek: string;
  weeklyTarget: number;
};

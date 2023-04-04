import { LogItems } from './util.interface';

export type LogState = {
  weeklyLogList: Map<string, LogItems[] | null>;
  today: string;
  dayOfWeek: string;
  weeklyTarget: number;
};

export type HomeState = {
  selectedValue: string[];
  selectedGoal: string[];
  weeklyTaskList: { [key: string]: boolean };
};

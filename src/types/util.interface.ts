export type DailyLog = {
  startTime: number;
  studyTime: number;
  title: string;
  category: string | null;
  tags: string[];
  focusLevel: number;
  studyContents: string;
};

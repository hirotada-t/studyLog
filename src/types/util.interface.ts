export type DailyLog = {
  startTime: number;
  closeTime: number;
  title: string;
  category: string | null;
  tags: string[];
  focusLevel: number;
  studyContents: string;
};

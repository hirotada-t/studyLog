export type DailyLog = {
  startMS: number;
  studyTime: number;
  title: string;
  category: string | null;
  tagList: string[];
  focusLevel: number;
  studyContents: string;
};

export type DailyLog = {
  startMS: number;
  studyMS: number;
  title: string;
  category: string | null;
  tagList: string[];
  focusLevel: number;
  studyContents: string;
};

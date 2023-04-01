import { date } from 'quasar';
import { LogItems } from 'src/types/util.interface';

export const createInitArr = () => {
  const dateArr = createDateArr();
  const mapArr = [];
  for (let i = 0; i < dateArr.length; i++) {
    const logArr: [string, LogItems[] | null] = [dateArr[i], null];
    mapArr.push(logArr);
  }
  return mapArr;
};

const createDateArr = (): string[] => {
  const today = new Date();
  const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  const dateArr: string[] = [];
  for (let i = 0; i < 7; i++) {
    const timeStamp = new Date(lastSunday.getTime() + i * 24 * 60 * 60 * 1000);
    const ymd = date.formatDate(timeStamp, 'YYYY/MM/DD');
    dateArr.push(ymd);
  }
  return dateArr;
};

export const insertToEmptyTitle = (
  title: string,
  startMS: number,
  studyMS: number
): string => {
  if (title === '' || title === null) {
    title = date.formatDate(startMS, 'MM/DD HH:mm ~ ');
    title += date.formatDate(startMS + studyMS, 'HH:mm');
  }
  return title;
};

import { defineStore } from 'pinia';
import { date } from 'quasar';
import { DailyLog } from 'src/types/util.interface';

const timeStamp = Date.now();

type State = {
  weeklyLogList: {
    [date: string]: DailyLog[];
  };
  today: string;
  weeklyTarget: number;
};

export const useLogStore = defineStore('log', {
  state: (): State => ({
    weeklyLogList: {
      '03/24': [
        {
          startMS: 0,
          studyMS: 3600000,
          title: '1111',
          category: '',
          tagList: [],
          focusLevel: 2,
          studyContents: '',
        },
        {
          startMS: 100,
          studyMS: 3600000,
          title: '2222',
          category: '',
          tagList: [],
          focusLevel: 2,
          studyContents: '',
        },
      ],
    },
    today: date.formatDate(timeStamp, 'MM/DD'),
    weeklyTarget: 3600000 * 4,
  }),
  getters: {
    get: () => {
      console.log();
    },
    getAdayTotalHours: (state) => {
      return (date: string): number => {
        const arr = state.weeklyLogList[date];
        let res = 0;
        for (let i = 0; i < arr.length; i++) {
          res += arr[i].studyMS;
        }
        return res;
      };
    },
    getDailyHours: (state) => {
      const hours = 0;
      const target = state.weeklyLogList[state.today];
      for (let i = 0; i < target.length; i++) {
        console.log();
      }
      return hours;
    },
  },
  actions: {
    setLog(value: DailyLog) {
      console.log(value);
      if (value.title === '') {
        value.title = date.formatDate(value.startMS, 'MM/DD HH:mm ~');
      }
      const key = this.today;
      if (!this.weeklyLogList[key]) this.weeklyLogList[key] = [];
      this.weeklyLogList[key].push(value);
    },
  },
});

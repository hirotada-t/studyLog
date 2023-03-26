import { defineStore } from 'pinia';
import { date } from 'quasar';
import { DailyLog } from 'src/types/util.interface';

const timeStamp = Date.now();

type State = {
  weeklyLogList: Map<string, DailyLog[]>;
  today: string;
  dayOfWeek: string;
  weeklyTarget: number;
};

export const useLogStore = defineStore('log', {
  state: (): State => ({
    weeklyLogList: new Map([
      [
        '2023/03/26',
        [
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
      ],
      [
        '2023/03/27',
        [
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
      ],
      [
        '2023/03/28',
        [
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
      ],
      [
        '2023/03/29',
        [
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
          {
            startMS: 100,
            studyMS: 3600000,
            title: '2222',
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
      ],
      [
        '2023/03/30',
        [
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
      ],
      [
        '2023/03/31',
        [
          {
            startMS: 0,
            studyMS: 3600000,
            title: '1111',
            category: '',
            tagList: [],
            focusLevel: 2,
            studyContents: '',
          },
        ],
      ],
      [
        '2023/04/01',
        [
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
      ],
    ]),
    today: date.formatDate(timeStamp, 'YYYY/MM/DD'),
    dayOfWeek: date.formatDate(timeStamp, 'dd'),
    weeklyTarget: 3600000 * 4,
  }),
  getters: {
    get: () => {
      console.log();
    },
    getRecordOfWeek: () => {
      console.log();
    },
    getAdayTotalHours: (state) => {
      return (date: string): number => {
        const arr = state.weeklyLogList.get(date);
        let res = 0;
        if (!arr) return res;
        for (let i = 0; i < arr.length; i++) {
          res += arr[i].studyMS;
        }
        return res;
      };
    },
  },
  actions: {
    setLog(value: DailyLog) {
      console.log(value);
      if (value.title === '') {
        value.title = date.formatDate(value.startMS, 'MM/DD HH:mm ~');
      }

      const log = this.weeklyLogList.get(this.today);
      if (this.dayOfWeek === 'Su' && !log) {
        this.weeklyLogList.clear();
      }
      if (!log) {
        this.weeklyLogList.set(this.today, []);
      }

      if (log) log.push(value);
    },
  },
});

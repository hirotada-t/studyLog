import { defineStore } from 'pinia';
import { date } from 'quasar';
import { DailyLog } from 'src/types/util.interface';

const timeStamp = Date.now();

type State = {
  logList: {
    [date: string]: DailyLog[];
  };
  today: string;
};

export const useLogStore = defineStore('log', {
  state: (): State => ({
    logList: {},
    today: date.formatDate(timeStamp, 'MM/DD'),
  }),
  getters: {
    getLog: (state) => state.logList,
    getDailyHours: (state) => {
      const hours = 0;
      const target = state.logList[state.today];
      for (let i = 0; i < target.length; i++) {}
      return hours;
    },
  },
  actions: {
    setLog(value: DailyLog) {
      console.log(value);
      console.log(this.getLog);
      if (value.title === '')
        value.title = date.formatDate(value.startTime, 'MM/DD HH:mm ~');
      const key = this.today;
      if (!this.logList[key]) this.logList[key] = [];
      this.logList[key].push(value);
    },
  },
});

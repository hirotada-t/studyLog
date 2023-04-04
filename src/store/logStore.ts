import { defineStore } from 'pinia';
import { date } from 'quasar';
import { LogState } from 'src/types/store.interface';
import { LogItems } from 'src/types/util.interface';
import { createInitArr, insertToEmptyTitle } from 'src/utils/storeFunc';

const timeStamp = Date.now();

export const useLogStore = defineStore('log', {
  state: (): LogState => ({
    weeklyLogList: new Map(),
    today: date.formatDate(timeStamp, 'YYYY/MM/DD'),
    dayOfWeek: date.formatDate(timeStamp, 'dd'),
    weeklyTarget: 3600000 * 4,
  }),
  getters: {
    get: () => {
      console.log();
    },
    getDailyTotalHoursMS: (state) => {
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
    initLog() {
      const arr = createInitArr();
      const map = new Map(arr);
      this.weeklyLogList = map;
    },
    setLog(ymd: string, value: LogItems) {
      value.title = insertToEmptyTitle(
        value.title,
        value.startMS,
        value.studyMS
      );
      // 毎週毎にリストを空にして新規作成する必要があるかもしれない
      // if (this.dayOfWeek === 'Su' && !log) {
      //   this.weeklyLogList.clear();
      // }
      if (!this.weeklyLogList.get(ymd)) {
        this.weeklyLogList.set(ymd, []);
      }

      const log = this.weeklyLogList.get(ymd);
      if (log) {
        log.push(value);
      }
    },
    updateLog(ymd: string, index: number, value: LogItems) {
      value.title = insertToEmptyTitle(
        value.title,
        value.startMS,
        value.studyMS
      );
      const log = this.weeklyLogList.get(ymd);
      if (log) {
        log[index] = value;
      }
    },
    deleteLog(ymd: string, index: number) {
      const log = this.weeklyLogList.get(ymd);
      if (log) {
        log.splice(index, 1);
      }
    },
  },
});

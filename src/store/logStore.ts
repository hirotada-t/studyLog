import { defineStore } from 'pinia';
import { Log } from 'src/types/util.interface';

type State = {
  log: Log[];
};

export const useLogStore = defineStore('counter', {
  state: (): State => ({
    log: [],
  }),
  getters: {},
  actions: {
    setLog(value: Log) {
      this.log.push(value);
    },
  },
});

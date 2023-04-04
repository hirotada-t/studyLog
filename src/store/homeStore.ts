import { defineStore } from 'pinia';
import { HomeState } from 'src/types/store.interface';

export const useHomeStore = defineStore('home', {
  state: (): HomeState => ({
    selectedValue: [],
    selectedGoal: [],
    weeklyTaskList: {},
  }),
  getters: {
    get: () => {
      console.log();
    },
  },
  actions: {
    setLog() {
      console.log();
    },
  },
});

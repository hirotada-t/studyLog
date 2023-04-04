import { defineStore } from 'pinia';
import { HomeState } from 'src/types/store.interface';

export const useHomeStore = defineStore('home', {
  state: (): HomeState => ({
    MyValue: [],
    MyGoal: [],
    weeklyTaskList: {},
  }),
  getters: {
    get: () => {
      console.log();
    },
  },
  actions: {
    setValue(index: number | null, img: string) {
      if (index) {
        this.MyValue[index] = img;
      } else {
        this.MyValue.push(img);
      }
    },
    delValue(index: number) {
      this.MyValue.splice(index, 1);
    },
    setGoal(data: string) {
      this.MyGoal.push(data);
    },
    delGoal(index: number) {
      this.MyGoal.splice(index, 1);
    },
    setTask(data: string) {
      this.weeklyTaskList[data] = false;
    },
    delTask(key: string) {
      delete this.weeklyTaskList[key];
    },
  },
});

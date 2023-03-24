<template>
  <q-page class="row justify-evenly">
    <div class="fixed text-center q-mt-lg text-h5">
      <TimerCount :time="time" :formattedTime="formattedTime" />
    </div>
    <div style="margin-top: 170px">comment</div>
    <q-btn
      round
      @click="stopTimer"
      class="absolute stop-btn bg-dark"
      style="z-index: 10"
    >
      <q-icon size="120px" color="positive" name="fa-regular fa-circle-pause" />
    </q-btn>
    <q-dialog
      v-model="dialog"
      persistent
      full-width
      class="result-window q-pt-lg"
    >
      <div
        class="absolute z-top q-mt-md text-center text-h5 top-0"
        style="height: 140px"
      >
        <TimerCount :time="time" :formattedTime="formattedTime" />
      </div>
      <WorkContent :url="shareUrl" />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { onBeforeRouteLeave } from 'vue-router';
import { DailyLog } from 'src/types/util.interface';
import { ref, provide } from 'vue';
import { timeCounterFromMS } from 'src/utils/func';
import TimerCount from 'src/components/parts/TimerCount.vue';
import WorkContent from 'src/components/WorkContent.vue';

const shareUrl = ref<string>('');
const dialog = ref<boolean>(false);
const timerId = ref<number>();
const startTime = ref<number>(Date.now());
const stopTime = ref<number>(0);
const formattedTime: string = date.formatDate(startTime.value, 'HH:mm');
const diff = ref<number>(0);
const time = ref<string>('0:00:00');
const logOfWork = ref<DailyLog>({
  startMS: Date.now(),
  studyMS: 0,
  title: '',
  category: '',
  tagList: [],
  focusLevel: 3,
  studyContents: '',
});

const displayTimer = () => {
  timerId.value = window.setTimeout(() => {
    diff.value = Date.now() - startTime.value + stopTime.value;

    time.value = timeCounterFromMS(diff.value);
    shareUrl.value =
      'http://twitter.com/share?url=https://youtu.be/qYnA9wWFHLI&text=' +
      time.value +
      '時間勉強しました&hashtags=StudyLog,毎日コツコツ';
    displayTimer();
  }, 250);
};
const startTimer = () => {
  dialog.value = false;
  startTime.value = Date.now();
  displayTimer();
};
const pauseTimer = () => {
  clearInterval(timerId.value);
  stopTime.value += Date.now() - startTime.value;
};
const stopTimer = () => {
  pauseTimer();
  dialog.value = true;
  logOfWork.value.studyMS = diff.value;
};
const restartTimer = () => {
  dialog.value = false;
  startTimer();
};

provide('restart-timer', restartTimer);
startTimer();

onBeforeRouteLeave((to, from) => {
  if (!dialog.value && from.name === 'Timer') {
    pauseTimer();
    const answer = window.confirm(
      'Do you really want to leave? The timer is cancelled.'
    );
    if (!answer) {
      startTimer();
      return false;
    }
  }
});
</script>

<style lang="scss">
.result-window .q-dialog__inner {
  align-items: start !important;
}
</style>

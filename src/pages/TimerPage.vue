<template>
  <q-page class="row justify-evenly">
    <div class="fixed text-center q-mt-lg text-h5">
      <p
        class="text-h6 q-mb-none row items-center justify-center q-gutter-x-xs"
      >
        Start : {{ store.today }} {{ startTime }}
      </p>
      <div class="text-h1">
        {{ time }}
      </div>
    </div>
    <div style="margin-top: 170px">comment</div>
    <q-btn
      round
      @click="
        pauseTimer();
        dialog = true;
      "
      class="absolute stop-btn bg-dark"
      style="z-index: 10"
    >
      <q-icon size="120px" color="positive" name="fa-regular fa-circle-stop" />
    </q-btn>
    <q-dialog
      v-model="dialog"
      persistent
      full-width
      class="result-window q-pt-lg"
    >
      <WorkContent :pageDate="store.today" :startMS="start" :timeMS="diffMS" :timerHeight="160" />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { onBeforeRouteLeave } from 'vue-router';
import { ref, provide } from 'vue';
import WorkContent from 'src/components/WorkContent.vue';
import { useLogStore } from 'src/store/logStore';
import { timeCounterFromMS } from 'src/utils/timeFormat';

const store = useLogStore();
const dialog = ref<boolean>(false);
const timerId = ref<number>(0);
const startMS = ref<number>(Date.now());
const start = startMS.value;
const stopMS = ref<number>(0);
const diffMS = ref<number>(0);
const time = ref<string>('0:00:00');
const startTime: string = date.formatDate(startMS.value, 'HH:mm');

const displayTimer = () => {
  timerId.value = window.setTimeout(() => {
    diffMS.value = Date.now() - startMS.value + stopMS.value;

    time.value = timeCounterFromMS(diffMS.value);
    displayTimer();
  }, 250);
};
const startTimer = () => {
  startMS.value = Date.now();
  dialog.value = false;
  displayTimer();
};
const pauseTimer = () => {
  clearTimeout(timerId.value);
  stopMS.value += Date.now() - startMS.value;
};
const resetTimer = () => {
  dialog.value = false;
  location.reload();
};

provide('reset-timer', resetTimer);
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

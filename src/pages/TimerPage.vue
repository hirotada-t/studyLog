<template>
  <q-page class="row justify-evenly">
    <div class="fixed fowardComtent text-center q-mt-lg text-h5">
      2023/03/18 15:08:50
      <span style="font-size: 90px; line-height: 1.2em">{{ time }}</span>
    </div>
    <div style="margin-top: 170px">comment</div>
    <!-- <q-btn v-if="!timerOn" round @click="startTimer" class="bg-dark">
      <q-icon size="120px" color="accent" name="fa-regular fa-circle-play" />
    </q-btn>
    <q-btn v-if="timerOn" round @click="pauseTimer" class="bg-dark">
      <q-icon size="120px" color="positive" name="fa-regular fa-circle-pause" />
    </q-btn> -->
    <q-btn
      round
      @click="stopTimer"
      class="absolute stop-btn bg-dark"
      style="z-index: 10"
    >
      <q-icon size="120px" color="positive" name="fa-regular fa-circle-stop" />
    </q-btn>
    <q-dialog v-model="dialog">
      <q-card class="bg-dark" bordered>
        <q-card-actions align="center">
          <q-btn
            target="_blank"
            :href="shareUrl"
            flat
            label="share"
            color="primary"
          />
          <q-btn
            to="/"
            flat
            label="OK"
            color="dark"
            class="bg-primary text-bold"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
// import { useLogStore } from 'src/store/logStore';
import { ref } from 'vue';

// const store = useLogStore();
const currentTimer = ref<number>(0);
const timerOn = ref<boolean>(true);
const dialog = ref<boolean>(false);
const timerId = ref<NodeJS.Timeout>();
const hour = ref<number>(0);
const min = ref<string>('00');
const sec = ref<string>('00');
const time = ref<string>('0:00:00');
const shareUrl = ref<string>('');

const startTimer = () => {
  timerOn.value = true;
  timerId.value = setInterval(() => {
    const m = Math.floor(currentTimer.value / 60);
    const s = Math.floor(currentTimer.value % 60);
    hour.value = Math.floor(currentTimer.value / 3600);
    min.value = m < 10 ? '0' + m : '' + m;
    sec.value = s < 10 ? '0' + s : '' + s;
    time.value = hour.value + ':' + min.value + ':' + sec.value;
    shareUrl.value =
      'http://twitter.com/share?url=https://youtu.be/qYnA9wWFHLI&text=' +
      time.value +
      '時間勉強しました&hashtags=StudyLog,毎日コツコツ';

    currentTimer.value++;
  }, 1000);
};
const pauseTimer = () => {
  timerOn.value = false;
  dialog.value = true;
  clearInterval(timerId.value);
};
const stopTimer = () => {
  pauseTimer();
  timerOn.value = true;
};

startTimer();
</script>

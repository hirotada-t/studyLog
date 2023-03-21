<template>
  <q-page class="q-py-md">
    <h2 class="q-mt-none text-h5">{{ formattedDate }} Summary</h2>
    <q-separator dark color="grey-8" />
    <div class="row q-py-md items-center">
      {{ store.logList[store.today] }}
      <div class="col-6 flex justify-center">
        <q-knob
          show-value
          :max="rateOfAchievement < 100 ? 100 : rateOfAchievement"
          v-model="rateOfAchievement"
          size="140px"
          font-size="40px"
          :thickness="0.22"
          color="primary"
          track-color="grey-9"
        >
          {{ rateOfAchievement }}%
        </q-knob>
      </div>
      <div class="col-4 text-center">
        <h3 class="q-my-none text-h6">04:37</h3>
        <p>Daily hours</p>
        <h3 class="q-my-none text-h6">04:37</h3>
        <p class="q-my-none">Weekly hours</p>
      </div>
      <div class="col-2">
        <q-btn icon="ios_share" flat round target="_blank" :href="shareUrl" />
      </div>
    </div>
    <q-separator dark color="grey-8" />
  </q-page>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { useLogStore } from 'src/store/logStore';
import { ref, onMounted } from 'vue';

const timeStamp = Date.now();
const formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD');
const shareUrl =
  'http://twitter.com/share?url=https://youtu.be/qYnA9wWFHLI&text=' +
  '11:11' +
  '時間勉強しました&hashtags=StudyLog,毎日コツコツ';
const store = useLogStore();
const rateOfAchievement = ref<number>(0);

onMounted(() => {
  rateOfAchievement.value = 80;
});
</script>

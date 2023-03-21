<template>
  <q-page class="q-py-md">
    <h2 class="q-mt-none text-h5">{{ formattedDate }} Summary</h2>
    <q-separator dark color="grey-6" />
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
        <h3 class="q-my-none text-h5">04:37</h3>
        <p>Daily hours</p>
        <h3 class="q-my-none text-h5">04:37</h3>
        <p class="q-my-none">Weekly hours</p>
      </div>
      <div class="col-2">
        <q-btn icon="ios_share" flat round target="_blank" :href="shareUrl" />
      </div>
    </div>
    <q-separator dark color="grey-6" />
    <q-list dark separator>
      <q-item
        v-for="item of store.logList[store.today]"
        :key="item.startTime"
        clickable
        v-rippl
      >
        <q-item-section>{{ item.title }}</q-item-section>
        <q-item-section avatar>
          <q-icon name="arrow_forward_ios"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-rippl>
        <q-item-section class="text-center text-h6 text-weight-light">
          <q-item-label>
            Manually Add
            <q-icon name="add" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator dark color="grey-6" />
    <div class="q-py-sm">
      <div class="flex justify-center">
        <q-btn
          round
          flat
          v-for="(d, index) of days"
          :key="index"
          style="padding: 0 .5vw; width: 12%;"
          padding="none"
        >
          <q-knob
            show-value
            :max="rateOfAchievement < 100 ? 100 : rateOfAchievement"
            v-model="rateOfAchievement"
            size="10vw"
            font-size="12px"
            :thickness="0.17"
            color="primary"
            track-color="grey-9"
            class="text-weight-light"
          >
            {{ d }}
          </q-knob>
        </q-btn>
        <q-btn
          round
          style="padding: 0 0.5vw"
          size="15px"
          icon="mdi-chart-box-plus-outline"
          color="grey-10"
        />
      </div>
    </div>
    <q-separator dark color="grey-6" />
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

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const store = useLogStore();

const rateOfAchievement = ref<number>(0);

onMounted(() => {
  rateOfAchievement.value = 80;
});
</script>

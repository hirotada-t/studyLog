<template>
  <q-page class="q-py-md">
    <div class="" ref="dailyData">
      <h2 class="q-mt-none text-h5">{{ formattedDate }} Summary</h2>
      <q-separator dark color="grey-6" />
      <div class="row q-py-md items-center">
        <div class="col-6 flex justify-center">
          <q-knob
            readonly
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
          <h3 class="q-my-none text-h5">{{ timeFromMS(dailyTotalHoursMS) }}</h3>
          <p>Daily total</p>
          <h3 class="q-my-none text-h5">
            {{ timeFromMS(store.weeklyTarget) }}
          </h3>
          <p class="q-my-none">Weekly ave.</p>
        </div>
        <div class="col-2">
          <q-btn icon="ios_share" flat round target="_blank" :href="shareUrl" />
        </div>
      </div>
    </div>
    <q-separator dark color="grey-6" />
    <div class="" ref="workList">
      <q-list dark separator>
        <q-item
          v-for="item of store.weeklyLogList[store.today]"
          :key="item.startMS"
          clickable
        >
          <q-item-section>{{ item.title }}</q-item-section>
          <q-item-section avatar>
            <q-icon name="arrow_forward_ios"></q-icon>
          </q-item-section>
        </q-item>
        <q-item clickable @click="store.setLog">
          <q-item-section class="text-center text-h6 text-weight-light">
            <q-item-label>
              Manually Add
              <q-icon name="add" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="" ref="weeklyData">
      <q-separator dark color="grey-6" />
      <div class="q-py-sm">
        <div class="flex justify-center">
          <q-btn
            round
            flat
            v-for="(d, index) of days"
            :key="index"
            style="padding: 0 0.5vw; width: 12%"
            padding="none"
          >
            <q-knob
              readonly
              show-value
              :max="rateOfAchievement < 100 ? 100 : rateOfAchievement"
              v-model="rateOfAchievement"
              size="10vw"
              font-size="15px"
              :thickness="0.17"
              color="primary"
              track-color="grey-9"
              class="text-weight-light"
            >
              {{ d }}
            </q-knob>
          </q-btn>
          <q-btn
            to="/summary/weekly"
            round
            style="padding: 0 0.5vw"
            size="15px"
            icon="mdi-chart-box-plus-outline"
            color="grey-10"
          />
        </div>
      </div>
    </div>
    <q-separator dark color="grey-6" />
  </q-page>
</template>

<script setup lang="ts">
import { date, Screen } from 'quasar';
import { useLogStore } from 'src/store/logStore';
import { timeFromMS } from 'src/utils/func';
import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const timeStamp = Date.now();
const formattedDate = date.formatDate(timeStamp, 'YYYY/MM/DD');
const shareUrl =
  'http://twitter.com/share?url=https://youtu.be/qYnA9wWFHLI&text=' +
  '11:11' +
  '時間勉強しました&hashtags=StudyLog,毎日コツコツ';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const store = useLogStore();

const dailyTotalHoursMS = ref<number>(store.getAdayTotalHours(store.today));
const rateOfAchievement = ref<number>(0);
const doc = ref();
const dailyData = ref();
const workList = ref();
const weeklyData = ref();
const adoveItemsHeight = 50 + 140;
const visibleArea = Screen.height - adoveItemsHeight;

watch(
  () => store.weeklyLogList[store.today].length,
  (newItem) => {
    const belowContentHeight =
      dailyData.value.clientHeight +
      newItem * 48 +
      weeklyData.value.clientHeight;
    if (belowContentHeight > visibleArea) {
      doc.value?.classList.add('adjust-page');
    } else if (belowContentHeight > visibleArea - 48) {
      doc.value?.classList.add('adjust-page-3lists');
    }
  }
);
onMounted(() => {
  doc.value = document.querySelector('.q-page-container');
  const dailyContentHeight = dailyData.value.clientHeight;
  const workListHeight = workList.value.clientHeight;
  const weeklyContentHeight = weeklyData.value.clientHeight;

  const belowContentHeight =
    dailyContentHeight + workListHeight + weeklyContentHeight;

  if (belowContentHeight > visibleArea + 48) {
    doc.value?.classList.add('adjust-page');
  } else if (belowContentHeight > visibleArea) {
    doc.value?.classList.add('adjust-page-3lists');
  }
  rateOfAchievement.value =
    (dailyTotalHoursMS.value * 100) / store.weeklyTarget;
});
onBeforeRouteLeave(() => {
  document
    .querySelector('.q-page-container')
    ?.classList.remove('adjust-page', 'adjust-page-3lists');
});
</script>

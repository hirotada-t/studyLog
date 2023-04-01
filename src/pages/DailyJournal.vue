<template>
  <q-page class="q-py-md">
    <q-carousel
      dark
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      :height="visibleArea - 100 + 'px'"
      ref="carousel"
    >
      <q-carousel-slide
        v-for="([ymd, log], index) of Array.from(store.weeklyLogList)"
        :key="index"
        :name="date.formatDate(ymd, 'dd')"
        class="q-pa-none"
      >
        <div class="" ref="dailyData">
          <h2 class="q-mt-none text-h5">{{ ymd }} Summary</h2>
          <q-separator dark color="grey-6" />
          <div class="row q-py-md items-center">
            <div class="col-6 flex justify-center">
              <q-knob
                readonly
                show-value
                :max="recordArr[index].rate < 100 ? 100 : recordArr[index].rate"
                v-model="recordArr[index].rate"
                size="140px"
                font-size="40px"
                :thickness="0.22"
                color="primary"
                track-color="grey-9"
              >
                {{ Math.floor(recordArr[index].rate) }}%
              </q-knob>
              <p class="q-mb-none">DailyTotal/YourTarget</p>
            </div>
            <div class="col-4 text-center">
              <h3 class="q-my-none text-h5">
                {{ timeFromMS(store.getAdayTotalHoursMS(ymd)) }}
              </h3>
              <p>Daily total</p>
              <h3 class="q-my-none text-h5">
                {{ timeFromMS(store.weeklyTarget) }}
              </h3>
              <p class="q-my-none">Weekly ave.</p>
            </div>
            <div class="col-2">
              <q-btn
                icon="ios_share"
                flat
                round
                target="_blank"
                :href="shareUrl"
              />
            </div>
          </div>
        </div>

        <q-separator dark color="grey-6" />

        <div ref="workList">
          <q-list dark separator>
            <q-item
              v-for="(item, i) of log"
              :key="item.startMS"
              clickable
              dense
            >
              <q-item-section
                @click="deleteDialogOpen(ymd, i)"
                class="q-px-sm q-my-sm"
                avatar
                style="align-items: center; padding-left: 0; min-width: auto"
              >
                <q-icon size="xs" name="delete" />
              </q-item-section>
              <q-item-section
                class="q-mx-sm q-my-xs"
                style="background-color: #ccc; width: 1px; flex: auto"
              />
              <q-item-section @click="updateDialogOpen(i, item)">
                <div class="flex items-center justify-between">
                  {{ item.title }} /
                  {{ timeFromMS(item.studyMS) }}
                  <q-icon name="arrow_forward_ios" />
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="updateDialogOpen(null, null)">
              <q-item-section class="text-center text-h6 text-weight-light">
                <q-item-label>
                  Manually Add
                  <q-icon name="add" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-dialog
            v-model="dialog"
            persistent
            full-width
            class="result-window"
          >
            <WorkContent
              :pageDate="ymd"
              :startMS="
                MSFromDateTime(ymd, date.formatDate(Date.now(), 'HH:mm'))
              "
              :timeMS="0"
              :editLogIndex="editLogIndex"
              :logData="logForDialog"
            />
          </q-dialog>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-separator dark color="grey-6" />

    <div class="" ref="weeklyData">
      <div class="q-py-sm">
        <div class="flex justify-center">
          <q-btn
            @click="slide = dd"
            round
            flat
            v-for="(dd, index) of days"
            :key="index"
            style="padding: 0 0.5vw; width: 12%"
            :style="slide === dd ? 'opacity:1' : 'opacity:.4'"
            padding="none"
          >
            <q-knob
              readonly
              show-value
              :max="recordArr[index].rate < 100 ? 100 : recordArr[index].rate"
              v-model="recordArr[index].rate"
              size="10vw"
              font-size="15px"
              :thickness="0.17"
              color="primary"
              track-color="grey-9"
              class="text-weight-light"
            >
              {{ dd }}
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
      <q-carousel-control position="bottom">
        <q-btn
          class="navigate__btn navigate__left absolute bg-dark"
          @click="carousel.previous()"
          :disable="slide === 'Su'"
        >
          <q-icon size="45px" style="color: #ccc" name="arrow_back_ios_new" />
        </q-btn>
        <q-btn
          class="navigate__btn navigate__right absolute bg-dark"
          @click="carousel.next()"
          :disable="slide === 'Sa'"
        >
          <q-icon size="45px" style="color: #ccc" name="arrow_forward_ios" />
        </q-btn>
      </q-carousel-control>
    </div>

    <q-separator dark color="grey-6" />
  </q-page>
</template>

<script setup lang="ts">
import { date, Screen, useQuasar } from 'quasar';
import WorkContent from 'src/components/ContentDialog.vue';
import { useLogStore } from 'src/store/logStore';
import { DailyLog } from 'src/types/util.interface';
import { ref, onMounted, watch, provide } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { MSFromDateTime, timeFromMS } from 'src/utils/timeFormat';

const store = useLogStore();
const $q = useQuasar();
const slide = ref(date.formatDate(Date.now(), 'dd'));
const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const shareUrl =
  'http://twitter.com/share?url=https://youtu.be/qYnA9wWFHLI&text=' +
  '11:11' +
  '時間勉強しました&hashtags=StudyLog,毎日コツコツ';
const carousel = ref();
const dialog = ref<boolean>(false);
const dailyTotalHoursMS = ref<number>(store.getAdayTotalHoursMS(store.today));
const rateOfAchievement = ref<number>(0);
const doc = ref();
const dailyData = ref();
const workList = ref();
const weeklyData = ref();
const adoveItemsHeight = 50 + 140;
const visibleArea = Screen.height - adoveItemsHeight;
const todayLog = ref<DailyLog[] | undefined>(
  store.weeklyLogList.get(store.today)
);
const logForDialog = ref<DailyLog | null>(null);
const editLogIndex = ref<number | null>(null);
type Records = { date: number; rate: number };
const recordThisWeek = (): Records[] => {
  const arr: Records[] = [];
  const obj: { [key: string]: Records } = {};

  store.weeklyLogList.forEach((value, key) => {
    const dMS = new Date(key).getTime();
    const dd = date.formatDate(dMS, 'dd');
    const rate = (store.getAdayTotalHoursMS(key) * 100) / store.weeklyTarget;
    obj[dd] = {
      date: dMS,
      rate: rate,
    };
  });

  for (let i = 0; i < days.length; i++) {
    arr[i] = obj[days[i]];
  }
  return arr;
};
const recordArr = ref<Records[]>(recordThisWeek());
const updateDialogOpen = (index: number | null, item: DailyLog | null) => {
  editLogIndex.value = index;
  logForDialog.value = item;
  dialog.value = true;
};
const deleteDialogOpen = (ymd: string, index: number) => {
  $q.dialog({
    title: 'Caution !!',
    message: 'Do you really want to delete the log?',
    dark: true,
    cancel: {
      push: true,
      color: 'negative',
    },
  }).onOk(() => {
    store.deleteLog(ymd, index);
    recordArr.value = recordThisWeek();
  });
};

provide('close-dialog', () => (dialog.value = false));
watch(
  () => {
    if (todayLog.value) return todayLog.value.length;
    else return 0;
  },
  (newItem) => {
    const belowContentHeight =
      dailyData.value.clientHeight +
      (newItem + 1) * 48 +
      weeklyData.value.clientHeight;
    if (belowContentHeight > visibleArea + 48) {
      doc.value?.classList.add('adjust-page');
    } else if (belowContentHeight > visibleArea) {
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

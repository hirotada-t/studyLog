<template>
  <q-page class="row justify-evenly">
    <div class="fixed text-center q-mt-lg text-h5">
      <p>Start : {{ store.today }} {{ formattedTime }}</p>
      <div class="">
        <span style="font-size: 90px; line-height: 0.7em">{{ time }}</span>
      </div>
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
    <q-dialog v-model="dialog" full-width class="result-window q-pt-lg">
      <div
        class="absolute z-top q-mt-md text-center text-h5 top-0"
        style="height: 140px"
      >
        <p>Start : {{ store.today }}</p>
        <div class="">
          <span style="font-size: 90px; line-height: 0.7em">{{ time }}</span>
        </div>
      </div>
      <q-card
        class="bg-dark"
        flat
        style="border: 2px solid #888; margin-top: 140px"
      >
        <q-card-section align="center">
          <q-btn
            v-if="dialog"
            target="_blank"
            :href="shareUrl"
            flat
            label="share on twitter"
            icon="ios_share"
            color="primary"
          />
          <q-scroll-area
            :thumb-style="{
              right: '2px',
              borderRadius: '5px',
              backgroundColor: '#cccccc',
              width: '5px',
              opacity: '0.4',
            }"
            dark
            visible
            class="q-pt-sm"
            :class="Screen.height > 777 ? '' : 'q-pr-md'"
            :style="
              Screen.height > 777 ? { height: '450px' } : { height: '350px' }
            "
          >
            <q-form class="q-gutter-y-md column">
              <q-input
                dark
                filled
                v-model="logOfWork.title"
                label="Title"
                counter
                dense
                clearable
                maxlength="20"
              >
                <template v-slot:prepend>
                  <q-icon name="edit" size="small" />
                </template>
              </q-input>
              <q-select
                clearable
                label="Category"
                dark
                filled
                v-model="logOfWork.category"
                :options="categoryList"
                dense
              >
              </q-select>
              <q-btn
                size="small"
                flat
                dense
                class="q-mt-none q-py-none"
                label="add new category"
                icon="add"
                @click="addNewCat = true"
              >
                <q-dialog v-model="addNewCat">
                  <q-card class="bg-dark" flat>
                    <q-card-section align="center">
                      <q-input
                        v-model="newCat"
                        label="new category"
                        dark
                        filled
                        dense
                        clearable
                      />
                    </q-card-section>
                    <q-card-actions align="center">
                      <q-btn
                        @click="addNewCat = false"
                        flat
                        label="cancel"
                        color="primary"
                      />
                      <q-btn
                        @click="
                          categoryList.push(newCat);
                          addNewCat = false;
                          newCat = '';
                        "
                        :disable="newCat === ''"
                        flat
                        label="OK"
                        color="dark"
                        class="bg-primary text-bold"
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </q-btn>
              <q-select
                label="Tags"
                dark
                filled
                v-model="logOfWork.tags"
                use-input
                use-chips
                multiple
                dense
                hide-dropdown-icon
                new-value-mode="add-unique"
              >
                <template v-slot:prepend>
                  <q-icon name="local_offer" size="small" />
                </template>
              </q-select>
              <p class="text-left q-mb-none">Level of Focus</p>
              <q-item class="q-mt-none q-pa-none">
                <q-item-section side class="align-end">
                  <q-icon
                    @click="
                      logOfWork.focusLevel < 2 ? 1 : logOfWork.focusLevel--
                    "
                    name="remove"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="logOfWork.focusLevel"
                    color="accent"
                    thumb-color="grey-4"
                    snap
                    dark
                    :min="1"
                    :max="4"
                    :step="1"
                    marker-labels
                    label-always
                    :label-value="faceOfFocus[logOfWork.focusLevel - 1]"
                    :switch-label-side="logOfWork.focusLevel === 1"
                    track-size="10px"
                    thumb-size="25px"
                    markers
                  >
                    <template v-slot:marker-label-group="{ markerMap }">
                      <div
                        class="row items-center no-wrap justify-center"
                        :class="markerMap[logOfWork.focusLevel].classes"
                        style="width: 100%; transform: translateX(0)"
                      >
                        <span class="q-mr-xs">Score :</span>
                        <q-rating
                          v-model="logOfWork.focusLevel"
                          :max="4"
                          size="1em"
                          color="accent"
                          icon="star_border"
                          icon-selected="star"
                        />
                      </div>
                    </template>
                  </q-slider>
                </q-item-section>
                <q-item-section side>
                  <q-icon
                    @click="
                      logOfWork.focusLevel > 3 ? 4 : logOfWork.focusLevel++
                    "
                    name="add"
                    size="xs"
                  />
                </q-item-section>
              </q-item>
              <q-input
                label="Study contents"
                dark
                filled
                v-model="logOfWork.studyContents"
                dense
                type="textarea"
              />
            </q-form>
          </q-scroll-area>
        </q-card-section>
        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            target="_blank"
            @click="restartTimer"
            flat
            label="restart"
            color="primary"
          />
          <q-btn
            @click="store.setLog(logOfWork)"
            to="/"
            flat
            label="finish"
            color="dark"
            class="bg-primary text-bold"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { useLogStore } from 'src/store/logStore';
import { date, Screen } from 'quasar';
import { onBeforeRouteLeave } from 'vue-router';
import { DailyLog } from 'src/types/util.interface';
import { ref } from 'vue';

const store = useLogStore();
const faceOfFocus = ['😣', '😑', '🙂', '😆'];

const shareUrl = ref<string>('');
const dialog = ref<boolean>(false);
const categoryList = ref<string[]>(['MySelf', 'Task']);
const newCat = ref<string>('');
const addNewCat = ref<boolean>(false);

const timerId = ref<NodeJS.Timeout>();
const startTime = ref(Date.now());
const formattedTime: string = date.formatDate(startTime.value, 'hh:mm');
const stopTime = ref<number>(0);
const hour = ref<number>(0);
const min = ref<string>('00');
const sec = ref<string>('00');
const time = ref<string>('0:00:00');
const logOfWork = ref<DailyLog>({
  startTime: Date.now(),
  closeTime: 0,
  title: '',
  category: '',
  tags: [],
  focusLevel: 3,
  studyContents: '',
});

const displayTimer = () => {
  const currentTime = new Date(Date.now() - startTime.value + stopTime.value);
  timerId.value = setTimeout(() => {
    hour.value =
      Number(date.formatDate(currentTime, 'hh')) +
      new Date().getTimezoneOffset() / 60;
    min.value = date.formatDate(currentTime, 'mm');
    sec.value = date.formatDate(currentTime, 'ss');
    time.value = hour.value + ':' + min.value + ':' + sec.value;
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
  logOfWork.value.closeTime = 0;
};
const restartTimer = () => {
  dialog.value = false;
  startTimer();
};

startTimer();

onBeforeRouteLeave((to, from) => {
  if (from.name === 'Timer') {
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

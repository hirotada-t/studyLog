<template>
  <div class="text-center q-mb-md">
    <p class="text-h6 q-mb-none row items-center justify-center q-gutter-x-xs">
      Start :
      <q-btn @click="editStart" padding="none" size="lg" flat>
        {{ pageDate }} {{ startTime }}
        <q-icon size="xs" name="edit" class="q-ml-xs" />
      </q-btn>
    </p>
    <div class="text-h1">
      {{ time }}
    </div>
    <p class="text-h6 q-mb-none row items-center justify-center q-gutter-x-xs">
      End :
      <q-btn @click="editEnd" padding="none" size="lg" flat>
        {{ pageDate }} {{ endTime }}
        <q-icon size="xs" name="edit" class="q-ml-xs" />
      </q-btn>
    </p>
    <q-dialog v-model="dialog.open" full-width>
      <q-card dark>
        <q-card-section>
          <div class="text-h6">Edit {{ dialog.target }} time.</div>
        </q-card-section>

        <q-card-section class="q-pt-none row">
          <q-input
            dark
            v-model="dialog.time"
            type="time"
            :rules="[
              (val) =>
                validateEditTime(val, dialog.target) ||
                'Please enter the appropriate time',
            ]"
            class="w-100pc"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn dark v-close-popup label="cancel" flat color="primary" />
          <q-btn
            :disable="!validateEditTime(dialog.time, dialog.target)"
            dark
            label="OK"
            color="primary"
            text-color="dark"
            @click="fixTime"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <q-card class="bg-dark" flat style="border: 2px solid #888">
    <q-card-section align="center">
      <q-btn
        target="_blank"
        :href="url"
        flat
        label="share on twitter"
        icon="ios_share"
        color="primary"
        disable
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
        :style="Screen.height > 777 ? { height: '450px' } : { height: '330px' }"
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
            class="w-100pc"
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
            class="w-100pc"
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
            v-model="logOfWork.tagList"
            use-input
            use-chips
            multiple
            dense
            hide-dropdown-icon
            new-value-mode="add-unique"
            class="w-100pc"
          >
            <template v-slot:prepend>
              <q-icon name="local_offer" size="small" />
            </template>
          </q-select>
          <p class="text-left q-mb-none w-100pc">Level of Focus</p>
          <q-item class="q-mt-none q-pa-none w-100pc">
            <q-item-section side class="align-end">
              <q-icon
                @click="logOfWork.focusLevel < 2 ? 1 : logOfWork.focusLevel--"
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
                marker-labels-class="text-subtitle1"
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
                @click="logOfWork.focusLevel > 3 ? 4 : logOfWork.focusLevel++"
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
            class="w-100pc"
            style="width: 100%"
          />
        </q-form>
      </q-scroll-area>
    </q-card-section>
    <q-card-actions align="center" class="q-pb-md">
      <BtnsTimerResult
        v-if="route.name === 'Timer'"
        @set-content="store.setLog(pageDate, logOfWork)"
      />
      <BtnsDailyJournal
        v-if="route.name === 'Daily Journal'"
        @update-content="updateContent"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { date, Screen } from 'quasar';
import BtnsDailyJournal from 'src/components/parts/dialog/BtnsDailyJournal.vue';
import BtnsTimerResult from 'src/components/parts/dialog/BtnsTimerResult.vue';
import { useLogStore } from 'src/store/logStore';
import { LogItems } from 'src/types/util.interface';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { timeFromMS, MSFromDateTime } from 'src/utils/timeFormat';

const faceOfFocus = ['😣', '😑', '🙂', '😆'];
const store = useLogStore();
const route = useRoute();
const props = defineProps<{
  startMS: number;
  timeMS: number;
  pageDate: string;
  logData: LogItems | null;
  editLogIndex: number | null;
}>();
const emits = defineEmits<{ (e: 'complete-update'): void }>();

const dialog = ref<{
  open: boolean;
  target: 'end' | 'start';
  time: string;
}>({
  open: false,
  target: 'end',
  time: '',
});
const logOfWork = ref<LogItems>({
  startMS: props.logData
    ? props.logData.startMS
    : Math.floor(props.startMS / (1000 * 60)) * 1000 * 60,
  studyMS: props.logData
    ? props.logData.studyMS
    : Math.floor(props.timeMS / (1000 * 60)) * 1000 * 60,
  title: props.logData ? props.logData.title : '',
  category: props.logData ? props.logData.category : '',
  tagList: props.logData ? props.logData.tagList : [],
  focusLevel: props.logData ? props.logData.focusLevel : 3,
  studyContents: props.logData ? props.logData.studyContents : '',
});
const startTime = ref<string>(
  date.formatDate(logOfWork.value.startMS, 'HH:mm')
);
const time = ref<string>(timeFromMS(logOfWork.value.studyMS));
const endMS = ref<number>(logOfWork.value.startMS + logOfWork.value.studyMS);
const endTime = ref<string>(date.formatDate(endMS.value, 'HH:mm'));
const categoryList = ref<string[]>(['MySelf', 'Task']);
const newCat = ref<string>('');
const addNewCat = ref<boolean>(false);
const url = ref<string>(
  'http://twitter.com/share?url=https://youtu.be/qYnA9wWFHLI&text=' +
    time.value +
    '時間勉強しました&hashtags=StudyLog,毎日コツコツ'
);

const editStart = () => {
  dialog.value.open = true;
  dialog.value.time = startTime.value;
  dialog.value.target = 'start';
};
const editEnd = () => {
  dialog.value.open = true;
  dialog.value.time = endTime.value;
  dialog.value.target = 'end';
};
const validateEditTime = (val: string, target: 'start' | 'end'): boolean => {
  const editedTimeMS = MSFromDateTime(props.pageDate, val);
  if (target === 'start') {
    return editedTimeMS <= endMS.value;
  } else if (target === 'end') {
    return editedTimeMS >= logOfWork.value.startMS;
  }
  return false;
};
const fixTime = () => {
  const editedTimeMS = MSFromDateTime(props.pageDate, dialog.value.time);

  if (dialog.value.target == 'start') {
    logOfWork.value.startMS = editedTimeMS;
    startTime.value = date.formatDate(editedTimeMS, 'HH:mm');
  } else if (dialog.value.target == 'end') {
    endTime.value = date.formatDate(editedTimeMS, 'HH:mm');
    endMS.value = MSFromDateTime(props.pageDate, endTime.value);
  }
  const diffMS = endMS.value - logOfWork.value.startMS;
  logOfWork.value.studyMS = diffMS < 0 ? 0 : diffMS;
  time.value = timeFromMS(logOfWork.value.studyMS);

  dialog.value.open = false;
  dialog.value.time = '';
  dialog.value.target = 'end';
};
const updateContent = () => {
  if (!props.logData) {
    store.setLog(props.pageDate, logOfWork.value);
  } else if (props.editLogIndex || props.editLogIndex === 0) {
    store.updateLog(props.pageDate, props.editLogIndex, logOfWork.value);
  } else return;
  emits('complete-update');
};
</script>

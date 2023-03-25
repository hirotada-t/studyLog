<template>
  <div class="absolute z-top q-mt-md text-center text-h5 top-0">
    <p class="text-h6 q-mb-none row items-center justify-center q-gutter-x-xs">
      Start :
      <q-btn @click="dialog = true" padding="none" size="lg" flat>
        {{ store.today }} {{ startTime
        }}<q-icon size="xs" name="edit" class="q-ml-xs" />
      </q-btn>
    </p>
    <div class="text-h1">
      {{ time }}
    </div>
    <p class="text-h6 q-mb-none row items-center justify-center q-gutter-x-xs">
      End :
      <q-btn @click="dialog = true" padding="none" size="lg" flat>
        {{ store.today }} {{ startTime
        }}<q-icon size="xs" name="edit" class="q-ml-xs" />
      </q-btn>
    </p>
    <q-dialog v-model="dialog" full-width>
      <q-card dark>
        <q-card-section>
          <div class="text-h6">Edit start time.</div>
        </q-card-section>

        <q-card-section class="q-pt-none row">
          <q-input dark v-model="startTime" type="time" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <q-card
    class="bg-dark"
    flat
    style="border: 2px solid #888"
    :style="`margin-top:${timerHeight}px`"
  >
    <q-card-section align="center">
      <q-btn
        target="_blank"
        :href="url"
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
            v-model="logOfWork.tagList"
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
          />
        </q-form>
      </q-scroll-area>
    </q-card-section>
    <q-card-actions align="center" class="q-pb-md">
      <WorkResult
        v-if="route.name === 'Timer'"
        @set-content="store.setLog(logOfWork)"
      />
      <CreateManual
        v-if="route.name === 'Daily Journal'"
        @update-content="store.setLog(logOfWork)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { date, Screen } from 'quasar';
import CreateManual from 'src/components/parts/dialogBtns/CreateManual.vue';
import { useLogStore } from 'src/store/logStore';
import { DailyLog } from 'src/types/util.interface';
import { ref } from 'vue';
import WorkResult from 'src/components/parts/dialogBtns/WorkResult.vue';
import { useRoute } from 'vue-router';
import { timeFromMS } from 'src/utils/timeFormat';

const faceOfFocus = ['😣', '😑', '🙂', '😆'];
const store = useLogStore();
const route = useRoute();
const props = defineProps<{
  startMS: number;
  timeMS: number;
  timerHeight: number;
}>();
const dialog = ref<boolean>(false);
const logOfWork = ref<DailyLog>({
  startMS: props.startMS,
  studyMS: props.timeMS,
  title: '',
  category: '',
  tagList: [],
  focusLevel: 3,
  studyContents: '',
});
const startTime = ref<string>(
  date.formatDate(logOfWork.value.startMS, 'HH:mm')
);
const time = ref<string>(timeFromMS(logOfWork.value.studyMS));
const categoryList = ref<string[]>(['MySelf', 'Task']);
const newCat = ref<string>('');
const addNewCat = ref<boolean>(false);
const url = ref<string>(
  'http://twitter.com/share?url=https://youtu.be/qYnA9wWFHLI&text=' +
    time.value +
    '時間勉強しました&hashtags=StudyLog,毎日コツコツ'
);
</script>

<template>
  <q-page class="row justify-evenly">
    <div class="fixed text-center q-mt-lg text-h5">
      <p>Start : {{ formattedString }}</p>
      <div class="">
        <span style="font-size: 90px; line-height: 0.7em">{{ time }}</span>
      </div>
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
    <q-dialog v-model="dialog" full-width>
      <div
        class="absolute z-top top-20px text-center text-h5"
        style="height: 140px"
      >
        <p>Start : {{ formattedString }}</p>
        <div class="">
          <span style="font-size: 90px; line-height: 0.7em">{{ time }}</span>
        </div>
      </div>
      <q-card class="bg-dark" flat style="border: 2px solid #888">
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
            :thumb-style="thumbStyle"
            dark
            visible
            class="q-pt-sm q-pr-md"
            style="height: 55vh"
          >
            <q-form class="q-gutter-y-md column">
              <q-input
                dark
                filled
                bottom-slots
                v-model="logOfWork.title"
                label="Title"
                counter
                dense
                :rules="[(val: string) => val.length <= 20 || 'Please use Maximum 20 characters']"
              >
                <template v-slot:hint>Maximum 20 characters</template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="logOfWork.title = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                label="Category"
                dark
                filled
                bottom-slots
                v-model="logOfWork.title"
                counter
                dense
                :rules="[(val: string) => val.length <= 20 || 'Please use Maximum 20 characters']"
              >
                <template v-slot:hint>Maximum 20 characters</template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="logOfWork.title = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
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
                input-debounce="0"
                @new-value="createValue"
              />
              <q-input
                label="Level of Focus"
                dark
                v-model="logOfWork.title"
                dense
              >
              </q-input>
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
// import { useLogStore } from 'src/store/logStore';
import { date } from 'quasar';
import { Log } from 'src/types/util.interface';
import { ref } from 'vue';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'MM/DD HH:mm');

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
const logOfWork = ref<Log>({
  date: '',
  startTime: '',
  studyTime: '',
  title: '',
  category: '',
  tags: [],
  focusLevel: 0,
  studyContents: '',
});

const thumbStyle = {
  right: '2px',
  borderRadius: '5px',
  backgroundColor: '#cccccc',
  width: '5px',
  opacity: '0.4',
};

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
const restartTimer = () => {
  dialog.value = false;
  startTimer();
};
const createValue = (
  val: string,
  done: (
    item?: string,
    mode?: 'add-unique' | 'add' | 'toggle' | undefined
  ) => void
) => {
  done(val, 'add-unique');
};

// (property) "new-value":
//  (
//   (
//     inputValue: string,
//     doneFn: (item?: any, mode?: "add-unique" | "add" | "toggle" | undefined) => void
//   ) => void
// ) | undefined

startTimer();
</script>

<style lang="scss">
.q-dialog__inner {
  align-items: end !important;
}
</style>

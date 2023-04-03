<template>
  <q-page class="q-pt-md">
    <div ref="contents" style="padding-bottom: 120px">
      <h2 class="q-mt-none q-mb-xs text-h5">
        Your Own Value
        <q-btn
          icon="mdi-help-circle-outline"
          round
          flat
          dense
          class="q-ml-md"
        />
      </h2>
      <div class="row q-col-gutter-sm items-stretch">
        <div
          class="col-4"
          v-for="(val, index) of selectedValueArr"
          :key="index"
        >
          <q-card
            @click="
              editMyValues = index;
              slide = valueImgArr.indexOf(val);
              valuesDialogOpen = true;
            "
            class="bg333"
            style="border-radius: 15px"
          >
            <q-img :src="`/img/values/${val.toLowerCase()}.png`">
              <div
                class="absolute-bottom text-center"
                :class="val === 'Burning' ? '' : 'text-weight-bold text-dark'"
                style="background: none; padding-bottom: 5px"
              >
                {{ val }}
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="col-4" v-if="selectedValueArr.length < 3">
          <q-card
            id="valueBtn"
            @click="valuesDialogOpen = true"
            class="bg333 flex flex-center"
            style="border-radius: 15px"
            :style="`height: ${valueBtnHeight}px;`"
          >
            <q-icon name="add" dark size="xl" />
          </q-card>
        </div>

        <q-dialog v-model="valuesDialogOpen" full-width>
          <q-card dark>
            <q-card-section>
              <q-carousel
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                animated
                arrows
                infinite
                v-model="slide"
                control-color="dark"
                control-text-color="white"
                control-type="regular"
                navigation-icon="radio_button_unchecked"
                padding
                height="calc((100vw - 24px * 2 - 16px * 2) * 0.8)"
                class="bg-dark rounded-borders valueCarousel"
              >
                <q-carousel-slide
                  v-for="(val, index) of valueImgArr"
                  :key="index"
                  :name="index"
                  class="column no-wrap justify-end"
                  :class="val === 'Burning' ? '' : 'text-dark'"
                  :img-src="`/img/values/${val.toLowerCase()}.png`"
                  style="padding-right: 0; padding-left: 0"
                >
                  <div class="text-h4 text-weight-bold text-center">
                    {{ valueImgArr[slide] }}
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </q-card-section>

            <q-separator dark inset />

            <q-card-actions align="center" class="q-py-md">
              <q-btn
                flat
                icon="fa-regular fa-trash-can"
                v-if="typeof editMyValues === 'number'"
                round
                @click="deleteValue"
              />
              <q-btn
                flat
                label="Cancel"
                color="primary"
                @click="
                  valuesDialogOpen = false;
                  editMyValues = null;
                  slide = 0;
                "
              />
              <q-btn
                text-color="dark"
                label="OK"
                color="primary"
                @click="updateValueImg"
                class="col-7"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <h2 class="q-mb-xs text-h5">
        Your Own Goal<span class="q-ml-sm text-body2">(up to 3)</span>
        <q-btn
          icon="mdi-help-circle-outline"
          round
          flat
          dense
          class="q-ml-md"
        />
      </h2>
      <q-list dense dark separator>
        <q-item
          v-for="(val, index) of selectedGoalArr"
          :key="index"
          class="flex items-center justify-between text-h5 text-weight-light"
          style="min-height: auto"
        >
          {{ val }}
          <q-btn
            @click="deleteGoal(index)"
            icon="fa-regular fa-trash-can"
            padding="none"
            flat
            size="sm"
          />
        </q-item>
        <q-item
          clickable
          v-if="selectedGoalArr.length < 3"
          @click="goalsDialogOpen"
        >
          <q-item-section class="text-center text-h6 q-pt-md">
            <q-item-label>
              Add
              <q-icon name="add" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <h2 class="q-mb-xs text-h5">
        Weekly Tasks<span class="q-ml-sm text-body2">(up to 5)</span>
        <q-btn
          icon="mdi-help-circle-outline"
          round
          flat
          dense
          class="q-ml-md"
        />
      </h2>
      <q-list dark separator>
        <q-item
          clickable
          v-for="(val, key) of weeklyTaskList"
          :key="key"
          class="items-center justify-between text-h5 text-weight-light"
          style="min-height: auto"
        >
          <q-checkbox
            v-model="weeklyTaskList[key]"
            color="green"
            dense
            class="q-pr-sm"
            dark
            :style="!val ? '' : 'text-decoration:line-through double #ff4040;'"
          >
            <div
              class="overflow-eclipse"
              :style="`width: ${-80 + Screen.width - 40}px;`"
            >
              {{ key }}
            </div>
          </q-checkbox>
          <q-btn
            @click="deleteTask(key.toString())"
            icon="fa-regular fa-trash-can"
            padding="0 sm 0 0"
            flat
            size="sm"
          />
        </q-item>
        <q-item
          clickable
          v-if="Object.keys(weeklyTaskList).length < 5"
          @click="taskDialogOpen"
        >
          <q-item-section class="text-center text-h6 q-pt-md">
            <q-item-label>
              Add
              <q-icon name="add" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Screen } from 'quasar';
import { deleteDialog, createNewTargetDialog } from 'src/utils/func';
import { ref, onMounted } from 'vue';

const valueImgArr = ['Challenge', 'Burning', 'Explore'];
const slide = ref<number>(0);
const valueBtnHeight = ref<number>(0);
const selectedValueArr = ref<string[]>([]);
const valuesDialogOpen = ref<boolean>(false);
const editMyValues = ref<number | null>(null);
const selectedGoalArr = ref<string[]>([]);
const weeklyTaskList = ref<{ [key: string]: boolean }>({});

const updateValueImg = () => {
  if (typeof editMyValues.value === 'number') {
    selectedValueArr.value[editMyValues.value] = valueImgArr[slide.value];
  } else {
    selectedValueArr.value.push(valueImgArr[slide.value]);
  }
  valuesDialogOpen.value = false;
  editMyValues.value = null;
  slide.value = 0;
};
const deleteValue = () => {
  deleteDialog(() => {
    if (typeof editMyValues.value === 'number') {
      selectedValueArr.value.splice(editMyValues.value, 1);
    }
    valuesDialogOpen.value = false;
    editMyValues.value = null;
    slide.value = 0;
  });
};
const goalsDialogOpen = () => {
  createNewTargetDialog('Goal', (data) => {
    selectedGoalArr.value.push(data);
  });
};
const deleteGoal = (index: number) => {
  deleteDialog(() => {
    selectedGoalArr.value.splice(index, 1);
  });
};
const taskDialogOpen = () => {
  createNewTargetDialog('Task', (data: string) => {
    weeklyTaskList.value[data] = false;
  });
};
const deleteTask = (key: string) => {
  deleteDialog(() => {
    delete weeklyTaskList.value[key];
  });
};

onMounted(() => {
  const btn = document.getElementById('valueBtn');
  if (btn) {
    valueBtnHeight.value = btn.clientWidth * 0.8;
  }
});
</script>

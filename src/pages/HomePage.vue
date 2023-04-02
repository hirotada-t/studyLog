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
        <div class="col-4" v-for="(val, index) of selectedValue" :key="index">
          <q-card
            @click="
              addValue = index;
              slide = valueImgArr.indexOf(val);
              valueDialog = true;
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
        <div class="col-4" v-if="selectedValue.length < 3">
          <q-card
            id="valueBtn"
            @click="valueDialog = true"
            class="bg333 flex flex-center"
            style="border-radius: 15px"
            :style="`height: ${valueBtnHeight}px;`"
          >
            <q-icon name="add" dark size="xl" />
          </q-card>
        </div>

        <q-dialog v-model="valueDialog" full-width>
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
                height="calc((100vw - 24px * 2) * 0.8)"
                class="bg-dark rounded-borders valueCarousel"
              >
                <q-carousel-slide
                  v-for="(val, index) of valueImgArr"
                  :key="index"
                  :name="index"
                  class="text-h3 text-center column no-wrap justify-end"
                  :class="val === 'Burning' ? '' : 'text-dark'"
                  :img-src="`/img/values/${val.toLowerCase()}.png`"
                >
                  {{ valueImgArr[slide] }}
                </q-carousel-slide>
              </q-carousel>
            </q-card-section>

            <q-separator dark inset />

            <q-card-actions align="center" class="q-py-md">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                text-color="dark"
                label="OK"
                color="primary"
                @click="updateValueImg"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <h2 class="q-mb-xs text-h5">
        Your Own Goal
        <q-btn
          icon="mdi-help-circle-outline"
          round
          flat
          dense
          class="q-ml-md"
        />
      </h2>
      <q-list dense>
        <q-item
          v-for="(val, index) of goalArr"
          :key="index"
          style="min-height: auto"
          >{{ val }}</q-item
        >
        <q-item clickable @click="goalDialogOpen">
          <q-item-section class="text-center text-h6">
            <q-item-label>
              Add
              <q-icon name="add" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <h2 class="q-mb-xs text-h5">
        Weekly Tasks
        <q-btn
          icon="mdi-help-circle-outline"
          round
          flat
          dense
          class="q-ml-md"
        />
      </h2>
      <q-list dense>
        <q-item
          clickable
          v-for="(val, key, index) of target"
          :key="index"
          class="items-center"
          style="min-height: auto"
          :style="
            !val
              ? ''
              : 'text-decoration:line-through;text-decoration-style:double;'
          "
          @click="target[key] = !target[key]"
        >
          <q-checkbox
            v-model="target[key]"
            color="green"
            dense
            class="q-pr-sm"
            dark
          >
            {{ key }}
          </q-checkbox>
        </q-item>
        <q-item clickable @click="taskDialogOpen">
          <q-item-section class="text-center text-h6">
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
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';

const valueImgArr = ['Challenge', 'Burning', 'Explore'];
const $q = useQuasar();
const slide = ref(0);
const valueBtnHeight = ref<number>(0);
const selectedValue = ref<string[]>([]);
const addValue = ref<true | number>(true);
const goalArr = ref<string[]>([]);
const target = ref<{ [key: string]: boolean }>({});
const i = ref(1);
const j = ref(1);
const valueDialog = ref<boolean>(false);

const updateValueImg = () => {
  if (typeof addValue.value === 'number') {
    selectedValue.value[addValue.value] = valueImgArr[slide.value];
  } else {
    selectedValue.value.push(valueImgArr[slide.value]);
  }
  slide.value = 0;
};
const goalDialogOpen = () => {
  $q.dialog({ cancel: true, dark: true }).onOk(() => {
    goalArr.value.push('goal' + j.value++);
  });
};
const taskDialogOpen = () => {
  $q.dialog({ cancel: true, dark: true }).onOk(() => {
    target.value['task' + i.value++] = false;
  });
};
// const  = () => {};

onMounted(() => {
  const btn = document.getElementById('valueBtn');
  if (btn) {
    valueBtnHeight.value = btn.clientWidth * 0.8;
  }
});
</script>

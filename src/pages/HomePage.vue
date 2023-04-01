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
          <q-card class="bg333" style="border-radius: 15px">
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
            @click="valueDialog = true"
            class="bg333 flex flex-center h-100pc"
            style="border-radius: 15px"
          >
            <q-icon name="add" dark size="xl" />
          </q-card>
        </div>

        <q-dialog v-model="valueDialog">
          <q-card dark>
            <q-card-actions>
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn text-color="dark" label="OK" color="primary" @click="selectedValue.push('Explore')" v-close-popup />
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
        <q-item clickable @click="goalArr.push('goal' + j++)">
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
        <q-item clickable @click="target['task' + i++] = false">
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
import { ref } from 'vue';

const $q = useQuasar();
const selectedValue = ref<string[]>(['Challenge']);
const goalArr = ref<string[]>([]);
const target = ref<{ [key: string]: boolean }>({});
const i = ref(1);
const j = ref(1);
const valueDialog = ref<boolean>(false);
const goalDialog = ref<boolean>(false);
const taskDialog = ref<boolean>(false);

const valueDialogOpen = () => {
  valueDialog.value = true;
};
const goalDialogOpen = () => {
  goalDialog.value = true;
};
const taskDialogOpen = () => {
  taskDialog.value = true;
};
// const  = () => {};
</script>

<template>
  <q-page class="">
    <h2 class="q-mb-xs text-h5">
      Your Own Value
      <q-btn icon="mdi-help-circle-outline" round flat dense class="q-ml-md" />
    </h2>
    <div class="row q-col-gutter-sm">
      <div class="col-4" v-for="(val, index) of valueArr" :key="index">
        <q-card class="bg333" style="border-radius: 15px">
          <q-img :src="`/img/values/${val.toLowerCase()}.png`">
            <div
              class="absolute-bottom text-center text-dark text-weight-bold"
              style="background: none; padding-bottom: 5px"
            >
              {{ val }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
    <h2 class="q-mb-xs text-h5">
      Your Own Goal
      <q-btn icon="mdi-help-circle-outline" round flat dense class="q-ml-md" />
    </h2>
    <q-list dense>
      <q-item
        v-for="(val, index) of goalArr"
        :key="index"
        style="min-height: auto"
        >{{ val }}</q-item
      >
    </q-list>
    <h2 class="q-mb-xs text-h5">
      Weekly Target
      <q-btn icon="mdi-help-circle-outline" round flat dense class="q-ml-md" />
    </h2>
    <q-list dense>
      <q-item
        v-for="(val, index) of target"
        :key="index"
        style="min-height: auto"
        >{{ val }}</q-item
      >
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
const valueArr = ['Challenge', 'Burning', 'Explore'];
const goalArr = [
  '自分の課題を解決するためのアプリを公開する',
  '精神と肉体が常にベストの状態でいる',
  '一緒に人生を作るパートナーを見つける',
  '海外の文化/生活/人/自然を現地で体感する',
];
const target = [
  'Appデザインの完成',
  '面接をクリアする',
  '22時消灯→6時起床',
  '環境構築',
  'コーディング開始',
];
</script>

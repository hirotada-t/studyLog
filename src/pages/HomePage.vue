<template>
  <q-page class="q-py-md">
    <h2 class="q-mt-none text-h5">
      Your Own Value
      <q-btn icon="mdi-help-circle-outline" round flat dense class="q-ml-md" />
    </h2>
    <div class="row q-col-gutter-sm">
      <div class="col-4" v-for="(val, index) of arr" :key="index">
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
  </q-page>
</template>

<script setup lang="ts">
const arr = ['Challenge', 'Burning', 'Explore'];
</script>

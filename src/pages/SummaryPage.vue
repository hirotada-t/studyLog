<template>
  <q-page class="column no-wrap justify-center">
    <div class="q-px-md q-mb-md">
      <router-link to="/summary/chart">
        <q-card class="bg-dark" style="border-radius: 20px">
          <q-img src="/img/chart-img.png">
            <div class="absolute-top text-h5 text-left">Record of effort</div>
          </q-img>
        </q-card>
      </router-link>
    </div>
    <div class="row q-px-md">
      <div class="col-6 q-pr-sm">
        <router-link to="/summary/monthly">
          <q-card class="bg333" style="border-radius: 15px">
            <q-img src="/img/monthly-summary.png">
              <div class="absolute-top text-h5 text-center bg333">
                Monthly Summary
              </div>
            </q-img>
          </q-card>
        </router-link>
      </div>
      <div class="col-6 q-pl-sm">
        <router-link to="/summary/monthly">
          <q-card class="bg333" style="border-radius: 15px">
            <q-img src="/img/weekly-summary.png">
              <div class="text-h5 text-center bg333">Weekly Summary</div>
            </q-img>
          </q-card>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>

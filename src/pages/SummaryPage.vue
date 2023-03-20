<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <router-link to="/summary/chart">
          <q-card>
            <q-img src="/img/chart-img.png">
              <div class="absolute-bottom text-subtitle2 text-center">Chart</div>
            </q-img>
          </q-card>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <router-link to="/summary/monthly">
          <q-card>
            <q-img src="/img/monthly-summary.png">
              <div class="absolute-bottom text-subtitle2 text-center">Monthly Summary</div>
            </q-img>
          </q-card>
        </router-link>
      </div>
      <div class="col-6">
        <router-link to="/summary/monthly">
          <q-card>
            <q-img src="/img/weekly-summary.png">
              <div class="absolute-bottom text-subtitle2 text-center">Weekly Summary</div>
            </q-img>
          </q-card>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>

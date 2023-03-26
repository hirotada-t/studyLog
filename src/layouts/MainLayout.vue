<template>
  <div class="q-px-md">
    <q-layout view="hHh lpR fFf">
      <q-header bordered class="bg-header text-white">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            {{ $route.name }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer bordered class="bg-primary text-dark" style="z-index: 1">
        <q-btn
          v-if="$route.path !== '/timer'"
          round
          to="timer"
          class="absolute start-btn"
          color="dark"
        >
          <q-icon
            size="120px"
            color="accent"
            name="fa-regular fa-circle-play"
          />
        </q-btn>
        <q-tabs align="justify" indicator-color="transparent">
          <q-route-tab name="home" to="/" icon="home" class="w-20pc" />
          <q-route-tab
            name="dailyJournal"
            to="/dailyJournal"
            icon="mdi-notebook"
            class="w-20pc"
          />
          <q-tab disable class="w-20pc" />
          <q-route-tab
            name="summary"
            to="/summary"
            icon="mdi-poll"
            class="w-20pc"
          />
          <q-route-tab
            name="settings"
            to="/settings"
            icon="mdi-cog"
            class="w-20pc"
          />
        </q-tabs>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup lang="ts"></script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-header text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">{{ $route.name }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer bordered class="bg-primary text-dark">
      <div v-if="onNavBtn[$route.name!.toString()]">
        <q-btn class="navigate__btn navigate__left absolute bg-dark">
          <q-icon size="45px" style="color: #ccc" name="arrow_back_ios_new" />
        </q-btn>
        <q-btn class="navigate__btn navigate__right absolute bg-dark">
          <q-icon size="45px" style="color: #ccc" name="arrow_forward_ios" />
        </q-btn>
      </div>
      <q-btn round @click="toggleLeftDrawer" class="absolute start-btn bg-dark">
        <q-icon size="120px" color="accent" name="fa-regular fa-circle-play" />
        <!-- timerページでpropsを受け取る -->
      </q-btn>
      <q-tabs align="justify">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

const onNavBtn: { [key: string]: true } = {
  'Monthly Summary': true,
  'Weekly Summary': true,
  'Daily Journal': true,
  'Chart': true,
};

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

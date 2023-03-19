import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('src/pages/HomePage.vue'),
      },
      {
        name: 'Timer',
        path: 'timer',
        component: () => import('src/pages/TimerPage.vue'),
      },
      {
        name: 'Summary',
        path: 'summary',
        component: () => import('src/pages/SummaryPage.vue'),
      },
      {
        path: 'summary',
        children: [
          {
            name: 'Monthly Summary',
            path: 'monthly',
            component: () => import('src/pages/MonthlyPage.vue'),
          },
          {
            name: 'Weekly Summary',
            path: 'weekly',
            component: () => import('src/pages/WeeklyPage.vue'),
          },
          {
            name: 'Chart',
            path: 'chart',
            component: () => import('src/pages/ChartPage.vue'),
          },
        ],
      },
      {
        name: 'Daily Journal',
        path: 'dailyJournal',
        component: () => import('src/pages/DailyJournal.vue'),
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () => import('src/pages/StoreSample.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

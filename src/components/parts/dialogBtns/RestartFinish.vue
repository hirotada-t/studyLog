<template>
  <q-btn
    target="_blank"
    @click="restartTimer"
    flat
    label="restart"
    color="primary"
  />
  <q-btn
    @click="emits('set-content')"
    to="/"
    flat
    label="finish"
    color="dark"
    class="bg-primary text-bold"
  />
</template>
<script setup lang="ts">
import { inject } from 'vue';

const restartTimer = inject<() => void>('restart-timer');
const emits = defineEmits<{ (e: 'set-content'): void }>();
</script>

<template>
  <q-btn
    target="_blank"
    @click="confirmReset"
    flat
    label="reset"
    color="primary"
  />
  <q-btn
    @click="emits('set-content')"
    to="/"
    label="finish"
    color="primary"
    text-color="dark"
    class="bg-primary text-bold"
  />
</template>
<script setup lang="ts">
import { inject } from 'vue';

const emits = defineEmits<{ (e: 'set-content'): void }>();
const resetTimer = inject<() => void>('reset-timer');
const confirmReset = () => {
  const answer = window.confirm(
    'Do you really want to reset? The result is deleted.'
  );
  if (answer) {
    if (resetTimer) resetTimer();
  }
};
</script>

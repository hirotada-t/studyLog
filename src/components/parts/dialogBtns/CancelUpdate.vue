<template>
  <q-btn
    target="_blank"
    @click="restartTimer"
    flat
    label="cancel"
    color="primary"
  />
  <q-btn
    @click="emits('update-content')"
    to="/"
    flat
    label="update"
    color="dark"
    class="bg-primary text-bold"
  />
</template>
<script setup lang="ts">
import { inject } from 'vue';

const restartTimer = inject<() => void>('restart-timer');
const emits = defineEmits<{ (e: 'update-content'): void }>();
</script>

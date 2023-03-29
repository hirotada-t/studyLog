<template>
  <q-btn
    target="_blank"
    @click="closeDialog!()"
    flat
    label="cancel"
    color="primary"
  />
  <q-btn
    @click="
      emits('update-content');
      closeDialog!();
    "
    label="update"
    color="primary"
    text-color="dark"
    class="bg-primary text-bold"
  />
</template>
<script setup lang="ts">
import { inject } from 'vue';

const closeDialog = inject<() => void>('close-dialog');
const emits = defineEmits<{ (e: 'update-content'): void }>();
</script>

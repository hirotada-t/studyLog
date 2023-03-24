<template>
  <p>Start : {{ store.today }} {{ formattedTime }}</p>
  <div class="">
    <span style="font-size: 90px; line-height: 0.7em">{{ time }}</span>
  </div>
</template>
<script setup lang="ts">
import { useLogStore } from 'src/store/logStore';
import { ref, watch } from 'vue';

const props = defineProps<{ time: string; formattedTime: string }>();
const store = useLogStore();

const formattedTime = ref<string>(props.formattedTime);
const time = ref<string>(props.time);

watch(
  () => props.time,
  (val) => {
    time.value = val;
  }
);
</script>

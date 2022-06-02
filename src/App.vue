<template>
  <div class="max-w-2xl mx-auto text-center">
    <div class="d-flex justify-content-center"><RouterView /></div>
  </div>

</template>

<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useTodonestStore } from '@/stores/todonestStore';
const store = useTodonestStore();

onMounted(() => {
  store.fillStore();
});
</script>

<style>
body {
  @apply bg-mako-400;
  @apply text-mako-50;
}
</style>

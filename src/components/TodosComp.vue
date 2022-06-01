<template>
  <div class="max-w-2xl mx-auto mt-8">
    <UncompletedTodosComp></UncompletedTodosComp>
    <CompletedTodosComp></CompletedTodosComp>
  </div>
</template>
<script setup>
import CompletedTodosComp from '@/components/CompletedTodosComp.vue';
import UncompletedTodosComp from '@/components/UncompletedTodosComp.vue';
</script>
<style></style>

<template>
  <div class="mt-10 flex min-h-screen flex-col">
    <div class="mb-20">
      <h1 class="my-7 text-xl sm:text-2xl font-bold">
        Welcome
        <br />
        <span>this is your <span class="text-highlight font-black uppercase">Todonest</span></span>
      </h1>
      <SearchbarComp></SearchbarComp>
      <TodosComp></TodosComp>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>

<script setup>
import SearchbarComp from '@/components/SearchbarComp.vue';
import TodosComp from '@/components/TodosComp.vue';
import FooterComp from '@/components/FooterComp.vue';
</script>

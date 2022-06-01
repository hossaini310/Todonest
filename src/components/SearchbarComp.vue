<template>
  <div class="max-w-2xl mx-auto">
    <form @submit.prevent="store.addTodo">
      <div class="flex row items-center justify-between w-full px-3">
        <div class="relative w-full mr-3">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <i class="fi fi-sr-plus mt-1 text-mako-200 opacity-text-60"></i>
          </div>
          <input
            maxlength="100"
            autocomplete="off"
            type="search"
            id="default-search"
            class="block p-4 pl-10 w-full text-sm text-mako-50 bg-mako-500 rounded-lg border-[2px] border-mako-600 focus:ring-0 focus:border-mako-600 focus:border-[2px] focus:outline-none"
            placeholder="Add a task... max 100 characters"
            required
            v-model="store.searchInput"
          />
        </div>
        <button
          class="border-1 border-highlight bg-highlight font-bold lg:font-black text-mako-50 rounded-lg px-4 lg:px-5 py-4 lg:py-4 whitespace-nowrap text-xs lg:text-sm uppercase hover:opacity-90"
        >
          Add Todo
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useTodonestStore } from '@/stores/todonestStore';
const store = useTodonestStore();
</script>

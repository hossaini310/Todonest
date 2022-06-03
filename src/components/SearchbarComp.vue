<template>
  <form @submit.prevent="store.addTodo">
    <div class="flex row items-center justify-between w-full px-3">
      <div class="relative w-full mr-3">
        <input
          maxlength="100"
          autocomplete="off"
          type="search"
          id="default-search"
          class="block p-4 w-full text-sm text-mako-50 bg-mako-500 rounded-lg border-[2px] border-mako-600 focus:ring-0 focus:border-mako-600 focus:border-[2px] focus:outline-none"
          placeholder="Add a task... max 100 characters"
          required
          v-model="store.searchInput"
        />
      </div>
      <button
        class="border-1 flex items-center border-highlight bg-highlight font-black text-mako-50 rounded-lg px-4 py-5 whitespace-nowrap text-xs uppercase hover:opacity-90"
      >
        <svg
          width="512"
          height="512"
          viewBox="0 0 512 512"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 mr-2 mb-px"
        >
          <path
            d="M467,211H301V45c0-24.8-20.1-45-45-45s-45,20.1-45,45V211H45c-24.8,0-45,20.1-45,45s20.1,45,45,45H211V467  c0,24.8,20.1,45,45,45s45-20.1,45-45V301H467c24.8,0,45-20.1,45-45S491.9,211,467,211z"
          ></path>
        </svg>
        Add
      </button>
    </div>
  </form>
</template>
<script setup>
import { useTodonestStore } from '@/stores/todonestStore';
const store = useTodonestStore();
</script>

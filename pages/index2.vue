<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <div class="relative">
    <label for="name" class="absolute left-2 inline-block bg-white px-1 text-xs text-gray-900 font-medium -top-2">Name</label>
    <div class="relative mt-2 flex items-center">
      <input id="search" type="text" name="search" class="block w-full border-0 rounded-md py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-indigo-600 focus:ring-inset">
      <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd class="inline-flex items-center border border-gray-200 rounded px-1 text-xs text-gray-400 font-sans">⌘K</kbd>
      </div>
    </div>
  </div>
</template>

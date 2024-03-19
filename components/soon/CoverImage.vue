<script setup lang='ts'>
interface Props {
  src: string
  alt: string
}
defineProps<Props>()
</script>

<template>
  <div class="relative">
    <img :src :alt class="w-full rounded-xl bg-gray-900/5 object-cover shadow-lg">
    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
  </div>
</template>

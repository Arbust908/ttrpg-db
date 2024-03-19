<script setup lang="ts">
interface Props {
  id: number
  title: string
  href: string
  description: string
  imageUrl: string
  date: string
  datetime: string
  author: {
    name: string
    imageUrl: string
  }
}
defineProps<Props>()
</script>

<template>
  <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 lg:pt-80 sm:pt-48">
    <img :src="post.imageUrl" alt="" class="absolute inset-0 h-full w-full object-cover -z-10">
    <div class="absolute inset-0 from-gray-900 via-gray-900/40 bg-gradient-to-t -z-10" />
    <div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset -z-10" />

    <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm text-gray-300 leading-6">
      <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
      <div class="flex items-center gap-x-4 -ml-4">
        <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-white/50 -ml-0.5">
          <circle cx="1" cy="1" r="1" />
        </svg>
        <div class="flex gap-x-2.5">
          <img :src="post.author.imageUrl" alt="" class="h-6 w-6 flex-none rounded-full bg-white/10">
          {{ post.author.name }}
        </div>
      </div>
    </div>
    <h3 class="mt-3 text-lg text-white font-semibold leading-6">
      <a :href="post.href">
        <span class="absolute inset-0" />
        {{ post.title }}
      </a>
    </h3>
  </article>
</template>

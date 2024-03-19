<script setup>
const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]
</script>

<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl text-gray-900 font-bold tracking-tight sm:text-4xl">
          From the blog
        </h2>
        <p class="mt-2 text-lg text-gray-600 leading-8">
          Learn how to grow your business with our expert advice.
        </p>
      </div>
      <div class="grid auto-rows-fr grid-cols-1 mx-auto mt-16 max-w-2xl gap-8 lg:grid-cols-3 lg:mx-0 sm:mt-20 lg:max-w-none">
        <SystemCard v-for="post in posts" :key="post.id" />
      </div>
    </div>
  </div>
</template>

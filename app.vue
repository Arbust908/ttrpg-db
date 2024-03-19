<script setup lang="ts">
import { appName } from '~/constants'

const isDark = useDark()
const isDev = import.meta.dev

useHead({
  title: appName,
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      href: isDev ? '/favicon_dev.png' : isDark.value ? '/favicon_dark.png' : '/favicon_light.png',
    },
  ],
  script: [{ 'src': 'https://plausible.io/js/script.js', 'defer': true, 'data-domain': 'ttrpg-db.com' }],
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout class="font-sans">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>

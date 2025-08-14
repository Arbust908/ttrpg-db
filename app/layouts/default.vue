<template>
  <div>
    <UHeader>
      <template #logo>
        <NuxtLink
          to="/"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-lucide-dice-6"
            class="w-6 h-6 text-primary"
          />
          <span class="font-bold text-lg">TTRPG DB</span>
        </NuxtLink>
      </template>

      <template #center>
        <UHeaderLinks
          :links="[
            { label: 'Home', to: '/' },
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Games', to: '/games' },
            {
              label: 'Manage',
              children: [
                { label: 'Mechanics', to: '/mechanics' },
                { label: 'Systems', to: '/systems' },
                { label: 'Families', to: '/families' },
                { label: 'Honors', to: '/honors' }
              ]
            }
          ]"
        />
      </template>

      <template #right>
        <UColorModeButton />
        <UButton
          icon="i-lucide-plus"
          label="Add Game"
          color="primary"
          to="/games/new"
          class="hidden sm:flex"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter>
      <template #left>
        <span class="text-sm text-gray-500">
          © 2025 TTRPG Database. All rights reserved.
        </span>
      </template>

      <template #right>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/about"
            class="text-sm hover:underline"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/help"
            class="text-sm hover:underline"
          >
            Help
          </NuxtLink>
          <NuxtLink
            to="https://github.com"
            target="_blank"
            class="text-sm hover:underline"
          >
            GitHub
          </NuxtLink>
        </div>
      </template>
    </UFooter>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
// Layout setup
</script>

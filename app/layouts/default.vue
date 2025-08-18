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

      <template>
        <div class="flex items-center gap-4">
          <ULink
            to="/"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Home
          </ULink>
          <ULink
            to="/dashboard"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Dashboard
          </ULink>
          <ULink
            to="/games"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Games
          </ULink>
          <UDropdownMenu>
            <UButton
              color="neutral"
              variant="ghost"
              trailing-icon="i-lucide-chevron-down"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Manage
            </UButton>
            <template #content>
              <ULink
                to="/mechanics"
                class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Mechanics
              </ULink>
              <ULink
                to="/systems"
                class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Systems
              </ULink>
              <ULink
                to="/families"
                class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Families
              </ULink>
              <ULink
                to="/honors"
                class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Honors
              </ULink>
            </template>
          </UDropdownMenu>
        </div>
      </template>

      <template #right>
        <div class="flex items-center gap-3">
          <UColorModeButton />

          <!-- User Authentication Status -->
          <div v-if="isAuthenticated" class="flex items-center gap-3">
            <UDropdown :items="userMenuItems">
              <UButton
                color="neutral"
                variant="ghost"
                :label="userEmail"
                trailing-icon="i-lucide-chevron-down"
                class="hidden sm:flex"
              />
              <template #account="{ item }">
                <div class="text-left">
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                  </p>
                  <p class="truncate text-xs text-gray-500 dark:text-gray-400">
                    {{ item.description }}
                  </p>
                </div>
              </template>
            </UDropdown>

            <UButton
              icon="i-lucide-plus"
              label="Add Game"
              color="primary"
              to="/games/new"
              class="hidden sm:flex"
            />
          </div>

          <!-- Login Button when not authenticated -->
          <div v-else class="flex items-center gap-3">
            <UButton
              label="Sign In"
              color="primary"
              variant="soft"
              to="/login"
            />
          </div>
        </div>
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

    <UToast />
  </div>
</template>

<script setup lang="ts">
// Composables
const { isAuthenticated, userEmail, signOut } = useAuth()
const router = useRouter()

// User menu items
const userMenuItems = computed(() => [
  [{
    slot: 'account',
    label: userEmail.value || 'User',
    description: 'Signed in',
    disabled: true
  }],
  [{
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    click: () => router.push('/dashboard')
  }, {
    label: 'My Games',
    icon: 'i-lucide-gamepad-2',
    click: () => router.push('/games')
  }],
  [{
    label: 'Settings',
    icon: 'i-lucide-settings',
    click: () => router.push('/settings'),
    disabled: true
  }],
  [{
    label: 'Sign Out',
    icon: 'i-lucide-log-out',
    click: async () => await signOut()
  }]
])
</script>

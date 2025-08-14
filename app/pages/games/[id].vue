<template>
  <UContainer>
    <!-- Loading State -->
    <div
      v-if="pending"
      class="space-y-4"
    >
      <USkeleton class="h-64 w-full" />
      <USkeleton class="h-32 w-full" />
      <USkeleton class="h-48 w-full" />
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="subtle"
      title="Error loading game"
      :description="error.message"
    />

    <!-- Game Details -->
    <div v-else-if="game">
      <!-- Header Section -->
      <div class="mb-8">
        <UBreadcrumb
          :links="[
            { label: 'Games', to: '/games' },
            { label: game.title }
          ]"
          class="mb-4"
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <UPageHeader
              :title="game.title"
              :description="game.subtitle"
            >
              <template #actions>
                <UButton
                  icon="i-lucide-edit"
                  label="Edit"
                  :to="`/games/${game.id}/edit`"
                />
                <UButton
                  icon="i-lucide-trash"
                  label="Delete"
                  color="error"
                  variant="subtle"
                  @click="handleDelete"
                />
              </template>
            </UPageHeader>

            <!-- Game Image -->
            <div
              v-if="game.image_url"
              class="mb-6"
            >
              <img
                :src="game.image_url"
                :alt="game.title"
                class="w-full max-w-2xl rounded-lg shadow-lg"
              >
            </div>

            <!-- Description -->
            <UCard
              v-if="game.description"
              class="mb-6"
            >
              <template #header>
                <h3 class="text-lg font-semibold">
                  Description
                </h3>
              </template>
              <p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {{ game.description }}
              </p>
            </UCard>

            <!-- Tabs for Related Data -->
            <UTabs
              :items="tabs"
              class="w-full"
            >
              <template #mechanics>
                <div class="py-4">
                  <div
                    v-if="game.rpg_mechanics?.length"
                    class="flex flex-wrap gap-2"
                  >
                    <UBadge
                      v-for="mechanic in game.rpg_mechanics"
                      :key="mechanic.id"
                      color="primary"
                      variant="subtle"
                      size="lg"
                    >
                      {{ mechanic.name }}
                    </UBadge>
                  </div>
                  <p
                    v-else
                    class="text-gray-500"
                  >
                    No mechanics listed
                  </p>
                </div>
              </template>

              <template #systems>
                <div class="py-4">
                  <div
                    v-if="game.rpg_systems?.length"
                    class="flex flex-wrap gap-2"
                  >
                    <UBadge
                      v-for="system in game.rpg_systems"
                      :key="system.id"
                      color="secondary"
                      variant="subtle"
                      size="lg"
                    >
                      {{ system.name }}
                    </UBadge>
                  </div>
                  <p
                    v-else
                    class="text-gray-500"
                  >
                    No systems listed
                  </p>
                </div>
              </template>

              <template #families>
                <div class="py-4">
                  <div
                    v-if="game.rpg_families?.length"
                    class="flex flex-wrap gap-2"
                  >
                    <UBadge
                      v-for="family in game.rpg_families"
                      :key="family.id"
                      color="success"
                      variant="subtle"
                      size="lg"
                    >
                      {{ family.name }}
                    </UBadge>
                  </div>
                  <p
                    v-else
                    class="text-gray-500"
                  >
                    No families listed
                  </p>
                </div>
              </template>

              <template #honors>
                <div class="py-4">
                  <div
                    v-if="game.honors?.length"
                    class="space-y-2"
                  >
                    <div
                      v-for="honor in game.honors"
                      :key="honor.id"
                      class="flex items-center gap-2"
                    >
                      <UIcon
                        name="i-lucide-award"
                        class="w-5 h-5 text-yellow-500"
                      />
                      <span>{{ honor.name }}</span>
                    </div>
                  </div>
                  <p
                    v-else
                    class="text-gray-500"
                  >
                    No honors listed
                  </p>
                </div>
              </template>

              <template #names>
                <div class="py-4 space-y-4">
                  <div v-if="game.primary_names?.length">
                    <h4 class="font-medium mb-2">
                      Primary Names
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <UBadge
                        v-for="name in game.primary_names"
                        :key="name.id"
                        color="neutral"
                        variant="subtle"
                      >
                        {{ name.name }}
                      </UBadge>
                    </div>
                  </div>

                  <div v-if="game.alternate_names?.length">
                    <h4 class="font-medium mb-2">
                      Alternate Names
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <UBadge
                        v-for="name in game.alternate_names"
                        :key="name.id"
                        color="neutral"
                        variant="outline"
                      >
                        {{ name.name }}
                      </UBadge>
                    </div>
                  </div>

                  <p
                    v-if="!game.primary_names?.length && !game.alternate_names?.length"
                    class="text-gray-500"
                  >
                    No alternate names listed
                  </p>
                </div>
              </template>
            </UTabs>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <UCard>
              <template #header>
                <h3 class="text-lg font-semibold">
                  Game Information
                </h3>
              </template>

              <div class="space-y-4">
                <!-- Year -->
                <div v-if="game.year">
                  <p class="text-sm text-gray-500 mb-1">
                    Year Published
                  </p>
                  <UBadge
                    color="neutral"
                    variant="subtle"
                    size="lg"
                  >
                    {{ game.year }}
                  </UBadge>
                </div>

                <!-- Ratings -->
                <div v-if="game.rating_average">
                  <p class="text-sm text-gray-500 mb-1">
                    Average Rating
                  </p>
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <UIcon
                        name="i-lucide-star"
                        class="w-5 h-5 text-yellow-500"
                      />
                      <span class="ml-1 text-lg font-medium">{{ game.rating_average.toFixed(2) }}</span>
                    </div>
                    <span
                      v-if="game.rating_voters"
                      class="text-sm text-gray-500"
                    >
                      ({{ game.rating_voters }} votes)
                    </span>
                  </div>
                </div>

                <!-- Geek Rating -->
                <div v-if="game.rating_geek">
                  <p class="text-sm text-gray-500 mb-1">
                    Geek Rating
                  </p>
                  <div class="flex items-center">
                    <UIcon
                      name="i-lucide-trending-up"
                      class="w-5 h-5 text-primary mr-1"
                    />
                    <span class="text-lg font-medium">{{ game.rating_geek.toFixed(2) }}</span>
                  </div>
                </div>

                <!-- Rank -->
                <div v-if="game.rank_position">
                  <p class="text-sm text-gray-500 mb-1">
                    Rank
                  </p>
                  <UBadge
                    color="primary"
                    variant="subtle"
                    size="lg"
                  >
                    #{{ game.rank_position }}
                  </UBadge>
                  <p
                    v-if="game.rank_category"
                    class="text-xs text-gray-500 mt-1"
                  >
                    {{ game.rank_category }}
                  </p>
                </div>

                <!-- External Link -->
                <div v-if="game.url">
                  <UButton
                    :to="game.url"
                    target="_blank"
                    external
                    block
                    color="primary"
                    variant="subtle"
                    icon="i-lucide-external-link"
                    label="View on BGG"
                  />
                </div>

                <!-- Timestamps -->
                <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-xs text-gray-500">
                    Added: {{ new Date(game.created_at).toLocaleDateString() }}
                  </p>
                  <p class="text-xs text-gray-500">
                    Updated: {{ new Date(game.updated_at).toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <UCard
      v-else
      class="text-center py-12"
    >
      <UIcon
        name="i-lucide-search-x"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium mb-2">
        Game not found
      </h3>
      <p class="text-gray-500 mb-4">
        The game you're looking for doesn't exist
      </p>
      <UButton
        label="Back to Games"
        icon="i-lucide-arrow-left"
        to="/games"
      />
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import type { GameWithRelations } from '#shared/database'

// Route params
const route = useRoute()
const gameId = computed(() => Number(route.params.id))

// Composables
const { fetchGameById, deleteGame } = useGames()
const toast = useToast()

// Fetch game data
const { data: gameResponse, pending, error } = await useAsyncData(
  `game-${gameId.value}`,
  () => fetchGameById(gameId.value)
)

// Extract game from response
const game = computed(() => gameResponse.value?.data as GameWithRelations | null)

// Tabs configuration
const tabs = computed(() => {
  const items = []

  if (game.value?.rpg_mechanics?.length) {
    items.push({
      key: 'mechanics',
      label: 'Mechanics',
      badge: game.value.rpg_mechanics.length
    })
  }

  if (game.value?.rpg_systems?.length) {
    items.push({
      key: 'systems',
      label: 'Systems',
      badge: game.value.rpg_systems.length
    })
  }

  if (game.value?.rpg_families?.length) {
    items.push({
      key: 'families',
      label: 'Families',
      badge: game.value.rpg_families.length
    })
  }

  if (game.value?.honors?.length) {
    items.push({
      key: 'honors',
      label: 'Honors',
      badge: game.value.honors.length
    })
  }

  if (game.value?.primary_names?.length || game.value?.alternate_names?.length) {
    const count = (game.value.primary_names?.length || 0) + (game.value.alternate_names?.length || 0)
    items.push({
      key: 'names',
      label: 'Names',
      badge: count
    })
  }

  // Always show at least one tab
  if (items.length === 0) {
    items.push(
      { key: 'mechanics', label: 'Mechanics' },
      { key: 'systems', label: 'Systems' },
      { key: 'families', label: 'Families' },
      { key: 'honors', label: 'Honors' },
      { key: 'names', label: 'Names' }
    )
  }

  return items
})

// Methods
const handleDelete = async () => {
  if (!game.value || !confirm(`Are you sure you want to delete "${game.value.title}"?`)) {
    return
  }

  const { error } = await deleteGame(game.value.id)

  if (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to delete game',
      color: 'error'
    })
  } else {
    toast.add({
      title: 'Success',
      description: 'Game deleted successfully',
      color: 'success'
    })
    await navigateTo('/games')
  }
}
</script>

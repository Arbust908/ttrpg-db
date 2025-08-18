<template>
  <div>
    <UDashboardPanel>
      <UDashboardNavbar title="TTRPG Database Dashboard">
        <template #right>
          <UButton
            icon="i-lucide-plus"
            label="Add Game"
            color="primary"
            to="/games/new"
          />
        </template>
      </UDashboardNavbar>

      <UContainer class="py-8">
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">
                  Total Games
                </p>
                <p class="text-2xl font-bold">
                  {{ stats.totalGames }}
                </p>
              </div>
              <UIcon
                name="i-lucide-gamepad-2"
                class="w-8 h-8 text-primary"
              />
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">
                  Average Rating
                </p>
                <p class="text-2xl font-bold">
                  {{ stats.avgRating?.toFixed(2) || '—' }}
                </p>
              </div>
              <UIcon
                name="i-lucide-star"
                class="w-8 h-8 text-yellow-500"
              />
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">
                  Total Mechanics
                </p>
                <p class="text-2xl font-bold">
                  {{ stats.totalMechanics }}
                </p>
              </div>
              <UIcon
                name="i-lucide-settings"
                class="w-8 h-8 text-blue-500"
              />
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">
                  Total Systems
                </p>
                <p class="text-2xl font-bold">
                  {{ stats.totalSystems }}
                </p>
              </div>
              <UIcon
                name="i-lucide-layers"
                class="w-8 h-8 text-green-500"
              />
            </div>
          </UCard>
        </div>

        <!-- Quick Actions -->
        <UPageSection
          title="Quick Actions"
          description="Manage your TTRPG database"
          class="mb-8"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <UPageCard
              title="Browse Games"
              description="View and search all games in your collection"
              icon="i-lucide-library"
              to="/games"
            />
            <UPageCard
              title="Add New Game"
              description="Add a new TTRPG to your database"
              icon="i-lucide-plus-circle"
              to="/games/new"
            />
            <UPageCard
              title="Manage Mechanics"
              description="View and edit RPG mechanics"
              icon="i-lucide-settings-2"
              to="/mechanics"
            />
            <UPageCard
              title="Manage Systems"
              description="View and edit RPG systems"
              icon="i-lucide-layers-2"
              to="/systems"
            />
            <UPageCard
              title="Manage Families"
              description="View and edit RPG families"
              icon="i-lucide-users"
              to="/families"
            />
            <UPageCard
              title="Search & Filter"
              description="Advanced search and filtering options"
              icon="i-lucide-search"
              to="/search"
            />
          </div>
        </UPageSection>

        <!-- Recent Games -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recently Added -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">
                  Recently Added
                </h3>
                <UButton
                  label="View All"
                  variant="link"
                  size="xs"
                  to="/games?sort=created_at"
                />
              </div>
            </template>

            <div
              v-if="recentGames.length > 0"
              class="space-y-3"
            >
              <div
                v-for="game in recentGames"
                :key="game.id"
                class="flex items-center gap-3"
              >
                <img
                  v-if="game.thumbnail"
                  :src="game.thumbnail"
                  :alt="game.title"
                  class="w-12 h-12 rounded object-cover"
                >
                <div
                  v-else
                  class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-image-off"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <NuxtLink
                    :to="`/games/${game.id}`"
                    class="font-medium hover:underline truncate block"
                  >
                    {{ game.title }}
                  </NuxtLink>
                  <p class="text-sm text-gray-500">
                    {{ game.year || 'Unknown year' }}
                  </p>
                </div>
                <UBadge
                  v-if="game.rating_average"
                  color="neutral"
                  variant="subtle"
                >
                  <UIcon
                    name="i-lucide-star"
                    class="w-3 h-3 mr-1"
                  />
                  {{ game.rating_average.toFixed(1) }}
                </UBadge>
              </div>
            </div>
            <p
              v-else
              class="text-gray-500 text-center py-4"
            >
              No games added yet
            </p>
          </UCard>

          <!-- Top Rated -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">
                  Top Rated
                </h3>
                <UButton
                  label="View All"
                  variant="link"
                  size="xs"
                  to="/games?sort=rating_average"
                />
              </div>
            </template>

            <div
              v-if="topRatedGames.length > 0"
              class="space-y-3"
            >
              <div
                v-for="game in topRatedGames"
                :key="game.id"
                class="flex items-center gap-3"
              >
                <img
                  v-if="game.thumbnail"
                  :src="game.thumbnail"
                  :alt="game.title"
                  class="w-12 h-12 rounded object-cover"
                >
                <div
                  v-else
                  class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-image-off"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <NuxtLink
                    :to="`/games/${game.id}`"
                    class="font-medium hover:underline truncate block"
                  >
                    {{ game.title }}
                  </NuxtLink>
                  <p class="text-sm text-gray-500">
                    {{ game.year || 'Unknown year' }}
                  </p>
                </div>
                <UBadge
                  color="primary"
                  variant="subtle"
                >
                  <UIcon
                    name="i-lucide-star"
                    class="w-3 h-3 mr-1"
                  />
                  {{ game.rating_average?.toFixed(1) || '—' }}
                </UBadge>
              </div>
            </div>
            <p
              v-else
              class="text-gray-500 text-center py-4"
            >
              No rated games yet
            </p>
          </UCard>
        </div>
      </UContainer>
    </UDashboardPanel>
  </div>
</template>

<script setup lang="ts">
import type { FullGameData } from '#shared/database'

// Apply auth middleware to protect this page
definePageMeta({
  middleware: 'auth'
})

// Composables
const supabase = useSupabaseClient()
const { fetchGames } = useGames()

// Fetch statistics
const { data: stats } = await useAsyncData('dashboard-stats', async () => {
  const [gamesCount, avgRating, mechanicsCount, systemsCount] = await Promise.all([
    // Total games count
    supabase
      .from('full_game_data')
      .select('*', { count: 'exact', head: true }),

    // Average rating
    supabase
      .from('full_game_data')
      .select('rating_average')
      .not('rating_average', 'is', null),

    // Total mechanics
    supabase
      .from('rpg_mechanics')
      .select('*', { count: 'exact', head: true }),

    // Total systems
    supabase
      .from('rpg_systems')
      .select('*', { count: 'exact', head: true })
  ])

  // Calculate average rating
  let avgRatingValue = null
  if (avgRating.data && avgRating.data.length > 0) {
    const sum = avgRating.data.reduce((acc: number, game: any) => acc + (game.rating_average || 0), 0)
    avgRatingValue = sum / avgRating.data.length
  }

  return {
    totalGames: gamesCount.count || 0,
    avgRating: avgRatingValue,
    totalMechanics: mechanicsCount.count || 0,
    totalSystems: systemsCount.count || 0
  }
})

// Fetch recent games
const { data: recentGamesData } = await useAsyncData('recent-games', () =>
  fetchGames({
    page: 1,
    limit: 5,
    sortBy: 'created_at',
    sortOrder: 'desc'
  })
)

// Fetch top rated games
const { data: topRatedGamesData } = await useAsyncData('top-rated-games', () =>
  fetchGames({
    page: 1,
    limit: 5,
    sortBy: 'rating_average',
    sortOrder: 'desc'
  })
)

// Computed
const recentGames = computed(() => recentGamesData.value?.data || [])
const topRatedGames = computed(() => topRatedGamesData.value?.data || [])
</script>

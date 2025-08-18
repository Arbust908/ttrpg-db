<template>
  <UContainer>
    <UPageHeader
      title="TTRPG Games Database"
      description="Browse and manage your tabletop RPG collection"
    />

    <!-- Search and Filters -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <UInput
        v-model="search"
        placeholder="Search games..."
        icon="i-lucide-search"
        size="lg"
        class="flex-1"
        @input="debouncedSearch"
      />

      <USelectMenu
        v-model="sortBy"
        :options="sortOptions"
        placeholder="Sort by"
        size="lg"
        class="w-full sm:w-48"
      />

      <UButton
        :icon="sortOrder === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
        size="lg"
        color="neutral"
        variant="subtle"
        @click="toggleSortOrder"
      />
    </div>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="space-y-4"
    >
      <USkeleton
        v-for="i in 5"
        :key="i"
        class="h-24 w-full"
      />
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="subtle"
      title="Error loading games"
      :description="error.message"
    />

    <!-- Games Table -->
    <div v-else-if="games && games.length > 0">
      <div
        v-for="game in games"
        :key="game.id"
        class="mb-4"
      >
        <UCard
          :ui="{ body: 'flex items-center gap-4' }"
        >
          <div class="p-4 rounded-md bg-gray-800 relative">
            <UBadge class="absolute -top-2 -left-2 aspect-square" :label="game.rank_position" />
            <img
              :src="game.image_url"
              alt="Game Cover"
              class="size-20 object-contain"
              loading="lazy"
            >
          </div>
          <div class="">
            <h3 class="text-lg font-semibold">
              {{ game.title }}
            </h3>
            <p class="text-gray-500">{{ game.subtitle }}</p>
            <p class="text-gray-600 mt-2">
              Rating: {{ game.rating_average }}
            </p>
          </div>
        </UCard>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="pageSize"
          :total="totalGames"
        />
      </div>
    </div>

    <!-- Empty State -->
    <UCard
      v-else
      class="text-center py-12"
    >
      <UIcon
        name="i-lucide-database"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium mb-2">
        No games found
      </h3>
      <p class="text-gray-500 mb-4">
        Try adjusting your search or filters
      </p>
      <UButton
        label="Add First Game"
        icon="i-lucide-plus"
        to="/games/new"
      />
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'

// State
const search = ref('')
const sortBy = ref('rank_position')
const sortOrder = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const pageSize = 20

// Composables
const { fetchGames } = useGames()

// Sort options
const sortOptions = [
  { label: 'Title', value: 'title' },
  { label: 'Rating', value: 'rating_average' },
  { label: 'Rank', value: 'rank_position' },
  { label: 'Recently Added', value: 'created_at' }
]

// Fetch games
const { data, pending, error, refresh } = await useAsyncData(
  'games-list',
  async () => {
    const response = await fetchGames({
      page: currentPage.value,
      limit: pageSize,
      search: search.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    })
    return response
  },
  {
    watch: [currentPage, sortBy, sortOrder]
  }
)

// Computed
const games = computed(() => data.value?.data || [])
const totalGames = computed(() => data.value?.count || 0)

// Methods
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const debouncedSearch = debounce(() => {
  currentPage.value = 1
  refresh()
}, 300)
</script>

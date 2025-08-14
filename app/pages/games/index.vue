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
      <!-- Simple table without custom templates to test -->
      <UTable
        :data="games"
        :columns="simpleColumns"
        class="w-full"
      />

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
  { label: 'Year', value: 'year' },
  { label: 'Rating', value: 'rating_average' },
  { label: 'Rank', value: 'rank_position' },
  { label: 'Recently Added', value: 'created_at' }
]

// Table columns - using accessorKey as per Nuxt UI documentation
const simpleColumns = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'year', header: 'Year' },
  { accessorKey: 'rating_average', header: 'Rating' },
  { accessorKey: 'rank_position', header: 'Rank' }
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

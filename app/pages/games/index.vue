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
      <UTable
        :columns="columns"
        :rows="games"
        class="w-full"
      >
        <!-- Thumbnail Column -->
        <template #thumbnail-data="{ row }">
          <div class="w-16 h-16">
            <img
              v-if="row.thumbnail"
              :src="row.thumbnail"
              :alt="row.title"
              class="w-full h-full object-cover rounded"
            >
            <div
              v-else
              class="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-image-off"
                class="w-6 h-6 text-gray-400"
              />
            </div>
          </div>
        </template>

        <!-- Title Column -->
        <template #title-data="{ row }">
          <div>
            <NuxtLink
              :to="`/games/${row.id}`"
              class="font-medium text-primary hover:underline"
            >
              {{ row.title }}
            </NuxtLink>
            <div
              v-if="row.subtitle"
              class="text-sm text-gray-500"
            >
              {{ row.subtitle }}
            </div>
          </div>
        </template>

        <!-- Year Column -->
        <template #year-data="{ row }">
          <UBadge
            v-if="row.year"
            color="neutral"
            variant="subtle"
          >
            {{ row.year }}
          </UBadge>
          <span
            v-else
            class="text-gray-400"
          >—</span>
        </template>

        <!-- Rating Column -->
        <template #rating-data="{ row }">
          <div class="flex items-center gap-2">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-star"
                class="w-4 h-4 text-yellow-500"
              />
              <span class="ml-1">{{ row.rating_average?.toFixed(1) || '—' }}</span>
            </div>
            <span
              v-if="row.rating_voters"
              class="text-xs text-gray-500"
            >
              ({{ row.rating_voters }})
            </span>
          </div>
        </template>

        <!-- Rank Column -->
        <template #rank-data="{ row }">
          <div v-if="row.rank_position">
            <UBadge
              color="primary"
              variant="subtle"
            >
              #{{ row.rank_position }}
            </UBadge>
            <div
              v-if="row.rank_category"
              class="text-xs text-gray-500 mt-1"
            >
              {{ row.rank_category }}
            </div>
          </div>
          <span
            v-else
            class="text-gray-400"
          >—</span>
        </template>

        <!-- Actions Column -->
        <template #actions-data="{ row }">
          <UDropdownMenu :items="getActionItems(row)">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-more-vertical"
              size="xs"
            />
          </UDropdownMenu>
        </template>
      </UTable>

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
import type { FullGameData } from '#shared/database'

// State
const search = ref('')
const sortBy = ref('title')
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

// Table columns
const columns = [
  { key: 'thumbnail', label: '' },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'year', label: 'Year', sortable: true },
  { key: 'rating', label: 'Rating', sortable: true },
  { key: 'rank', label: 'Rank', sortable: true },
  { key: 'actions', label: '' }
]

// Fetch games
const { data, pending, error, refresh } = await useAsyncData(
  'games-list',
  () => fetchGames({
    page: currentPage.value,
    limit: pageSize,
    search: search.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value
  }),
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

const getActionItems = (game: FullGameData) => [
  [{
    label: 'View Details',
    icon: 'i-lucide-eye',
    click: () => navigateTo(`/games/${game.id}`)
  }],
  [{
    label: 'Edit',
    icon: 'i-lucide-edit',
    click: () => navigateTo(`/games/${game.id}/edit`)
  }],
  [{
    label: 'Duplicate',
    icon: 'i-lucide-copy',
    click: () => console.log('Duplicate', game.id)
  }],
  [{
    label: 'Delete',
    icon: 'i-lucide-trash',
    click: () => console.log('Delete', game.id)
  }]
]
</script>

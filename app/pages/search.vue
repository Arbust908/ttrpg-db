<template>
  <UContainer>
    <UPageHeader
      title="Advanced Search"
      description="Find games using multiple filters and search criteria"
    />

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">
                Filters
              </h3>
              <UButton
                label="Clear"
                variant="ghost"
                size="xs"
                @click="clearFilters"
              />
            </div>
          </template>

          <div class="space-y-4">
            <!-- Search Input -->
            <div>
              <label class="block text-sm font-medium mb-2">Search</label>
              <UInput
                v-model="filters.search"
                placeholder="Game title or description..."
                icon="i-lucide-search"
              />
            </div>

            <!-- Year Range -->
            <div>
              <label class="block text-sm font-medium mb-2">Year Range</label>
              <div class="flex gap-2">
                <UInput
                  v-model.number="filters.yearFrom"
                  type="number"
                  placeholder="From"
                  min="1970"
                  :max="currentYear"
                />
                <UInput
                  v-model.number="filters.yearTo"
                  type="number"
                  placeholder="To"
                  min="1970"
                  :max="currentYear"
                />
              </div>
            </div>

            <!-- Rating Range -->
            <div>
              <label class="block text-sm font-medium mb-2">
                Minimum Rating
              </label>
              <USlider
                v-model="filters.minRating"
                :min="0"
                :max="10"
                :step="0.5"
              />
              <div class="text-sm text-gray-500 mt-1">
                {{ filters.minRating }} / 10
              </div>
            </div>

            <!-- Has Rank -->
            <div>
              <UCheckbox
                v-model="filters.hasRank"
                label="Only ranked games"
              />
            </div>

            <!-- Sort Options -->
            <div>
              <label class="block text-sm font-medium mb-2">Sort By</label>
              <USelectMenu
                v-model="filters.sortBy"
                :options="sortOptions"
                value-attribute="value"
                option-attribute="label"
              />
            </div>

            <!-- Sort Order -->
            <div>
              <label class="block text-sm font-medium mb-2">Order</label>
              <URadioGroup
                v-model="filters.sortOrder"
                :options="[
                  { value: 'asc', label: 'Ascending' },
                  { value: 'desc', label: 'Descending' }
                ]"
              />
            </div>
          </div>

          <template #footer>
            <UButton
              label="Apply Filters"
              color="primary"
              block
              @click="applyFilters"
            />
          </template>
        </UCard>
      </div>

      <!-- Results -->
      <div class="lg:col-span-3">
        <!-- Results Header -->
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm text-gray-500">
            <span v-if="!pending">
              Found {{ totalResults }} game{{ totalResults !== 1 ? 's' : '' }}
            </span>
          </p>

          <div class="flex items-center gap-2">
            <UButtonGroup>
              <UButton
                :icon="viewMode === 'grid' ? 'i-lucide-grid' : 'i-lucide-grid'"
                :color="viewMode === 'grid' ? 'primary' : 'neutral'"
                variant="subtle"
                @click="viewMode = 'grid'"
              />
              <UButton
                :icon="viewMode === 'list' ? 'i-lucide-list' : 'i-lucide-list'"
                :color="viewMode === 'list' ? 'primary' : 'neutral'"
                variant="subtle"
                @click="viewMode = 'list'"
              />
            </UButtonGroup>
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="pending"
          class="space-y-4"
        >
          <USkeleton
            v-for="i in 6"
            :key="i"
            class="h-32 w-full"
          />
        </div>

        <!-- Grid View -->
        <div
          v-else-if="viewMode === 'grid' && results.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <UCard
            v-for="game in results"
            :key="game.id"
            :to="`/games/${game.id}`"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="aspect-video mb-4 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
              <img
                v-if="game.thumbnail"
                :src="game.thumbnail"
                :alt="game.title"
                class="w-full h-full object-cover"
              >
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <UIcon
                  name="i-lucide-image-off"
                  class="w-12 h-12 text-gray-400"
                />
              </div>
            </div>

            <h3 class="font-semibold mb-1 line-clamp-1">
              {{ game.title }}
            </h3>
            <p
              v-if="game.subtitle"
              class="text-sm text-gray-500 mb-2 line-clamp-1"
            >
              {{ game.subtitle }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UBadge
                  v-if="game.year"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  {{ game.year }}
                </UBadge>
                <UBadge
                  v-if="game.rank_position"
                  color="primary"
                  variant="subtle"
                  size="xs"
                >
                  #{{ game.rank_position }}
                </UBadge>
              </div>
              <div
                v-if="game.rating_average"
                class="flex items-center text-sm"
              >
                <UIcon
                  name="i-lucide-star"
                  class="w-4 h-4 text-yellow-500 mr-1"
                />
                {{ game.rating_average.toFixed(1) }}
              </div>
            </div>
          </UCard>
        </div>

        <!-- List View -->
        <div
          v-else-if="viewMode === 'list' && results.length > 0"
          class="space-y-4"
        >
          <UCard
            v-for="game in results"
            :key="game.id"
            :to="`/games/${game.id}`"
            class="hover:shadow-lg transition-shadow"
          >
            <div class="flex gap-4">
              <div class="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                <img
                  v-if="game.thumbnail"
                  :src="game.thumbnail"
                  :alt="game.title"
                  class="w-full h-full object-cover"
                >
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-image-off"
                    class="w-8 h-8 text-gray-400"
                  />
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-semibold mb-1">
                  {{ game.title }}
                </h3>
                <p
                  v-if="game.subtitle"
                  class="text-sm text-gray-500 mb-2"
                >
                  {{ game.subtitle }}
                </p>
                <p
                  v-if="game.description"
                  class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2"
                >
                  {{ game.description }}
                </p>

                <div class="flex items-center gap-3 text-sm">
                  <span
                    v-if="game.year"
                    class="text-gray-500"
                  >
                    Year: {{ game.year }}
                  </span>
                  <span
                    v-if="game.rating_average"
                    class="flex items-center"
                  >
                    <UIcon
                      name="i-lucide-star"
                      class="w-4 h-4 text-yellow-500 mr-1"
                    />
                    {{ game.rating_average.toFixed(1) }}
                  </span>
                  <UBadge
                    v-if="game.rank_position"
                    color="primary"
                    variant="subtle"
                    size="xs"
                  >
                    Rank #{{ game.rank_position }}
                  </UBadge>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Empty State -->
        <UCard
          v-else
          class="text-center py-12"
        >
          <UIcon
            name="i-lucide-search-x"
            class="w-12 h-12 text-gray-400 mx-auto mb-4"
          />
          <h3 class="text-lg font-medium mb-2">
            No games found
          </h3>
          <p class="text-gray-500">
            Try adjusting your filters or search criteria
          </p>
        </UCard>

        <!-- Pagination -->
        <div
          v-if="results.length > 0"
          class="mt-6 flex justify-center"
        >
          <UPagination
            v-model="currentPage"
            :page-count="pageSize"
            :total="totalResults"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { FullGameData } from '#shared/database'

// State
const currentYear = new Date().getFullYear()
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const pageSize = 12

// Filters
const filters = reactive({
  search: '',
  yearFrom: null as number | null,
  yearTo: null as number | null,
  minRating: 0,
  hasRank: false,
  sortBy: 'title',
  sortOrder: 'asc' as 'asc' | 'desc'
})

// Sort options
const sortOptions = [
  { label: 'Title', value: 'title' },
  { label: 'Year', value: 'year' },
  { label: 'Rating', value: 'rating_average' },
  { label: 'Rank', value: 'rank_position' },
  { label: 'Recently Added', value: 'created_at' },
  { label: 'Recently Updated', value: 'updated_at' }
]

// Composables
const supabase = useSupabaseClient()

// Fetch filtered results
const { data, pending, refresh } = await useAsyncData(
  'search-results',
  async () => {
    let query = supabase
      .from('full_game_data')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,subtitle.ilike.%${filters.search}%`)
    }

    // Apply year range filter
    if (filters.yearFrom) {
      query = query.gte('year', filters.yearFrom)
    }
    if (filters.yearTo) {
      query = query.lte('year', filters.yearTo)
    }

    // Apply rating filter
    if (filters.minRating > 0) {
      query = query.gte('rating_average', filters.minRating)
    }

    // Apply rank filter
    if (filters.hasRank) {
      query = query.not('rank_position', 'is', null)
    }

    // Apply sorting
    query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' })

    // Apply pagination
    const from = (currentPage.value - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    return {
      data: data as FullGameData[],
      count,
      error
    }
  },
  {
    watch: [currentPage]
  }
)

// Computed
const results = computed(() => data.value?.data || [])
const totalResults = computed(() => data.value?.count || 0)

// Methods
const applyFilters = () => {
  currentPage.value = 1
  refresh()
}

const clearFilters = () => {
  filters.search = ''
  filters.yearFrom = null
  filters.yearTo = null
  filters.minRating = 0
  filters.hasRank = false
  filters.sortBy = 'title'
  filters.sortOrder = 'asc'
  currentPage.value = 1
  refresh()
}
</script>

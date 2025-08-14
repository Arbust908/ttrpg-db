# Sprint 5: User Experience Enhancement

**Duration**: 5 days (Week 5)  
**Prerequisites**: Sprint 4 completed  
**Goal**: Polish UI/UX and add personal collection features using localStorage

## Objectives
1. Implement personal collection management (no accounts)
2. Add wishlist and comparison features
3. Polish UI with animations and transitions
4. Ensure mobile-first responsive design
5. Add keyboard shortcuts and accessibility

## User Stories

### As a User
- I want to track which games I own
- I need a wishlist for games I want
- I want to compare games side-by-side
- I expect smooth, polished interactions
- I need the site to work perfectly on mobile

### As a Power User
- I want keyboard shortcuts for navigation
- I need to export my collection data
- I want to see my viewing history
- I need quick access to favorite games

## Technical Tasks

### 1. Personal Collections (Days 1-2)

#### Task 1.1: Collection Management
```typescript
// composables/useCollection.ts
export const useCollection = () => {
  const owned = useLocalStorage<string[]>('owned-games', [])
  const wishlist = useLocalStorage<string[]>('wishlist-games', [])
  const favorites = useLocalStorage<string[]>('favorite-games', [])
  const recentlyViewed = useLocalStorage<RecentView[]>('recently-viewed', [])
  
  const addToOwned = (gameId: string) => {
    if (!owned.value.includes(gameId)) {
      owned.value.push(gameId)
      // Remove from wishlist if present
      removeFromWishlist(gameId)
    }
  }
  
  const addToWishlist = (gameId: string) => {
    if (!wishlist.value.includes(gameId)) {
      wishlist.value.push(gameId)
    }
  }
  
  const toggleFavorite = (gameId: string) => {
    const index = favorites.value.indexOf(gameId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(gameId)
    }
  }
  
  const trackView = (game: Game) => {
    recentlyViewed.value = [
      { gameId: game.id, title: game.title, timestamp: Date.now() },
      ...recentlyViewed.value.filter(v => v.gameId !== game.id)
    ].slice(0, 20) // Keep last 20
  }
  
  return {
    owned,
    wishlist,
    favorites,
    recentlyViewed,
    addToOwned,
    addToWishlist,
    toggleFavorite,
    trackView,
    isOwned: (id: string) => owned.value.includes(id),
    isWishlisted: (id: string) => wishlist.value.includes(id),
    isFavorite: (id: string) => favorites.value.includes(id)
  }
}
```

#### Task 1.2: Collection UI Components
```vue
<!-- app/components/CollectionButtons.vue -->
<template>
  <div class="flex gap-2">
    <!-- Owned Toggle -->
    <UTooltip text="Mark as Owned">
      <UButton
        :color="isOwned ? 'primary' : 'gray'"
        :variant="isOwned ? 'solid' : 'outline'"
        icon="i-lucide-check-circle"
        @click="toggleOwned"
      >
        {{ isOwned ? 'Owned' : 'Own' }}
      </UButton>
    </UTooltip>
    
    <!-- Wishlist Toggle -->
    <UTooltip text="Add to Wishlist">
      <UButton
        :color="isWishlisted ? 'red' : 'gray'"
        :variant="isWishlisted ? 'solid' : 'outline'"
        icon="i-lucide-heart"
        @click="toggleWishlist"
      >
        {{ isWishlisted ? 'Wishlisted' : 'Want' }}
      </UButton>
    </UTooltip>
    
    <!-- Favorite Toggle -->
    <UTooltip text="Mark as Favorite">
      <UButton
        :color="isFavorite ? 'yellow' : 'gray'"
        :variant="isFavorite ? 'solid' : 'outline'"
        icon="i-lucide-star"
        @click="toggleFavorite"
        square
      />
    </UTooltip>
  </div>
</template>
```

### 2. Game Comparison (Day 2)

#### Task 2.1: Comparison Tool
```vue
<!-- app/pages/compare.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Compare Games</h1>
    
    <!-- Game Selection -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <GameSelector
        v-for="i in 4"
        :key="i"
        v-model="selectedGames[i-1]"
        :exclude="selectedGames.filter((_, idx) => idx !== i-1)"
      />
    </div>
    
    <!-- Comparison Table -->
    <ComparisonTable
      v-if="selectedGames.filter(Boolean).length >= 2"
      :games="selectedGames.filter(Boolean)"
      :attributes="comparisonAttributes"
    />
  </div>
</template>

<script setup>
const comparisonAttributes = [
  { key: 'year', label: 'Year Published' },
  { key: 'playerCount', label: 'Player Count' },
  { key: 'playTime', label: 'Play Time' },
  { key: 'complexity', label: 'Complexity' },
  { key: 'averageRating', label: 'Average Rating' },
  { key: 'mechanics', label: 'Mechanics', type: 'list' },
  { key: 'publisher', label: 'Publisher' }
]
</script>
```

### 3. UI Polish & Animations (Days 3-4)

#### Task 3.1: Micro-interactions
```vue
<!-- app/components/GameCard.vue -->
<template>
  <div
    class="game-card group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
    @mouseenter="prefetchGameData"
  >
    <!-- Quick Actions on Hover -->
    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <QuickActions :game="game" />
    </div>
    
    <!-- Image with Loading State -->
    <div class="aspect-[3/4] relative">
      <USkeleton v-if="!imageLoaded" class="absolute inset-0" />
      <NuxtImg
        :src="game.coverImage"
        @load="imageLoaded = true"
        class="w-full h-full object-cover transition-transform group-hover:scale-110"
      />
    </div>
    
    <!-- Content -->
    <div class="p-4">
      <h3 class="font-semibold truncate">{{ game.title }}</h3>
      <p class="text-sm text-gray-600">{{ game.year }}</p>
      
      <!-- Rating with Animation -->
      <div class="flex items-center gap-1 mt-2">
        <UIcon name="i-lucide-star" class="text-yellow-500" />
        <span class="text-sm">
          <AnimatedNumber :value="game.averageRating" />
        </span>
      </div>
    </div>
    
    <!-- Collection Badges -->
    <CollectionBadges :game-id="game.id" />
  </div>
</template>
```

#### Task 3.2: Loading States
```vue
<!-- app/components/LoadingSkeleton.vue -->
<template>
  <div class="animate-pulse">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="space-y-3">
        <USkeleton class="h-48 w-full" />
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-4 w-1/2" />
      </div>
    </div>
  </div>
</template>
```

#### Task 3.3: Toast Notifications
```typescript
// composables/useToast.ts
export const useToast = () => {
  const toast = useNuxtApp().$toast
  
  const success = (message: string) => {
    toast.add({
      title: 'Success',
      description: message,
      icon: 'i-lucide-check-circle',
      color: 'green',
      timeout: 3000
    })
  }
  
  const gameAdded = (game: string, collection: string) => {
    toast.add({
      title: `Added to ${collection}`,
      description: `${game} has been added to your ${collection}`,
      icon: 'i-lucide-plus-circle',
      color: 'primary',
      timeout: 3000,
      actions: [{
        label: 'Undo',
        click: () => undoLastAction()
      }]
    })
  }
  
  return { success, gameAdded, error, info }
}
```

### 4. Mobile Optimization (Day 4)

#### Task 4.1: Responsive Navigation
```vue
<!-- app/components/MobileNav.vue -->
<template>
  <div class="lg:hidden">
    <!-- Mobile Menu Button -->
    <UButton
      icon="i-lucide-menu"
      @click="mobileMenuOpen = true"
      variant="ghost"
      square
    />
    
    <!-- Slide-over Menu -->
    <USlideover v-model="mobileMenuOpen">
      <div class="p-4">
        <!-- Search Bar -->
        <SearchInput class="mb-4" />
        
        <!-- Navigation -->
        <nav class="space-y-2">
          <MobileNavItem
            v-for="item in navigation"
            :key="item.path"
            :item="item"
            @click="mobileMenuOpen = false"
          />
        </nav>
        
        <!-- Collections -->
        <div class="mt-6 pt-6 border-t">
          <h3 class="font-semibold mb-3">My Collection</h3>
          <CollectionStats />
        </div>
      </div>
    </USlideover>
  </div>
</template>
```

#### Task 4.2: Touch Gestures
```typescript
// composables/useSwipe.ts
export const useSwipe = (element: Ref<HTMLElement>) => {
  let touchStartX = 0
  let touchEndX = 0
  
  const handleSwipe = () => {
    const swipeDistance = touchEndX - touchStartX
    
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        // Swipe right
        emit('swipe-right')
      } else {
        // Swipe left
        emit('swipe-left')
      }
    }
  }
  
  onMounted(() => {
    element.value?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX
    })
    
    element.value?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })
  })
}
```

### 5. Keyboard Navigation & Accessibility (Day 5)

#### Task 5.1: Keyboard Shortcuts
```typescript
// plugins/keyboardShortcuts.client.ts
export default defineNuxtPlugin(() => {
  const router = useRouter()
  
  // Global keyboard shortcuts
  useMagicKeys({
    // Search focus
    '/': () => {
      document.querySelector<HTMLInputElement>('#search-input')?.focus()
    },
    
    // Navigation
    'g h': () => router.push('/'),
    'g g': () => router.push('/games'),
    'g s': () => router.push('/search'),
    'g c': () => router.push('/compare'),
    
    // Actions
    'Escape': () => {
      // Close modals, clear search, etc.
      closeAllModals()
    }
  })
})
```

#### Task 5.2: Accessibility Improvements
```vue
<!-- Accessibility enhancements -->
<template>
  <div>
    <!-- Skip to content -->
    <a href="#main" class="sr-only focus:not-sr-only">
      Skip to main content
    </a>
    
    <!-- ARIA labels -->
    <nav aria-label="Main navigation">
      <!-- ... -->
    </nav>
    
    <!-- Focus management -->
    <div
      role="region"
      aria-label="Game collection"
      tabindex="-1"
      ref="gameList"
    >
      <!-- ... -->
    </div>
    
    <!-- Screen reader announcements -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ announcement }}
    </div>
  </div>
</template>
```

## Implementation Checklist

### Days 1-2: Collections
- [ ] Implement localStorage collections
- [ ] Create collection UI components
- [ ] Add collection badges
- [ ] Build comparison tool
- [ ] Test data persistence

### Days 3-4: UI Polish
- [ ] Add micro-interactions
- [ ] Implement loading states
- [ ] Create toast notifications
- [ ] Add animations
- [ ] Mobile optimization

### Day 5: Accessibility
- [ ] Add keyboard shortcuts
- [ ] Improve ARIA labels
- [ ] Test screen reader
- [ ] Focus management
- [ ] Color contrast check

## Acceptance Criteria

### Collection Features
- ✅ Collections persist in localStorage
- ✅ Can mark games as owned/wishlisted
- ✅ Comparison tool works
- ✅ Export collection data

### UI/UX
- ✅ Smooth animations
- ✅ Loading states everywhere
- ✅ Toast notifications working
- ✅ Mobile responsive

### Accessibility
- ✅ Keyboard navigation works
- ✅ WCAG 2.1 AA compliant
- ✅ Screen reader tested
- ✅ Focus indicators visible

## Dependencies
- localStorage API
- Animation libraries
- Touch gesture support
- Keyboard event handling

## Definition of Done
- [ ] Collections fully functional
- [ ] UI polished and smooth
- [ ] Mobile experience excellent
- [ ] Accessibility standards met
- [ ] Keyboard shortcuts working
- [ ] Performance maintained
- [ ] Documentation updated

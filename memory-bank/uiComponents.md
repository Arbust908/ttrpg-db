# UI Components Documentation

## Overview
The TTRPG Database uses Nuxt UI Pro components for a consistent, accessible, and modern user interface. This document outlines the UI components used throughout the application.

## Component Library: Nuxt UI Pro

### Core Components Used
- **Layout Components**: UContainer, UPageHeader, UPageSection, UPageCTA
- **Navigation**: UDashboardPanel, UDashboardNavbar, UButton
- **Data Display**: UTable, UCard, UBadge, USkeleton
- **Forms**: UInput, USelectMenu, UTextarea
- **Feedback**: UAlert, UIcon
- **Utility**: UPagination

## Page Layouts

### Default Layout
**Location**: `app/layouts/default.vue`

**Structure:**
```vue
<template>
  <div>
    <!-- Navigation header -->
    <!-- Main content slot -->
    <slot />
    <!-- Footer (if needed) -->
  </div>
</template>
```

## Page Components

### 1. Landing Page
**Location**: `app/pages/index.vue`

**Components Used:**
- `UPageHero` - Hero section with title and CTAs
- `UPageSection` - Feature sections
- `UPageCTA` - Call-to-action section

**Key Features:**
```vue
<UPageHero
  title="TTRPG Database"
  description="Manage and explore your collection"
  :links="[
    { label: 'Browse Games', to: '/games' },
    { label: 'Dashboard', to: '/dashboard' }
  ]"
/>
```

### 2. Dashboard
**Location**: `app/pages/dashboard.vue`

**Components Used:**
- `UDashboardPanel` - Main dashboard wrapper
- `UDashboardNavbar` - Dashboard navigation
- `UCard` - Statistics cards
- `UPageCard` - Quick action cards
- `UIcon` - Icons for visual elements
- `UBadge` - Rating badges

**Statistics Cards Pattern:**
```vue
<UCard>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm text-gray-500 mb-1">Total Games</p>
      <p class="text-2xl font-bold">{{ stats.totalGames }}</p>
    </div>
    <UIcon name="i-lucide-gamepad-2" class="w-8 h-8 text-primary" />
  </div>
</UCard>
```

**Quick Actions Pattern:**
```vue
<UPageCard
  title="Browse Games"
  description="View and search all games"
  icon="i-lucide-library"
  to="/games"
/>
```

### 3. Games List
**Location**: `app/pages/games/index.vue`

**Components Used:**
- `UContainer` - Page container
- `UPageHeader` - Page title and description
- `UInput` - Search input
- `USelectMenu` - Sort dropdown
- `UButton` - Sort order toggle
- `UTable` - Games table
- `UPagination` - Pagination controls
- `USkeleton` - Loading states
- `UAlert` - Error messages

**Search Bar Pattern:**
```vue
<UInput
  v-model="search"
  placeholder="Search games..."
  icon="i-lucide-search"
  size="lg"
  @input="debouncedSearch"
/>
```

**Table Configuration:**
```vue
<UTable
  :data="games"
  :columns="columns"
  class="w-full"
/>
```

**Pagination Pattern:**
```vue
<UPagination
  v-model="currentPage"
  :page-count="pageSize"
  :total="totalGames"
/>
```

### 4. Game Detail
**Location**: `app/pages/games/[id].vue`

**Components Used:**
- `UContainer` - Page container
- `UCard` - Content sections
- `UBadge` - Category tags
- `UButton` - Action buttons
- `UIcon` - Icons

**Info Card Pattern:**
```vue
<UCard>
  <template #header>
    <h2 class="text-xl font-semibold">Game Information</h2>
  </template>
  <!-- Content -->
</UCard>
```

### 5. Search Page
**Location**: `app/pages/search.vue`

**Components Used:**
- Advanced filter components (to be implemented)
- Multi-select dropdowns
- Range sliders
- Checkbox groups

## Component Patterns

### Loading States
```vue
<!-- Skeleton Loading -->
<div v-if="pending" class="space-y-4">
  <USkeleton v-for="i in 5" :key="i" class="h-24 w-full" />
</div>
```

### Error Handling
```vue
<!-- Error Alert -->
<UAlert
  v-if="error"
  color="error"
  variant="subtle"
  title="Error loading games"
  :description="error.message"
/>
```

### Empty States
```vue
<!-- Empty State Card -->
<UCard v-if="!games.length" class="text-center py-12">
  <UIcon name="i-lucide-database" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
  <h3 class="text-lg font-medium mb-2">No games found</h3>
  <p class="text-gray-500 mb-4">Try adjusting your search</p>
  <UButton label="Add First Game" icon="i-lucide-plus" to="/games/new" />
</UCard>
```

## Icon System

### Icon Library: Lucide Icons
Icons are prefixed with `i-lucide-`

**Common Icons Used:**
- `i-lucide-search` - Search
- `i-lucide-plus` - Add/Create
- `i-lucide-edit` - Edit
- `i-lucide-trash` - Delete
- `i-lucide-star` - Rating
- `i-lucide-gamepad-2` - Games
- `i-lucide-settings` - Settings/Mechanics
- `i-lucide-layers` - Systems
- `i-lucide-users` - Families
- `i-lucide-arrow-up/down` - Sorting
- `i-lucide-arrow-right` - Navigation
- `i-lucide-database` - Database/Empty
- `i-lucide-image-off` - Missing image

## Color System

### Theme Colors
- **Primary**: Blue (default Nuxt UI)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red
- **Neutral**: Gray

### Usage Examples
```vue
<!-- Primary Button -->
<UButton color="primary" label="Save" />

<!-- Neutral Badge -->
<UBadge color="neutral" variant="subtle">
  {{ game.year }}
</UBadge>

<!-- Error Alert -->
<UAlert color="error" variant="subtle" />
```

## Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Responsive Patterns
```vue
<!-- Responsive Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Cards -->
</div>

<!-- Responsive Flex -->
<div class="flex flex-col sm:flex-row gap-4">
  <!-- Elements -->
</div>
```

## Form Components (To Be Implemented)

### Game Form
**Components Needed:**
- Text inputs for title, subtitle
- Textarea for description
- Number inputs for year, ratings
- File upload for images
- Multi-select for categories
- URL input for external links

**Pattern:**
```vue
<UForm :schema="schema" :state="state" @submit="onSubmit">
  <UFormGroup label="Title" name="title" required>
    <UInput v-model="state.title" />
  </UFormGroup>
  
  <UFormGroup label="Description" name="description">
    <UTextarea v-model="state.description" />
  </UFormGroup>
  
  <UButton type="submit">Save Game</UButton>
</UForm>
```

## Custom Components Needed

### 1. GameCard
**Purpose**: Display game in card format
```vue
<template>
  <UCard>
    <img :src="game.thumbnail" :alt="game.title" />
    <h3>{{ game.title }}</h3>
    <p>{{ game.year }}</p>
    <UBadge>{{ game.rating_average }}</UBadge>
  </UCard>
</template>
```

### 2. CategoryChip
**Purpose**: Display category with remove option
```vue
<template>
  <UBadge>
    {{ category.name }}
    <UButton icon="i-lucide-x" size="xs" @click="remove" />
  </UBadge>
</template>
```

### 3. RatingStars
**Purpose**: Display star rating
```vue
<template>
  <div class="flex">
    <UIcon 
      v-for="i in 5" 
      :key="i"
      name="i-lucide-star"
      :class="i <= rating ? 'text-yellow-500' : 'text-gray-300'"
    />
  </div>
</template>
```

## Accessibility Considerations

### ARIA Labels
- All interactive elements have proper labels
- Form inputs have associated labels
- Icons have descriptive text or aria-labels

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical
- Focus states are visible

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Alternative text for images
- Status messages announced

## Performance Optimizations

### Lazy Loading
- Images lazy loaded with native loading="lazy"
- Routes lazy loaded by default in Nuxt
- Components lazy loaded when needed

### Virtual Scrolling
- Consider for large lists (future enhancement)
- Use virtual list component for 100+ items

### Debouncing
- Search input debounced (300ms)
- Form validation debounced
- API calls throttled

## Dark Mode Support

Nuxt UI Pro provides automatic dark mode support:
- Toggle in user preferences
- System preference detection
- Consistent color adaptation
- Custom dark mode overrides possible

## Component Testing Strategy

### Unit Tests (Future)
- Test component props
- Test event emissions
- Test computed properties
- Test methods

### Integration Tests (Future)
- Test component interactions
- Test form submissions
- Test API integrations
- Test navigation flows

## Style Customization

### Tailwind Configuration
- Custom colors in `tailwind.config.js`
- Custom spacing and sizing
- Custom animations

### Component Overrides
```vue
<!-- Override Nuxt UI component styles -->
<UButton 
  class="custom-button-class"
  :ui="{ base: 'custom-base-styles' }"
/>
```

## Known UI Issues

### Current Problems
1. **UTable not displaying data correctly**
   - Need to verify column configuration
   - May need custom cell templates

2. **Missing form components**
   - Need to implement game creation form
   - Need validation schemas

3. **No loading animations**
   - Only using skeletons
   - Need progress indicators

### Planned Improvements
1. Add transition animations
2. Implement toast notifications
3. Add confirmation dialogs
4. Improve mobile responsiveness
5. Add keyboard shortcuts
6. Implement drag-and-drop

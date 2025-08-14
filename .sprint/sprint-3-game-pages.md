# Sprint 3: Rich Game Pages

**Duration**: 5 days (Week 3)  
**Prerequisites**: Sprint 2 completed  
**Goal**: Create comprehensive game detail pages with rich content and affiliate integration

## Objectives
1. Build detailed game information pages
2. Implement image galleries and media management
3. Add affiliate links and external resources
4. Create related games recommendations
5. Optimize for SEO and sharing

## User Stories

### As a User
- I want to see all details about a game in one place
- I need high-quality images and artwork
- I want links to where I can buy or learn more
- I should see similar games I might enjoy
- I want to share games with friends

### As a Content Manager
- I need to manage game images efficiently
- I want to track affiliate link clicks
- I need to update game information easily
- I want to see which games are most viewed

## Technical Tasks

### 1. Enhanced Game Detail Layout (Days 1-2)

#### Task 1.1: Page Structure
```vue
<!-- app/pages/games/[id].vue -->
<template>
  <div>
    <!-- Hero Section with Cover Art -->
    <GameHero :game="game" />
    
    <!-- Quick Info Bar -->
    <QuickInfoBar 
      :year="game.year"
      :players="game.playerCount"
      :time="game.playTime"
      :age="game.ageRating"
      :complexity="game.complexity"
    />
    
    <!-- Tabbed Content -->
    <UTabs :items="tabs">
      <template #overview>
        <GameOverview :game="game" />
      </template>
      
      <template #mechanics>
        <GameMechanics :mechanics="game.mechanics" />
      </template>
      
      <template #resources>
        <GameResources :links="game.externalLinks" />
      </template>
      
      <template #related>
        <RelatedGames :gameId="game.id" />
      </template>
    </UTabs>
  </div>
</template>
```

#### Task 1.2: Game Hero Component
```vue
<!-- app/components/game/GameHero.vue -->
<template>
  <section class="relative h-96 overflow-hidden">
    <!-- Background Image with Blur -->
    <div class="absolute inset-0">
      <NuxtImg
        :src="game.coverImage"
        class="w-full h-full object-cover blur-xl opacity-50"
      />
    </div>
    
    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <div class="flex gap-8">
        <!-- Cover Art -->
        <div class="w-64">
          <NuxtImg
            :src="game.coverImage"
            :alt="game.title"
            class="rounded-lg shadow-2xl"
            loading="eager"
          />
        </div>
        
        <!-- Game Info -->
        <div class="flex-1 text-white">
          <h1 class="text-4xl font-bold mb-2">{{ game.title }}</h1>
          <p class="text-xl mb-4">{{ game.tagline }}</p>
          
          <!-- Ratings -->
          <div class="flex gap-4 mb-4">
            <RatingDisplay 
              label="Average"
              :value="game.averageRating"
            />
            <RatingDisplay 
              label="BGG"
              :value="game.geekRating"
            />
          </div>
          
          <!-- Quick Actions -->
          <div class="flex gap-2">
            <UButton icon="i-lucide-heart" variant="soft">
              Add to Wishlist
            </UButton>
            <UButton icon="i-lucide-bookmark" variant="soft">
              Mark as Owned
            </UButton>
            <ShareButton :game="game" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

### 2. Image Gallery & Media (Day 2)

#### Task 2.1: Image Gallery Component
```vue
<!-- app/components/game/ImageGallery.vue -->
<template>
  <div>
    <!-- Main Image -->
    <div class="aspect-video mb-4">
      <NuxtImg
        :src="selectedImage"
        class="w-full h-full object-contain"
        @click="openLightbox"
      />
    </div>
    
    <!-- Thumbnail Grid -->
    <div class="grid grid-cols-6 gap-2">
      <button
        v-for="image in images"
        :key="image.id"
        @click="selectedImage = image.url"
        class="aspect-square"
      >
        <NuxtImg
          :src="image.thumbnail"
          class="w-full h-full object-cover rounded"
        />
      </button>
    </div>
    
    <!-- Lightbox -->
    <ImageLightbox
      v-if="lightboxOpen"
      :images="images"
      :initial="selectedIndex"
      @close="lightboxOpen = false"
    />
  </div>
</template>
```

#### Task 2.2: Image Optimization Pipeline
```typescript
// server/utils/images.ts
export const optimizeGameImage = async (imageUrl: string) => {
  // Cloudinary transformation
  const transformations = {
    thumbnail: 'w_150,h_150,c_fill,q_auto,f_auto',
    card: 'w_300,h_400,c_fill,q_auto,f_auto',
    hero: 'w_1920,h_600,c_fill,q_auto,f_auto',
    gallery: 'w_800,h_600,c_fit,q_auto,f_auto'
  }
  
  return Object.entries(transformations).reduce((acc, [key, transform]) => {
    acc[key] = buildCloudinaryUrl(imageUrl, transform)
    return acc
  }, {})
}
```

### 3. Affiliate Links & External Resources (Day 3)

#### Task 3.1: Affiliate Link Manager
```vue
<!-- app/components/game/PurchaseLinks.vue -->
<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Where to Buy</h3>
    
    <!-- Affiliate Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <AffiliateLink
        v-for="link in affiliateLinks"
        :key="link.id"
        :provider="link.provider"
        :url="link.url"
        :price="link.price"
        @click="trackClick(link)"
      />
    </div>
    
    <!-- Free Resources -->
    <div v-if="freeResources.length">
      <h4 class="font-medium mb-2">Free Resources</h4>
      <ul class="space-y-2">
        <li v-for="resource in freeResources" :key="resource.id">
          <ULink
            :to="resource.url"
            target="_blank"
            class="flex items-center gap-2"
          >
            <UIcon name="i-lucide-download" />
            {{ resource.title }}
          </ULink>
        </li>
      </ul>
    </div>
  </div>
</template>
```

#### Task 3.2: Click Tracking
```typescript
// server/api/tracking/affiliate-click.post.ts
export default defineEventHandler(async (event) => {
  const { gameId, provider, url } = await readBody(event)
  
  // Log click for analytics
  await logAffiliateClick({
    gameId,
    provider,
    url,
    timestamp: new Date(),
    ip: getClientIP(event),
    userAgent: getHeader(event, 'user-agent')
  })
  
  // Return redirect URL
  return { redirectUrl: appendAffiliateCode(url, provider) }
})
```

### 4. Related Games & Recommendations (Day 4)

#### Task 4.1: Recommendation Engine
```typescript
// server/api/games/[id]/related.get.ts
export default defineEventHandler(async (event) => {
  const gameId = getRouterParam(event, 'id')
  
  // Get game details
  const game = await getGame(gameId)
  
  // Find related games by multiple criteria
  const [byMechanics, bySystems, byPublisher] = await Promise.all([
    findGamesByMechanics(game.mechanics, gameId),
    findGamesBySystems(game.systems, gameId),
    findGamesByPublisher(game.publisher, gameId)
  ])
  
  // Score and rank recommendations
  const recommendations = scoreRecommendations([
    ...byMechanics,
    ...bySystems,
    ...byPublisher
  ])
  
  return recommendations.slice(0, 12)
})
```

#### Task 4.2: Related Games Display
```vue
<!-- app/components/game/RelatedGames.vue -->
<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">You Might Also Like</h3>
    
    <!-- Recommendation Categories -->
    <div class="space-y-6">
      <!-- Similar Mechanics -->
      <RecommendationRow
        title="Similar Gameplay"
        :games="similarMechanics"
        :reason="mechanicsReason"
      />
      
      <!-- Same System -->
      <RecommendationRow
        title="Same System"
        :games="sameSystem"
        :reason="systemReason"
      />
      
      <!-- By Publisher -->
      <RecommendationRow
        title="More from Publisher"
        :games="samePublisher"
        :reason="publisherReason"
      />
    </div>
  </div>
</template>
```

### 5. SEO & Social Sharing (Day 5)

#### Task 5.1: Meta Tags & Schema
```vue
<!-- app/pages/games/[id].vue -->
<script setup>
// SEO Meta Tags
useSeoMeta({
  title: () => `${game.value.title} - TTRPG Database`,
  description: () => game.value.description,
  ogTitle: () => game.value.title,
  ogDescription: () => game.value.description,
  ogImage: () => game.value.coverImage,
  twitterCard: 'summary_large_image'
})

// Schema.org Structured Data
useSchemaOrg([
  defineGame({
    name: game.value.title,
    description: game.value.description,
    image: game.value.coverImage,
    aggregateRating: {
      ratingValue: game.value.averageRating,
      reviewCount: game.value.ratingCount
    },
    offers: game.value.affiliateLinks.map(link => ({
      price: link.price,
      priceCurrency: 'USD',
      availability: 'InStock',
      seller: link.provider
    }))
  })
])
</script>
```

## Implementation Checklist

### Day 1-2: Page Layout
- [ ] Create enhanced game detail page
- [ ] Build hero section with cover art
- [ ] Implement tabbed content sections
- [ ] Add quick info displays
- [ ] Create action buttons

### Day 2: Media Management
- [ ] Build image gallery component
- [ ] Implement lightbox viewer
- [ ] Set up image optimization
- [ ] Configure CDN delivery

### Day 3: Affiliate Integration
- [ ] Create purchase links component
- [ ] Implement click tracking
- [ ] Add affiliate code handling
- [ ] Display free resources

### Day 4: Recommendations
- [ ] Build recommendation engine
- [ ] Create related games API
- [ ] Design recommendation UI
- [ ] Test recommendation quality

### Day 5: SEO & Sharing
- [ ] Add meta tags
- [ ] Implement Schema.org
- [ ] Create share buttons
- [ ] Test social previews
- [ ] Optimize page performance

## Acceptance Criteria

### Content Display
- ✅ All game information displayed clearly
- ✅ Images load quickly and look good
- ✅ Tabs organize content effectively
- ✅ Mobile responsive design

### Functionality
- ✅ Affiliate links tracked properly
- ✅ Related games are relevant
- ✅ Share buttons work correctly
- ✅ Wishlist/owned markers persist

### Performance
- ✅ Page loads in < 2 seconds
- ✅ Images optimized for web
- ✅ Smooth interactions
- ✅ SEO score > 95

## Dependencies
- Cloudinary account for images
- Affiliate program accounts
- Game cover art available
- Related games algorithm defined

## Definition of Done
- [ ] Game pages fully functional
- [ ] Images optimized and loading
- [ ] Affiliate tracking working
- [ ] Recommendations relevant
- [ ] SEO implemented
- [ ] Social sharing tested
- [ ] Mobile responsive
- [ ] Performance optimized

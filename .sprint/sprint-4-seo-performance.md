# Sprint 4: SEO & Performance

**Duration**: 5 days (Week 4)  
**Prerequisites**: Sprint 3 completed  
**Goal**: Optimize for search engines and ensure blazing-fast performance

## Objectives
1. Implement comprehensive SEO strategy
2. Add Schema.org structured data
3. Optimize site performance
4. Set up caching infrastructure
5. Create sitemap and robots.txt

## User Stories

### As a Site Owner
- I want the site to rank well in search engines
- I need fast page loads to reduce bounce rate
- I want search engines to understand my content
- I need to track SEO performance

### As a User
- I expect pages to load instantly
- I want accurate search results when finding the site
- I need the site to work well on slow connections
- I want smooth, responsive interactions

## Technical Tasks

### 1. SEO Foundation (Day 1)

#### Task 1.1: Meta Tags System
```typescript
// composables/useSEO.ts
export const useGameSEO = (game: Game) => {
  const route = useRoute()
  
  useSeoMeta({
    title: `${game.title} | TTRPG Database`,
    description: game.description.substring(0, 160),
    keywords: [
      ...game.mechanics.map(m => m.name),
      ...game.systems.map(s => s.name),
      'TTRPG', 'tabletop RPG', game.publisher
    ].join(', '),
    
    // Open Graph
    ogTitle: game.title,
    ogDescription: game.description,
    ogImage: game.coverImage,
    ogUrl: `https://ttrpg-db.com${route.path}`,
    ogType: 'website',
    
    // Twitter Card
    twitterCard: 'summary_large_image',
    twitterTitle: game.title,
    twitterDescription: game.description,
    twitterImage: game.coverImage,
    
    // Additional
    author: game.designer,
    publisher: game.publisher,
    robots: 'index, follow'
  })
}
```

#### Task 1.2: Dynamic Sitemap
```typescript
// server/routes/sitemap.xml.ts
export default defineEventHandler(async (event) => {
  const games = await getAllGames()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://ttrpg-db.com/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://ttrpg-db.com/games</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      ${games.map(game => `
        <url>
          <loc>https://ttrpg-db.com/games/${game.id}</loc>
          <lastmod>${game.updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`
  
  setHeader(event, 'content-type', 'application/xml')
  return sitemap
})
```

### 2. Schema.org Implementation (Day 2)

#### Task 2.1: Game Schema
```typescript
// utils/schema.ts
export const generateGameSchema = (game: Game) => ({
  '@context': 'https://schema.org',
  '@type': 'Game',
  name: game.title,
  description: game.description,
  image: game.coverImage,
  datePublished: game.year,
  publisher: {
    '@type': 'Organization',
    name: game.publisher
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: game.averageRating,
    bestRating: 10,
    worstRating: 1,
    ratingCount: game.ratingCount
  },
  offers: game.affiliateLinks?.map(link => ({
    '@type': 'Offer',
    price: link.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: link.provider
    },
    url: link.url
  }))
})
```

#### Task 2.2: Breadcrumb Schema
```typescript
// components/Breadcrumbs.vue
const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.value.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `https://ttrpg-db.com${item.path}`
  }))
}))
```

### 3. Performance Optimization (Days 3-4)

#### Task 3.1: Caching Strategy
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        // Redis connection config
      }
    },
    routeRules: {
      '/': { isr: 60 * 60 }, // Revalidate every hour
      '/games': { isr: 60 * 5 }, // Every 5 minutes
      '/games/**': { isr: 60 * 60 * 24 }, // Daily
      '/api/games': { cors: true, headers: { 'cache-control': 's-maxage=300' } },
      '/images/**': { headers: { 'cache-control': 'max-age=31536000' } }
    }
  }
})
```

#### Task 3.2: Database Query Optimization
```sql
-- Add indexes for common queries
CREATE INDEX idx_games_title ON full_game_data(title);
CREATE INDEX idx_games_year ON full_game_data(year);
CREATE INDEX idx_games_rating ON full_game_data(average_rating DESC);
CREATE INDEX idx_games_created ON full_game_data(created_at DESC);

-- Materialized view for statistics
CREATE MATERIALIZED VIEW game_statistics AS
SELECT 
  COUNT(*) as total_games,
  AVG(average_rating) as avg_rating,
  AVG(geek_rating) as avg_geek_rating,
  COUNT(DISTINCT publisher) as publisher_count
FROM full_game_data;

-- Refresh periodically
CREATE OR REPLACE FUNCTION refresh_statistics()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY game_statistics;
END;
$$ LANGUAGE plpgsql;
```

#### Task 3.3: Image Optimization
```typescript
// plugins/imageOptimization.client.ts
export default defineNuxtPlugin(() => {
  // Lazy load images
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src!
        observer.unobserve(img)
      }
    })
  })
  
  // Progressive image loading
  const loadProgressiveImage = (img: HTMLImageElement) => {
    const placeholder = img.dataset.placeholder
    const fullSrc = img.dataset.src
    
    // Load placeholder first
    img.src = placeholder!
    
    // Load full image
    const fullImage = new Image()
    fullImage.src = fullSrc!
    fullImage.onload = () => {
      img.src = fullSrc!
      img.classList.add('loaded')
    }
  }
})
```

### 4. Core Web Vitals (Day 4)

#### Task 4.1: Performance Monitoring
```typescript
// plugins/webVitals.client.ts
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals'

export default defineNuxtPlugin(() => {
  const sendMetric = (metric: any) => {
    // Send to analytics
    $fetch('/api/metrics', {
      method: 'POST',
      body: {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        url: window.location.href
      }
    })
  }
  
  getCLS(sendMetric)
  getFID(sendMetric)
  getLCP(sendMetric)
  getFCP(sendMetric)
  getTTFB(sendMetric)
})
```

#### Task 4.2: Bundle Optimization
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'ui-components': ['@nuxt/ui-pro'],
            'utils': ['lodash', 'date-fns'],
            'charts': ['chart.js', 'd3']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['vue', '@nuxt/ui-pro']
    }
  },
  
  // Optimize fonts
  googleFonts: {
    display: 'swap',
    preload: true,
    prefetch: true
  }
})
```

### 5. SEO Tools Integration (Day 5)

#### Task 5.1: Google Search Console
```html
<!-- app.html -->
<meta name="google-site-verification" content="verification-code" />
```

#### Task 5.2: Analytics Setup
```typescript
// plugins/analytics.client.ts
export default defineNuxtPlugin(() => {
  // Google Analytics 4
  useHead({
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
        async: true
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `
      }
    ]
  })
})
```

## Implementation Checklist

### Day 1: SEO Foundation
- [ ] Implement meta tags system
- [ ] Create dynamic sitemap
- [ ] Add robots.txt
- [ ] Set up canonical URLs

### Day 2: Structured Data
- [ ] Add game schema
- [ ] Implement breadcrumbs
- [ ] Add organization schema
- [ ] Test with Rich Results

### Day 3-4: Performance
- [ ] Set up caching
- [ ] Optimize database queries
- [ ] Implement image optimization
- [ ] Configure CDN

### Day 4: Core Web Vitals
- [ ] Monitor performance metrics
- [ ] Optimize bundle size
- [ ] Implement code splitting
- [ ] Reduce JavaScript execution

### Day 5: Tools & Testing
- [ ] Set up Search Console
- [ ] Configure analytics
- [ ] Run Lighthouse audits
- [ ] Test all optimizations

## Acceptance Criteria

### SEO Requirements
- ✅ All pages have unique meta tags
- ✅ Schema.org markup validates
- ✅ Sitemap accessible and valid
- ✅ Rich snippets appearing in tests

### Performance Metrics
- ✅ Lighthouse score > 90
- ✅ LCP < 2.5 seconds
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ TTFB < 600ms

### Technical Requirements
- ✅ Caching working properly
- ✅ Images optimized
- ✅ Bundle size < 200KB
- ✅ Analytics tracking events

## Dependencies
- Redis for caching
- Cloudflare CDN
- Google Search Console access
- Analytics account

## Definition of Done
- [ ] SEO implementation complete
- [ ] Performance targets met
- [ ] Schema validation passing
- [ ] Analytics configured
- [ ] Caching operational
- [ ] Documentation updated
- [ ] Tests passing

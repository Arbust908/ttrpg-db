# Sprint 6: Analytics & Insights

**Duration**: 5 days (Week 6)  
**Prerequisites**: Sprint 5 completed  
**Goal**: Build comprehensive analytics dashboard with interactive visualizations

## Objectives
1. Create public statistics dashboard
2. Implement interactive data visualizations
3. Add trend analysis and insights
4. Build data export capabilities
5. Create shareable insight cards

## User Stories

### As a User
- I want to see interesting statistics about the database
- I need to understand trends in TTRPG publishing
- I want to discover popular mechanics and systems
- I should be able to share interesting insights

### As a Data Enthusiast
- I need interactive charts to explore data
- I want to export data for my own analysis
- I need to see historical trends
- I want to compare different time periods

## Technical Tasks

### 1. Statistics Dashboard (Days 1-2)

#### Task 1.1: Dashboard Layout
```vue
<!-- app/pages/analytics.vue -->
<template>
  <div>
    <UPageHeader
      title="TTRPG Analytics"
      description="Explore trends and insights from our database"
    />
    
    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <MetricCard
        v-for="metric in keyMetrics"
        :key="metric.id"
        :title="metric.title"
        :value="metric.value"
        :change="metric.change"
        :icon="metric.icon"
      />
    </div>
    
    <!-- Chart Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Games by Year -->
      <ChartCard title="Games Published by Year">
        <YearlyPublicationChart :data="yearlyData" />
      </ChartCard>
      
      <!-- Popular Mechanics -->
      <ChartCard title="Most Popular Mechanics">
        <MechanicsChart :data="mechanicsData" />
      </ChartCard>
      
      <!-- Rating Distribution -->
      <ChartCard title="Rating Distribution">
        <RatingDistributionChart :data="ratingsData" />
      </ChartCard>
      
      <!-- Publisher Analysis -->
      <ChartCard title="Top Publishers">
        <PublisherChart :data="publisherData" />
      </ChartCard>
    </div>
  </div>
</template>
```

#### Task 1.2: Metrics Calculation
```typescript
// server/api/analytics/metrics.get.ts
export default defineEventHandler(async (event) => {
  const supabase = useSupabase()
  
  // Parallel queries for efficiency
  const [
    totalGames,
    avgRating,
    totalMechanics,
    totalPublishers,
    recentGames,
    topRated
  ] = await Promise.all([
    getTotalGames(),
    getAverageRating(),
    getUniqueMechanics(),
    getUniquePublishers(),
    getRecentlyAdded(30), // Last 30 days
    getTopRatedGames(10)
  ])
  
  // Calculate trends
  const trends = {
    gamesGrowth: calculateGrowthRate(totalGames, 'monthly'),
    ratingTrend: calculateRatingTrend(avgRating, 'weekly'),
    popularityShift: calculatePopularityChanges()
  }
  
  return {
    metrics: {
      totalGames,
      avgRating,
      totalMechanics,
      totalPublishers
    },
    trends,
    recent: recentGames,
    topRated
  }
})
```

### 2. Interactive Charts (Days 2-3)

#### Task 2.1: Chart Components
```vue
<!-- app/components/charts/YearlyPublicationChart.vue -->
<template>
  <div class="relative h-80">
    <!-- Chart Controls -->
    <div class="absolute top-0 right-0 flex gap-2">
      <USelectMenu
        v-model="chartType"
        :options="['bar', 'line', 'area']"
        size="xs"
      />
      <UButton
        icon="i-lucide-download"
        @click="exportChart"
        size="xs"
        variant="ghost"
      />
    </div>
    
    <!-- Chart Canvas -->
    <canvas ref="chartCanvas"></canvas>
    
    <!-- Interactive Tooltip -->
    <ChartTooltip
      v-if="hoveredData"
      :data="hoveredData"
      :position="tooltipPosition"
    />
  </div>
</template>

<script setup>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps<{
  data: YearlyData[]
}>()

const chartInstance = ref<Chart>()

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d')
  
  chartInstance.value = new Chart(ctx, {
    type: chartType.value,
    data: {
      labels: props.data.map(d => d.year),
      datasets: [{
        label: 'Games Published',
        data: props.data.map(d => d.count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          enabled: false, // Use custom tooltip
          external: handleTooltip
        }
      }
    }
  })
})
</script>
```

#### Task 2.2: Mechanics Word Cloud
```vue
<!-- app/components/charts/MechanicsCloud.vue -->
<template>
  <div class="relative h-96">
    <svg ref="cloudSvg" class="w-full h-full">
      <g :transform="`translate(${width/2}, ${height/2})`">
        <text
          v-for="word in words"
          :key="word.text"
          :font-size="word.size"
          :transform="`translate(${word.x}, ${word.y}) rotate(${word.rotate})`"
          :fill="getColor(word.value)"
          class="cursor-pointer hover:opacity-80 transition-opacity"
          @click="handleWordClick(word)"
        >
          {{ word.text }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
import cloud from 'd3-cloud'

const generateWordCloud = () => {
  const layout = cloud()
    .size([width, height])
    .words(props.mechanics.map(d => ({
      text: d.name,
      size: Math.sqrt(d.count) * 10,
      value: d.count
    })))
    .padding(5)
    .rotate(() => ~~(Math.random() * 2) * 90)
    .font('Inter')
    .fontSize(d => d.size)
    .on('end', draw)
  
  layout.start()
}
</script>
```

### 3. Trend Analysis (Day 3)

#### Task 3.1: Trend Calculations
```typescript
// server/utils/analytics.ts
export const analyzeTrends = async () => {
  // Genre popularity over time
  const genreTrends = await db
    .select({
      year: full_game_data.year,
      genre: rpg_systems.name,
      count: count()
    })
    .from(full_game_data)
    .leftJoin(game_rpg_systems)
    .leftJoin(rpg_systems)
    .groupBy(['year', 'genre'])
    .orderBy('year')
  
  // Complexity trends
  const complexityTrends = await analyzeComplexityOverTime()
  
  // Publisher market share
  const marketShare = await calculatePublisherMarketShare()
  
  // Emerging mechanics
  const emergingMechanics = await identifyEmergingMechanics()
  
  return {
    genres: processGenreTrends(genreTrends),
    complexity: complexityTrends,
    marketShare,
    emerging: emergingMechanics
  }
}
```

#### Task 3.2: Insights Generation
```typescript
// composables/useInsights.ts
export const useInsights = () => {
  const generateInsights = (data: AnalyticsData) => {
    const insights = []
    
    // Growth insights
    if (data.monthlyGrowth > 10) {
      insights.push({
        type: 'growth',
        title: 'Rapid Growth',
        message: `The database grew by ${data.monthlyGrowth}% this month!`,
        icon: 'i-lucide-trending-up'
      })
    }
    
    // Popular mechanics
    const topMechanic = data.mechanics[0]
    insights.push({
      type: 'popular',
      title: 'Most Popular Mechanic',
      message: `"${topMechanic.name}" appears in ${topMechanic.count} games`,
      icon: 'i-lucide-star'
    })
    
    // Rating insights
    if (data.highRatedGames.length > 0) {
      insights.push({
        type: 'quality',
        title: 'Highly Rated Games',
        message: `${data.highRatedGames.length} games rated 9.0 or higher`,
        icon: 'i-lucide-award'
      })
    }
    
    return insights
  }
  
  return { generateInsights }
}
```

### 4. Data Visualization (Day 4)

#### Task 4.1: Network Graph
```vue
<!-- app/components/charts/GameNetworkGraph.vue -->
<template>
  <div ref="networkContainer" class="h-96">
    <!-- D3 Force-Directed Graph -->
  </div>
</template>

<script setup>
import * as d3 from 'd3'

const createNetworkGraph = () => {
  const svg = d3.select(networkContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  
  // Create force simulation
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2))
  
  // Draw links
  const link = svg.append('g')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
  
  // Draw nodes
  const node = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('r', d => Math.sqrt(d.value) * 5)
    .attr('fill', d => colorScale(d.group))
    .call(drag(simulation))
  
  // Add labels
  const label = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
    .text(d => d.name)
    .attr('font-size', 10)
}
</script>
```

#### Task 4.2: Timeline Visualization
```vue
<!-- app/components/charts/RPGTimeline.vue -->
<template>
  <div class="relative overflow-x-auto">
    <div class="timeline-container" :style="{ width: timelineWidth + 'px' }">
      <!-- Year markers -->
      <div class="flex justify-between mb-4">
        <div
          v-for="year in years"
          :key="year"
          class="text-xs text-gray-500"
        >
          {{ year }}
        </div>
      </div>
      
      <!-- Timeline tracks -->
      <div
        v-for="(track, index) in tracks"
        :key="track.id"
        class="timeline-track mb-2"
      >
        <div
          v-for="game in track.games"
          :key="game.id"
          :style="getGameStyle(game)"
          class="timeline-item"
          @click="showGameDetails(game)"
        >
          <UTooltip :text="game.title">
            <div class="game-marker" :class="getMarkerClass(game)" />
          </UTooltip>
        </div>
      </div>
    </div>
  </div>
</template>
```

### 5. Export & Sharing (Day 5)

#### Task 5.1: Data Export
```typescript
// server/api/analytics/export.get.ts
export default defineEventHandler(async (event) => {
  const { format, dataset } = getQuery(event)
  
  const data = await getAnalyticsData(dataset)
  
  switch (format) {
    case 'csv':
      setHeader(event, 'Content-Type', 'text/csv')
      setHeader(event, 'Content-Disposition', `attachment; filename=ttrpg-analytics-${dataset}.csv`)
      return convertToCSV(data)
      
    case 'json':
      setHeader(event, 'Content-Type', 'application/json')
      setHeader(event, 'Content-Disposition', `attachment; filename=ttrpg-analytics-${dataset}.json`)
      return JSON.stringify(data, null, 2)
      
    case 'xlsx':
      const buffer = await generateExcel(data)
      setHeader(event, 'Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      setHeader(event, 'Content-Disposition', `attachment; filename=ttrpg-analytics-${dataset}.xlsx`)
      return buffer
  }
})
```

#### Task 5.2: Shareable Insight Cards
```vue
<!-- app/components/ShareableInsight.vue -->
<template>
  <div class="insight-card bg-gradient-to-br from-primary-500 to-primary-700 p-6 rounded-lg text-white">
    <div class="flex justify-between items-start mb-4">
      <UIcon :name="insight.icon" class="text-3xl" />
      <UButton
        icon="i-lucide-share-2"
        @click="shareInsight"
        variant="ghost"
        color="white"
        size="sm"
      />
    </div>
    
    <h3 class="text-xl font-bold mb-2">{{ insight.title }}</h3>
    <p class="text-lg">{{ insight.value }}</p>
    <p class="text-sm opacity-80 mt-2">{{ insight.description }}</p>
    
    <!-- Branding -->
    <div class="mt-4 pt-4 border-t border-white/20">
      <p class="text-xs opacity-60">TTRPG Database • ttrpg-db.com</p>
    </div>
  </div>
</template>

<script setup>
const shareInsight = async () => {
  // Generate image
  const canvas = await html2canvas(insightCard.value)
  const imageUrl = canvas.toDataURL()
  
  // Share options
  if (navigator.share) {
    await navigator.share({
      title: insight.title,
      text: `${insight.value} - ${insight.description}`,
      url: 'https://ttrpg-db.com/analytics'
    })
  } else {
    // Fallback to copy
    await copyToClipboard(insight)
  }
}
</script>
```

## Implementation Checklist

### Days 1-2: Dashboard
- [ ] Create analytics page layout
- [ ] Build metric cards
- [ ] Implement data fetching
- [ ] Add basic charts

### Days 2-3: Interactive Charts
- [ ] Set up Chart.js
- [ ] Create chart components
- [ ] Add interactivity
- [ ] Implement word cloud

### Day 3: Trends
- [ ] Calculate trends
- [ ] Generate insights
- [ ] Create trend visualizations

### Day 4: Advanced Visualizations
- [ ] Build network graph
- [ ] Create timeline view
- [ ] Add filtering options

### Day 5: Export & Sharing
- [ ] Implement data export
- [ ] Create shareable cards
- [ ] Add social sharing
- [ ] Test all features

## Acceptance Criteria

### Analytics Features
- ✅ Dashboard loads quickly
- ✅ All charts interactive
- ✅ Data accurate and current
- ✅ Insights relevant

### Visualizations
- ✅ Charts responsive
- ✅ Smooth interactions
- ✅ Mobile friendly
- ✅ Accessible colors

### Export & Sharing
- ✅ Export formats work
- ✅ Shareable cards generate
- ✅ Social sharing functional

## Dependencies
- Chart.js or D3.js
- Data processing libraries
- Export libraries (csv, xlsx)
- Social sharing APIs

## Definition of Done
- [ ] Analytics dashboard complete
- [ ] All visualizations working
- [ ] Export functionality tested
- [ ] Sharing features operational
- [ ] Performance optimized
- [ ] Mobile responsive
- [ ] Documentation complete

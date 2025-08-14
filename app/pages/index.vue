<template>
  <div>
    <UPageHero
      title="TTRPG Database"
      description="Manage and explore your tabletop role-playing game collection with powerful search, filtering, and organization tools."
      :links="[{
        label: 'Browse Games',
        to: '/games',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: 'Dashboard',
        to: '/dashboard',
        icon: 'i-lucide-layout-dashboard',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      id="features"
      title="Complete TTRPG Management System"
      description="Track your entire tabletop RPG collection with detailed information about mechanics, systems, families, and more."
      :features="[{
        icon: 'i-lucide-database',
        title: 'Comprehensive Database',
        description: 'Store detailed information about each game including ratings, rankings, publication year, and descriptions.'
      }, {
        icon: 'i-lucide-tags',
        title: 'Rich Categorization',
        description: 'Organize games by mechanics, systems, families, and honors with powerful relationship tracking.'
      }, {
        icon: 'i-lucide-search',
        title: 'Advanced Search & Filter',
        description: 'Find exactly what you\'re looking for with powerful search and filtering capabilities across all attributes.'
      }, {
        icon: 'i-lucide-bar-chart',
        title: 'Statistics & Insights',
        description: 'View statistics about your collection including average ratings, total games, and category distributions.'
      }, {
        icon: 'i-lucide-star',
        title: 'Ratings & Rankings',
        description: 'Track both average ratings and geek ratings, plus ranking positions across different categories.'
      }, {
        icon: 'i-lucide-link',
        title: 'External Links',
        description: 'Connect to external resources like BoardGameGeek for additional information and community content.'
      }]"
    />

    <UPageSection>
      <UPageCTA
        title="Start Managing Your Collection"
        description="Begin organizing your TTRPG collection with our comprehensive database system."
        variant="subtle"
        :links="[{
          label: 'View All Games',
          to: '/games',
          icon: 'i-lucide-library',
          color: 'primary'
        }, {
          label: 'Go to Dashboard',
          to: '/dashboard',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral',
          variant: 'subtle'
        }]"
      />
    </UPageSection>
  </div>
</template>

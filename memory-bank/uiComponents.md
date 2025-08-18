# UI Components

## Nuxt UI Pro Components Reference

This project uses Nuxt UI Pro, a premium component library built on top of Tailwind CSS. Below is the complete list of available components.

### Core Components

#### Layout Components
- `UApp` - Main application wrapper
- `UContainer` - Content container with responsive padding
- `UMain` - Main content area (PRO)
- `UHeader` - Page header component (PRO)
- `UFooter` - Page footer component (PRO)
- `UFooterColumns` - Multi-column footer layout (PRO)
- `UPage` - Page wrapper component (PRO)
- `UPageBody` - Page body container (PRO)
- `UPageAside` - Page sidebar/aside content (PRO)

#### Navigation Components
- `UBreadcrumb` - Breadcrumb navigation
- `UNavigationMenu` - Navigation menu
- `ULink` - Enhanced link component
- `UContentNavigation` - Content-based navigation (PRO)
- `UPageAnchors` - Page anchor navigation (PRO)
- `UPageLinks` - Page link collection (PRO)

#### Form Components
- `UForm` - Form wrapper with validation
- `UFormField` - Form field wrapper
- `UInput` - Text input field
- `UInputNumber` - Number input field
- `UInputMenu` - Input with dropdown menu
- `UInputTags` - Tag input field
- `UTextarea` - Textarea field
- `USelect` - Select dropdown
- `USelectMenu` - Advanced select menu
- `UCheckbox` - Checkbox input
- `UCheckboxGroup` - Group of checkboxes
- `URadioGroup` - Radio button group
- `USwitch` - Toggle switch
- `USlider` - Range slider
- `UPinInput` - PIN code input
- `UFileUpload` - File upload component
- `UColorPicker` - Color picker

#### Display Components
- `UCard` - Card container
- `UAlert` - Alert message
- `UBadge` - Badge/tag component
- `UAvatar` - User avatar
- `UAvatarGroup` - Group of avatars
- `UIcon` - Icon component
- `UKbd` - Keyboard key display
- `UChip` - Chip/pill component
- `USkeleton` - Loading skeleton
- `UProgress` - Progress bar
- `USeparator` - Visual separator
- `UTimeline` - Timeline display
- `UTree` - Tree view component

#### Interactive Components
- `UButton` - Button component
- `UButtonGroup` - Group of buttons
- `UDropdownMenu` - Dropdown menu
- `UContextMenu` - Context/right-click menu
- `UCommandPalette` - Command palette/search
- `UAccordion` - Accordion/collapsible panels
- `UCollapsible` - Collapsible content
- `UTabs` - Tab navigation
- `UCarousel` - Image/content carousel
- `UStepper` - Step-by-step process

#### Overlay Components
- `UModal` - Modal dialog
- `UDrawer` - Drawer/slide-out panel
- `USlideover` - Slide-over panel
- `UPopover` - Popover/floating content
- `UTooltip` - Tooltip on hover
- `UToast` - Toast notifications

#### Data Components
- `UTable` - Data table
- `UPagination` - Pagination controls
- `UCalendar` - Calendar component

#### Dashboard Components (PRO)
- `UDashboardPanel` - Dashboard panel wrapper
- `UDashboardNavbar` - Dashboard navigation bar
- `UDashboardSidebar` - Dashboard sidebar
- `UDashboardSidebarCollapse` - Collapsible sidebar section
- `UDashboardSidebarToggle` - Sidebar toggle button
- `UDashboardToolbar` - Dashboard toolbar
- `UDashboardGroup` - Dashboard content group
- `UDashboardSearch` - Dashboard search
- `UDashboardSearchButton` - Dashboard search button
- `UDashboardResizeHandle` - Resizable panel handle

#### Page Section Components (PRO)
- `UPageHeader` - Page header section
- `UPageHero` - Hero/banner section
- `UPageSection` - Generic page section
- `UPageFeature` - Feature showcase
- `UPageCard` - Page card component
- `UPageGrid` - Grid layout section
- `UPageColumns` - Column layout section
- `UPageCTA` - Call-to-action section
- `UPageAccordion` - Page accordion section
- `UPageList` - List section
- `UPageLogos` - Logo showcase
- `UPageMarquee` - Scrolling marquee

#### Authentication Components (PRO)
- `UAuthForm` - Authentication form
- `UUser` - User profile display

#### Content Components (PRO)
- `UBlogPost` - Blog post display
- `UBlogPosts` - Blog post list
- `UChangelogVersion` - Changelog version entry
- `UChangelogVersions` - Changelog version list
- `UContentSearch` - Content search
- `UContentSearchButton` - Content search button
- `UContentSurround` - Content surrounding navigation
- `UContentToc` - Table of contents

#### Chat Components (PRO)
- `UChatMessage` - Chat message display
- `UChatMessages` - Chat message list
- `UChatPalette` - Chat command palette
- `UChatPrompt` - Chat input prompt
- `UChatPromptSubmit` - Chat submit button

#### Utility Components (PRO)
- `UColorModeButton` - Color mode toggle button
- `UColorModeSelect` - Color mode dropdown
- `UColorModeSwitch` - Color mode switch
- `UColorModeAvatar` - Color mode avatar
- `UColorModeImage` - Color mode responsive image
- `ULocaleSelect` - Locale/language selector
- `UBanner` - Site-wide banner
- `UError` - Error page component

#### Pricing Components (PRO)
- `UPricingPlan` - Single pricing plan
- `UPricingPlans` - Pricing plan comparison
- `UPricingTable` - Pricing comparison table

## Component Usage in Project

### Currently Used Components

#### Authentication Pages
- `UCard` - Login/signup form containers
- `UForm`, `UFormGroup` - Form validation and structure
- `UInput` - Email and password fields
- `UButton` - Submit and action buttons
- `UCheckbox` - Remember me and terms acceptance
- `UModal` - Password reset and success dialogs
- `UDivider` - Visual separators
- `UIcon` - Icons throughout the UI
- `UToast` - Success/error notifications

#### Layout Components
- `UHeader` - Main navigation header
- `UMain` - Main content wrapper
- `UFooter` - Site footer
- `UContainer` - Content containers
- `UColorModeButton` - Dark/light mode toggle
- `UDropdown` - User menu and navigation dropdowns
- `ULink` - Navigation links

#### Dashboard Components
- `UDashboardPanel` - Dashboard wrapper
- `UDashboardNavbar` - Dashboard navigation
- `UPageSection` - Dashboard sections
- `UPageCard` - Quick action cards
- `UBadge` - Status and rating badges

#### Data Display
- `UTable` - Games list table (needs fixing)
- `UPagination` - Table pagination
- `USkeleton` - Loading states (to be implemented)

### Components to Implement

#### Priority Components
1. `USkeleton` - Loading states for data fetching
2. `UContentSearch` - Advanced search functionality
3. `UCommandPalette` - Quick navigation and actions
4. `UBreadcrumb` - Navigation breadcrumbs

#### Future Enhancements
1. `UTimeline` - Game release timeline
2. `UTree` - Hierarchical category display
3. `UCarousel` - Game image galleries
4. `UProgress` - Import/export progress
5. `UTooltip` - Help text and hints

## Component Patterns

### Form Patterns
```vue
<UForm :state="formState" :validate="validate" @submit="handleSubmit">
  <UFormGroup label="Field Label" name="fieldName" required>
    <UInput v-model="formState.fieldName" />
  </UFormGroup>
</UForm>
```

### Card Patterns
```vue
<UCard>
  <template #header>
    <h3>Card Title</h3>
  </template>
  <!-- Card content -->
  <template #footer>
    <!-- Card actions -->
  </template>
</UCard>
```

### Modal Patterns
```vue
<UModal v-model="showModal">
  <UCard>
    <template #header>
      <h3>Modal Title</h3>
    </template>
    <!-- Modal content -->
  </UCard>
</UModal>
```

### Dashboard Layout Pattern
```vue
<UDashboardPanel>
  <UDashboardNavbar title="Page Title">
    <template #right>
      <!-- Navbar actions -->
    </template>
  </UDashboardNavbar>
  <UContainer>
    <!-- Page content -->
  </UContainer>
</UDashboardPanel>
```

## Styling Guidelines

### Color Variants
- `primary` - Primary brand color
- `secondary` - Secondary color
- `success` - Success states
- `error` - Error states
- `warning` - Warning states
- `info` - Informational states
- `neutral` - Neutral/gray states

### Size Variants
- `xs` - Extra small
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `xl` - Extra large

### Common Props
- `color` - Component color variant
- `size` - Component size
- `variant` - Component style variant (solid, soft, ghost, link)
- `disabled` - Disable interaction
- `loading` - Show loading state
- `icon` - Icon to display
- `block` - Full width display

## Best Practices

1. **Consistency**: Use the same component patterns throughout the application
2. **Accessibility**: All interactive components include proper ARIA attributes
3. **Responsive Design**: Components adapt to different screen sizes
4. **Dark Mode**: All components support dark mode automatically
5. **Form Validation**: Use UForm's built-in validation for all forms
6. **Loading States**: Show appropriate loading indicators during async operations
7. **Error Handling**: Display clear error messages using UAlert or UToast
8. **Icons**: Use Lucide icons consistently (i-lucide-* prefix)

## Component Documentation

For detailed component documentation and examples, refer to:
- [Nuxt UI Documentation](https://ui.nuxt.com)
- [Nuxt UI Pro Documentation](https://ui.nuxt.com/pro)
- Component source code in `node_modules/@nuxt/ui-pro/components`

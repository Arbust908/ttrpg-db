# System Patterns

## Architecture Overview

### Application Architecture
```
┌─────────────────────────────────────────┐
│           Nuxt 3 Application            │
├─────────────────────────────────────────┤
│  Frontend Layer (Vue 3 + Nuxt UI Pro)  │
│  - Pages (SSR/SPA)                     │
│  - Components                          │
│  - Composables                         │
├─────────────────────────────────────────┤
│      API Layer (Nitro Server)          │
│  - Server API Routes                   │
│  - Middleware                          │
│  - Service Layer                       │
├─────────────────────────────────────────┤
│    Data Layer (Supabase/PostgreSQL)    │
│  - Database Tables                     │
│  - Foreign Key Relationships           │
│  - Indexes                             │
└─────────────────────────────────────────┘
```

## Key Technical Decisions

### 1. Framework Choice: Nuxt 3
- **Why**: Full-stack capabilities, SSR support, excellent DX
- **Benefits**: File-based routing, auto-imports, built-in API server
- **Trade-offs**: Learning curve, opinionated structure

### 2. UI Library: Nuxt UI Pro
- **Why**: Premium components, consistent design system
- **Benefits**: Pre-built components, dark mode, accessibility
- **Trade-offs**: License cost, customization limitations

### 3. Database: Supabase (PostgreSQL)
- **Why**: Managed PostgreSQL, real-time capabilities, auth built-in
- **Benefits**: Scalable, reliable, good DX
- **Trade-offs**: Vendor lock-in, costs at scale

### 4. State Management: Composables
- **Pattern**: Composition API with custom composables
- **Example**: `useGames()` for game-related operations
- **Benefits**: Reusable logic, TypeScript support, reactive

## Design Patterns in Use

### 1. Repository Pattern (Composables)
```typescript
// useGames.ts acts as a repository
const { fetchGames, createGame, updateGame, deleteGame } = useGames()
```
- Abstracts data access logic
- Provides consistent API
- Enables easy testing and mocking

### 2. Service Layer (Server API)
```typescript
// server/api/games/index.get.ts
// Handles business logic and data transformation
```
- Separates concerns
- Validates input
- Transforms data
- Handles errors

### 3. DTO Pattern (Type Definitions)
```typescript
// shared/database.ts
interface FullGameData { ... }
interface GameWithRelations extends FullGameData { ... }
```
- Type safety across layers
- Clear contracts
- Documentation through types

### 4. Error Handling Pattern
```typescript
try {
  // Operation
  return { data, error: null }
} catch (error) {
  return { data: null, error: error.message }
}
```
- Consistent error structure
- Graceful degradation
- User-friendly messages

## Component Relationships

### Page Component Hierarchy
```
app.vue
└── layouts/default.vue
    ├── pages/index.vue (Landing)
    ├── pages/dashboard.vue (Analytics)
    ├── pages/games/
    │   ├── index.vue (List)
    │   └── [id].vue (Detail)
    └── pages/search.vue (Advanced Search)
```

### Data Flow
```
User Action → Page Component → Composable → API Route → Supabase → Response
                                    ↑                           ↓
                              Type Safety ← ← ← ← ← ← ← Type Safety
```

### Database Relationships
```
full_game_data (Core Entity)
    ├── game_alternate_names → alternate_names
    ├── game_honors → honors
    ├── game_primary_names → primary_names
    ├── game_rpg_families → rpg_families
    ├── game_rpg_mechanics → rpg_mechanics
    └── game_rpg_systems → rpg_systems
```

## API Structure

### RESTful Endpoints
```
GET    /api/games          - List with pagination/search
GET    /api/games/[id]     - Single game with relations
POST   /api/games          - Create new game
PATCH  /api/games/[id]     - Update game
DELETE /api/games/[id]     - Delete game
```

### Query Parameters
- `page`: Pagination page number
- `limit`: Items per page
- `search`: Text search query
- `sortBy`: Sort field
- `sortOrder`: asc/desc

## Security Patterns

### 1. Environment Variables
- Sensitive data in `.env`
- Never committed to git
- Server-only access for secrets

### 2. Service Role Keys
- Server-side Supabase client uses service role
- Bypasses RLS for admin operations
- Never exposed to client

### 3. Input Validation
- Query parameter validation
- Type checking
- SQL injection prevention via Supabase client

## Performance Patterns

### 1. Pagination
- Limit results per page (default: 20)
- Offset-based pagination
- Total count for UI

### 2. Search Optimization
- PostgreSQL full-text search
- Index on searchable columns
- Debounced search input

### 3. Data Fetching
- `useAsyncData` for SSR
- Proper error boundaries
- Loading states

### 4. Caching Strategy
- Nuxt's built-in caching
- Route rules for static pages
- Future: Redis for API caching

## Code Organization

### Directory Structure Purpose
- `/app`: Frontend application code
- `/server`: Backend API and services
- `/shared`: Shared types and utilities
- `/public`: Static assets
- `/memory-bank`: Project documentation

### Naming Conventions
- Components: PascalCase
- Composables: use* prefix
- API routes: RESTful naming
- Types: PascalCase interfaces

### Import Aliases
- `#shared/*`: Shared modules
- `#supabase/*`: Supabase utilities
- `~/`: App root

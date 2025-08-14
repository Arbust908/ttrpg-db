# Technical Context

## Technology Stack

### Core Technologies
1. **Nuxt 3** (v3.x)
   - Full-stack Vue framework
   - Server-side rendering (SSR)
   - File-based routing
   - Auto-imports
   - Built-in Nitro server

2. **Vue 3**
   - Composition API
   - TypeScript support
   - Reactive data binding
   - Component-based architecture

3. **Nuxt UI Pro**
   - Premium UI component library
   - Built on Tailwind CSS
   - Dark mode support
   - Accessibility compliant
   - Pre-built components

4. **Supabase**
   - PostgreSQL database
   - Real-time subscriptions
   - Authentication (future)
   - Row Level Security (future)
   - Auto-generated APIs

5. **TypeScript**
   - Type safety
   - Better IDE support
   - Self-documenting code
   - Compile-time error checking

### Supporting Libraries
- **Tailwind CSS**: Utility-first CSS framework
- **Lodash**: Utility functions (debounce)
- **Lucide Icons**: Icon library

## Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Supabase account
- Nuxt UI Pro license

### Environment Variables
```bash
# .env file structure
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_PUBLIC=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role_key
```

### Installation Steps
1. Clone repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env`
4. Add Supabase credentials
5. Run development server: `pnpm dev`

### Development Commands
```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript checks
```

## Technical Constraints

### Database Constraints
1. **PostgreSQL Version**: Latest Supabase version
2. **Connection Limits**: Based on Supabase plan
3. **Storage Limits**: Based on Supabase plan
4. **API Rate Limits**: 1000 requests/hour (free tier)

### Application Constraints
1. **Browser Support**: Modern browsers only (ES2020+)
2. **Node Version**: 18.x or higher required
3. **Build Size**: Keep under 1MB for optimal performance
4. **API Response Time**: Target < 200ms

### Development Constraints
1. **TypeScript**: Strict mode enabled
2. **ESLint**: Enforced code style
3. **Git**: Conventional commits recommended
4. **Testing**: Not yet implemented

## Dependencies

### Production Dependencies
```json
{
  "@nuxt/ui-pro": "latest",
  "@nuxtjs/supabase": "^1.x",
  "nuxt": "^3.x"
}
```

### Development Dependencies
```json
{
  "@nuxt/eslint": "latest",
  "typescript": "^5.x"
}
```

## Configuration Files

### nuxt.config.ts
- Modules configuration
- Route rules
- CSS imports
- Supabase integration
- ESLint settings

### tsconfig.json
- TypeScript compiler options
- Path aliases
- Strict mode settings

### .eslintrc
- Code style rules
- Prettier integration
- Vue/Nuxt specific rules

## API Integration

### Supabase Client Setup
```typescript
// Server-side (with service role)
import { serverSupabaseServiceRole } from '#supabase/server'

// Client-side (with anon key)
const supabase = useSupabaseClient()
```

### Database Access Patterns
1. **Direct Queries**: Using Supabase client
2. **Composables**: Abstraction layer for reusability
3. **Server Routes**: API endpoints for complex logic
4. **Real-time**: Subscriptions (future implementation)

## Build & Deployment

### Build Process
1. TypeScript compilation
2. Vue component compilation
3. Nitro server bundling
4. Static asset optimization
5. Route pre-rendering (where configured)

### Deployment Options
1. **Vercel**: Recommended, zero-config
2. **Netlify**: Supported with adapter
3. **Node.js**: Standard Node deployment
4. **Docker**: Containerized deployment
5. **Edge**: Cloudflare Workers, Deno Deploy

### Production Considerations
- Environment variable management
- Database connection pooling
- CDN for static assets
- Error tracking (Sentry recommended)
- Performance monitoring

## Security Considerations

### Current Implementation
- Environment variables for secrets
- Service role key server-side only
- Input validation on API routes
- SQL injection prevention via Supabase

### Future Enhancements
- Row Level Security (RLS)
- User authentication
- API rate limiting
- CORS configuration
- Content Security Policy (CSP)

## Performance Optimization

### Current Optimizations
- SSR for initial page load
- Code splitting
- Lazy loading routes
- Debounced search
- Pagination

### Future Optimizations
- Image optimization
- Redis caching
- Database indexing
- Query optimization
- Bundle size reduction

## Known Technical Debt

### Type Safety Issues
- `$fetch` not recognized in some contexts
- Module resolution for `#shared/database`
- Some type assertions needed

### Architecture Improvements
- Better error boundaries
- Centralized error handling
- State management solution
- Testing infrastructure

### Performance Improvements
- Implement caching layer
- Optimize database queries
- Add loading skeletons
- Implement virtual scrolling

## Development Workflow

### Git Workflow
1. Feature branches from main
2. Conventional commits
3. PR reviews
4. Automated testing (future)
5. Deploy on merge

### Code Quality
- TypeScript for type safety
- ESLint for code style
- Prettier for formatting
- Component composition
- DRY principles

### Documentation
- Code comments for complex logic
- TypeScript interfaces as documentation
- Memory bank for project context
- README for setup instructions

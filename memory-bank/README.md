# Memory Bank - TTRPG Database Project

## Purpose
This memory bank serves as the persistent knowledge base for the TTRPG Database project. It contains all essential documentation needed to understand, maintain, and continue development of the project, even after complete memory resets.

## How to Use This Memory Bank

### For New Sessions
1. **Always start by reading these files in order:**
   - `projectbrief.md` - Understand what we're building
   - `productContext.md` - Understand why and for whom
   - `activeContext.md` - See current work and next steps
   - `progress.md` - Check what's working and what needs work

2. **Reference as needed:**
   - `systemPatterns.md` - Architecture and design decisions
   - `techContext.md` - Technical setup and configuration
   - `dataModel.md` - Database structure
   - `apiEndpoints.md` - API documentation
   - `uiComponents.md` - UI component patterns

### For Updates
When making significant changes to the project:
1. Update `activeContext.md` with current work
2. Update `progress.md` with completion status
3. Update relevant technical docs if architecture changes
4. Commit changes with clear messages

## File Descriptions

### Core Documentation
- **projectbrief.md**: Project requirements, scope, and success criteria
- **productContext.md**: User problems, solutions, and UX goals
- **activeContext.md**: Current work focus, recent changes, next steps
- **systemPatterns.md**: Architecture, design patterns, component relationships
- **techContext.md**: Technology stack, setup instructions, dependencies
- **progress.md**: What works, what's partial, what's left to build

### Technical Documentation
- **dataModel.md**: Complete database schema with relationships
- **apiEndpoints.md**: All API endpoints with examples
- **uiComponents.md**: UI component library and patterns

## Quick Start Guide

### Prerequisites
- Node.js 18+
- pnpm package manager
- Supabase account
- Nuxt UI Pro license

### Setup Steps
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and add Supabase credentials
4. Run development server: `pnpm dev`
5. Access at `http://localhost:3000`

## Project Status Summary

### ✅ Completed (80-90%)
- Database schema and Supabase integration
- Basic CRUD API endpoints
- Dashboard with statistics
- Games list with search and pagination
- Landing page

### ⚠️ In Progress (50-70%)
- TypeScript configuration issues
- UTable component display
- Error handling consistency

### 🚧 To Do (0-20%)
- Game creation/edit forms
- Relationship management (mechanics, systems, families)
- Advanced search filters
- Category management pages
- Loading states and notifications

## Key Issues to Address

### Critical
1. **UTable not rendering data** - Check Nuxt UI Pro docs for column format
2. **TypeScript import errors** - `$fetch` and module resolution issues

### Important
1. Missing form validation
2. No loading indicators
3. Limited error messages

## Development Priorities

### Immediate (Do First)
1. Fix TypeScript import issues
2. Complete game creation form
3. Fix table display issues
4. Implement edit functionality

### Next Phase
1. Add relationship management
2. Create category pages
3. Improve error handling
4. Add loading states

### Future Enhancements
1. User authentication
2. Bulk operations
3. Import/export features
4. Mobile optimization

## Architecture Overview

```
Nuxt 3 Application
├── Frontend (Vue 3 + Nuxt UI Pro)
├── API Layer (Nitro Server)
└── Database (Supabase/PostgreSQL)
```

### Data Flow
```
User → Page Component → Composable → API Route → Supabase → Response
```

### Key Patterns
- Repository pattern via composables
- Service layer in API routes
- Consistent error handling
- TypeScript throughout

## Contact & Resources

### External Resources
- [Nuxt 3 Documentation](https://nuxt.com)
- [Nuxt UI Pro](https://ui.nuxt.com/pro)
- [Supabase Documentation](https://supabase.com/docs)
- [Project Repository](https://github.com/Arbust908/ttrpg-db.git)

### Environment Variables Required
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_PUBLIC=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role_key
```

## Maintenance Notes

### When to Update Memory Bank
- After implementing major features
- When architecture changes
- After fixing critical bugs
- When project requirements change
- Before extended breaks

### Update Checklist
- [ ] Update activeContext.md with current work
- [ ] Update progress.md with completion status
- [ ] Update technical docs if needed
- [ ] Review and update this README
- [ ] Commit with descriptive message

## Remember
This memory bank is the lifeline for project continuity. Keep it accurate, keep it current, and always start by reading it when returning to the project.

---
*Last Updated: January 14, 2025*
*Memory Bank Version: 1.0*

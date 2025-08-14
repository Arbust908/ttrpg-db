# Sprint 0: Security Lockdown

**Duration**: 2 days  
**Priority**: CRITICAL - Must complete before any other work  
**Goal**: Completely disable public game modifications and secure the database

## Objectives
1. Prevent any public user from adding, editing, or deleting games
2. Implement admin-only authentication system
3. Hide all modification UI elements from public view
4. Create secure admin interface for content management

## User Stories

### As a Site Owner
- I want to ensure only authorized admins can modify game data
- I need confidence that the database is protected from unauthorized changes
- I want to control when and how new games are added to the database

### As a Public User
- I should only be able to view and search games
- I should not see any "Add Game" or "Edit" buttons
- I should not be able to access admin routes

## Technical Tasks

### 1. Backend Security (Day 1)

#### Task 1.1: Disable Public Write Endpoints
```typescript
// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  const url = event.node.req.url || ''
  
  // Protected routes
  const protectedRoutes = [
    '/api/games', // POST
    '/api/games/[id]', // PATCH, DELETE
  ]
  
  const method = event.node.req.method
  const isWriteOperation = ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method || '')
  
  if (isWriteOperation && !isAdminAuthenticated(event)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Admin access required'
    })
  }
})
```

#### Task 1.2: Environment Configuration
```env
# .env
ENABLE_PUBLIC_WRITES=false
ADMIN_SECRET_KEY=<generate-secure-key>
ADMIN_EMAIL=admin@ttrpg-db.com
```

#### Task 1.3: Admin Authentication Service
- Create `server/utils/auth.ts`
- Implement JWT token validation
- Create admin session management
- Add rate limiting for login attempts

### 2. Frontend Security (Day 1)

#### Task 2.1: Remove Public Modification UI
- Remove "Add Game" button from `/games/index.vue`
- Remove edit/delete buttons from game pages
- Hide admin-only navigation items

#### Task 2.2: Create Admin Login Page
- Route: `/admin/login`
- Simple, secure login form
- Session storage for admin token
- Redirect to admin dashboard on success

### 3. Admin Dashboard (Day 2)

#### Task 3.1: Admin Layout
```vue
<!-- app/layouts/admin.vue -->
<template>
  <div>
    <AdminHeader />
    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>
```

#### Task 3.2: Admin Routes
- `/admin` - Dashboard overview
- `/admin/games` - Game management
- `/admin/games/new` - Add new game
- `/admin/games/[id]/edit` - Edit game
- `/admin/import` - Bulk import tools

#### Task 3.3: Admin Middleware
```typescript
// app/middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const isAdmin = useAdminAuth()
  
  if (!isAdmin.value && to.path.startsWith('/admin')) {
    return navigateTo('/admin/login')
  }
})
```

## Implementation Checklist

### Day 1 - Backend & Security
- [ ] Create auth middleware
- [ ] Update all API endpoints with auth checks
- [ ] Set up environment variables
- [ ] Create admin authentication utilities
- [ ] Test all endpoints with/without auth
- [ ] Remove public UI modification elements
- [ ] Create admin login page

### Day 2 - Admin Interface
- [ ] Create admin layout
- [ ] Build admin dashboard
- [ ] Implement game management interface
- [ ] Add bulk import functionality
- [ ] Test admin workflows
- [ ] Document admin procedures

## Acceptance Criteria

### Security Requirements
- ✅ No public user can create, update, or delete games
- ✅ All write operations require admin authentication
- ✅ Admin sessions expire after 24 hours
- ✅ Failed login attempts are rate-limited
- ✅ Admin actions are logged

### UI Requirements
- ✅ Public users see no modification options
- ✅ Admin login is accessible but hidden
- ✅ Admin dashboard is fully functional
- ✅ All admin actions have confirmation dialogs

### Testing Requirements
- ✅ Attempt unauthorized API calls - should fail
- ✅ Test admin login flow
- ✅ Verify session management
- ✅ Test all CRUD operations as admin
- ✅ Verify public read-only access works

## Dependencies
- None - this is the first sprint and blocks all others

## Rollback Plan
If issues arise:
1. Set `ENABLE_PUBLIC_WRITES=false` immediately
2. Disable all write endpoints at server level
3. Restore from database backup if needed
4. Communicate status to stakeholders

## Notes
- This sprint is **CRITICAL** and must be completed before any other work
- Do not proceed with Sprint 1 until all security measures are verified
- Consider hiring security consultant for review
- Document all admin procedures for future reference

## Definition of Done
- [ ] All write endpoints require authentication
- [ ] Admin login system functional
- [ ] Public UI shows no modification options
- [ ] Admin can perform all CRUD operations
- [ ] Security tested and verified
- [ ] Documentation updated
- [ ] Code reviewed and merged

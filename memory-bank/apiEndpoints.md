# API Endpoints Documentation

## Overview
The TTRPG Database API is built using Nuxt 3's Nitro server, providing RESTful endpoints for game management. All endpoints are prefixed with `/api` and return JSON responses.

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://[your-domain]/api`

## Response Format
All API responses follow a consistent structure:

### Success Response
```typescript
{
  data: T | T[],      // The requested data
  error: null,        // No error
  // Additional metadata for list endpoints:
  count?: number,     // Total items
  totalPages?: number,// Total pages
  page?: number,      // Current page
  limit?: number      // Items per page
}
```

### Error Response
```typescript
{
  data: null,         // No data on error
  error: string       // Error message
}
```

## Endpoints

### Games Resource

#### 1. List Games
**GET** `/api/games`

Retrieve a paginated list of games with optional search and sorting.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| search | string | - | Search in title and description |
| sortBy | string | "title" | Field to sort by |
| sortOrder | "asc" \| "desc" | "asc" | Sort direction |

**Sort Options:**
- `title` - Game title
- `year` - Publication year
- `rating_average` - Average rating
- `rank_position` - Ranking position
- `created_at` - Creation date

**Example Request:**
```bash
GET /api/games?page=1&limit=10&search=dungeons&sortBy=rating_average&sortOrder=desc
```

**Example Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Dungeons & Dragons 5th Edition",
      "year": 2014,
      "rating_average": 8.5,
      "thumbnail": "https://...",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 150,
  "totalPages": 15,
  "page": 1,
  "limit": 10,
  "error": null
}
```

#### 2. Get Single Game
**GET** `/api/games/[id]`

Retrieve a single game by ID with all its relationships.

**Path Parameters:**
- `id` (required): Game ID

**Example Request:**
```bash
GET /api/games/123
```

**Example Response:**
```json
{
  "data": {
    "id": 123,
    "title": "Pathfinder 2nd Edition",
    "description": "A comprehensive fantasy RPG...",
    "year": 2019,
    "subtitle": "Core Rulebook",
    "image_url": "https://...",
    "thumbnail": "https://...",
    "rating_geek": 8.2,
    "rating_average": 8.0,
    "rating_voters": 1500,
    "rank_category": "rpg",
    "rank_position": 5,
    "url": "https://boardgamegeek.com/...",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T00:00:00Z",
    "rpg_mechanics": [
      {
        "id": 1,
        "name": "Dice Rolling",
        "slug": "dice-rolling"
      }
    ],
    "rpg_systems": [
      {
        "id": 2,
        "name": "Pathfinder",
        "slug": "pathfinder"
      }
    ],
    "rpg_families": [],
    "honors": [],
    "primary_names": [],
    "alternate_names": []
  },
  "error": null
}
```

#### 3. Create Game
**POST** `/api/games`

Create a new game entry.

**Request Body:**
```typescript
{
  title: string,           // Required
  description?: string,
  year?: number,
  subtitle?: string,
  image_url?: string,
  thumbnail?: string,
  rating_geek?: number,
  rating_average?: number,
  rating_voters?: number,
  rank_category?: string,
  rank_position?: number,
  url?: string
}
```

**Example Request:**
```bash
POST /api/games
Content-Type: application/json

{
  "title": "New RPG Game",
  "description": "An exciting new RPG",
  "year": 2024
}
```

**Example Response:**
```json
{
  "data": {
    "id": 456,
    "title": "New RPG Game",
    "description": "An exciting new RPG",
    "year": 2024,
    "created_at": "2024-01-20T00:00:00Z",
    "updated_at": "2024-01-20T00:00:00Z"
  },
  "error": null
}
```

#### 4. Update Game
**PATCH** `/api/games/[id]`

Update an existing game's information.

**Path Parameters:**
- `id` (required): Game ID

**Request Body:**
```typescript
{
  title?: string,
  description?: string,
  year?: number,
  subtitle?: string,
  image_url?: string,
  thumbnail?: string,
  rating_geek?: number,
  rating_average?: number,
  rating_voters?: number,
  rank_category?: string,
  rank_position?: number,
  url?: string
}
```

**Example Request:**
```bash
PATCH /api/games/456
Content-Type: application/json

{
  "description": "Updated description",
  "rating_average": 7.5
}
```

**Example Response:**
```json
{
  "data": {
    "id": 456,
    "title": "New RPG Game",
    "description": "Updated description",
    "year": 2024,
    "rating_average": 7.5,
    "updated_at": "2024-01-21T00:00:00Z"
  },
  "error": null
}
```

#### 5. Delete Game
**DELETE** `/api/games/[id]`

Delete a game from the database.

**Path Parameters:**
- `id` (required): Game ID

**Example Request:**
```bash
DELETE /api/games/456
```

**Example Response:**
```json
{
  "success": true,
  "error": null
}
```

## Error Handling

### HTTP Status Codes
| Code | Description | When Used |
|------|-------------|-----------|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input data |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side error |

### Common Error Messages
```json
{
  "data": null,
  "error": "Game not found"
}

{
  "data": null,
  "error": "Invalid input: title is required"
}

{
  "data": null,
  "error": "Database query failed"
}
```

## Implementation Details

### Server-Side Implementation
Location: `/server/api/games/`

**Files:**
- `index.get.ts` - List games
- `index.post.ts` - Create game
- `[id].get.ts` - Get single game
- `[id].patch.ts` - Update game
- `[id].delete.ts` - Delete game

### Client-Side Usage
The API is consumed through the `useGames()` composable:

```typescript
// app/composables/useGames.ts
const { 
  fetchGames,      // GET /api/games
  fetchGameById,   // GET /api/games/[id]
  createGame,      // POST /api/games
  updateGame,      // PATCH /api/games/[id]
  deleteGame       // DELETE /api/games/[id]
} = useGames()
```

### Authentication & Authorization
**Current Status:** Not implemented
- All endpoints are publicly accessible
- No user authentication required
- No role-based access control

**Future Plans:**
- Implement Supabase Auth
- Add JWT token validation
- Implement role-based permissions
- Add rate limiting

## Future Endpoints

### Planned Resources

#### Mechanics
```
GET    /api/mechanics       - List all mechanics
GET    /api/mechanics/[id]  - Get single mechanic
POST   /api/mechanics       - Create mechanic
PATCH  /api/mechanics/[id]  - Update mechanic
DELETE /api/mechanics/[id]  - Delete mechanic
```

#### Systems
```
GET    /api/systems         - List all systems
GET    /api/systems/[id]    - Get single system
POST   /api/systems         - Create system
PATCH  /api/systems/[id]    - Update system
DELETE /api/systems/[id]    - Delete system
```

#### Families
```
GET    /api/families        - List all families
GET    /api/families/[id]   - Get single family
POST   /api/families        - Create family
PATCH  /api/families/[id]   - Update family
DELETE /api/families/[id]   - Delete family
```

#### Relationships
```
POST   /api/games/[id]/mechanics    - Add mechanic to game
DELETE /api/games/[id]/mechanics/[mechanicId] - Remove mechanic

POST   /api/games/[id]/systems      - Add system to game
DELETE /api/games/[id]/systems/[systemId] - Remove system

POST   /api/games/[id]/families     - Add family to game
DELETE /api/games/[id]/families/[familyId] - Remove family
```

#### Statistics
```
GET    /api/stats           - Global statistics
GET    /api/stats/games     - Game statistics
GET    /api/stats/trending  - Trending games
```

#### Search
```
GET    /api/search          - Advanced search with filters
POST   /api/search/save     - Save search query
GET    /api/search/saved    - Get saved searches
```

## Testing

### Manual Testing with cURL

**List games:**
```bash
curl http://localhost:3000/api/games
```

**Search games:**
```bash
curl "http://localhost:3000/api/games?search=dragon&limit=5"
```

**Get single game:**
```bash
curl http://localhost:3000/api/games/1
```

**Create game:**
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Game","year":2024}'
```

**Update game:**
```bash
curl -X PATCH http://localhost:3000/api/games/1 \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description"}'
```

**Delete game:**
```bash
curl -X DELETE http://localhost:3000/api/games/1
```

## Performance Considerations

### Current Optimizations
- Pagination to limit data transfer
- Database indexes on searchable fields
- Efficient SQL queries with Supabase

### Future Optimizations
- Implement caching (Redis)
- Add response compression
- Implement field selection (GraphQL-like)
- Add batch operations endpoint
- Implement webhook support

## Security Considerations

### Current Implementation
- Input validation on server
- SQL injection prevention via Supabase
- Environment variables for secrets

### Future Enhancements
- Rate limiting per IP
- API key authentication
- Request signing
- CORS configuration
- Input sanitization
- Output encoding

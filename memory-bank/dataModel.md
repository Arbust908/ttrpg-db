# Data Model Documentation

## Database Schema Overview

The TTRPG database uses a PostgreSQL database (via Supabase) with a normalized structure that captures games and their relationships to various categorization systems.

## Core Tables

### 1. full_game_data
**Purpose**: Main table storing all TTRPG game information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | bigint | PRIMARY KEY, NOT NULL | Unique game identifier |
| title | text | NOT NULL | Game title |
| description | text | | Game description |
| year | integer | | Publication year |
| subtitle | text | | Game subtitle |
| image_url | text | | Full-size image URL |
| thumbnail | text | | Thumbnail image URL |
| rating_geek | numeric | | Geek rating from BGG |
| rating_average | numeric | | Average user rating |
| rating_voters | integer | | Number of rating votes |
| rank_category | text | | Ranking category |
| rank_position | integer | | Position in ranking |
| url | text | | External URL (BGG) |
| created_at | timestamp with time zone | NOT NULL, DEFAULT now() | Record creation time |
| updated_at | timestamp with time zone | NOT NULL, DEFAULT now() | Last update time |

## Category Tables

### 2. rpg_mechanics
**Purpose**: Store RPG game mechanics (e.g., "Dice Rolling", "Card Drafting")

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | integer | PRIMARY KEY, NOT NULL | Unique identifier |
| name | text | NOT NULL | Mechanic name |
| url | text | NOT NULL | Reference URL |
| category | text | NOT NULL | Category type |
| slug | text | NOT NULL | URL-friendly identifier |

### 3. rpg_systems
**Purpose**: Store RPG systems (e.g., "D&D 5E", "Pathfinder")

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | integer | PRIMARY KEY, NOT NULL | Unique identifier |
| name | text | NOT NULL | System name |
| url | text | NOT NULL | Reference URL |
| category | text | NOT NULL | Category type |
| slug | text | NOT NULL | URL-friendly identifier |

### 4. rpg_families
**Purpose**: Store RPG families/series (e.g., "World of Darkness", "Star Wars")

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | integer | PRIMARY KEY, NOT NULL | Unique identifier |
| name | text | NOT NULL | Family name |
| url | text | NOT NULL | Reference URL |
| category | text | NOT NULL | Category type |
| slug | text | NOT NULL | URL-friendly identifier |

### 5. honors
**Purpose**: Store awards and honors

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | integer | PRIMARY KEY, NOT NULL | Unique identifier |
| name | text | NOT NULL | Honor/award name |
| url | text | NOT NULL | Reference URL |
| category | text | NOT NULL | Category type |
| slug | text | NOT NULL | URL-friendly identifier |

### 6. primary_names
**Purpose**: Store primary names for games

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | integer | PRIMARY KEY, NOT NULL | Unique identifier |
| name | text | NOT NULL | Primary name |
| url | text | NOT NULL | Reference URL |
| category | text | NOT NULL | Category type |
| slug | text | NOT NULL | URL-friendly identifier |

### 7. alternate_names
**Purpose**: Store alternate names/editions for games

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | integer | PRIMARY KEY, NOT NULL | Unique identifier |
| name | text | NOT NULL | Alternate name |
| url | text | NOT NULL | Reference URL |
| category | text | NOT NULL | Category type |
| slug | text | NOT NULL | URL-friendly identifier |

## Junction Tables (Many-to-Many Relationships)

### 8. game_rpg_mechanics
**Purpose**: Link games to their mechanics

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_id | bigint | NOT NULL, FK → full_game_data(id) | Game reference |
| rpg_mechanic_id | integer | NOT NULL, FK → rpg_mechanics(id) | Mechanic reference |
| position | smallint | | Display order |
| **PRIMARY KEY** | | (game_id, rpg_mechanic_id) | Composite key |

### 9. game_rpg_systems
**Purpose**: Link games to their systems

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_id | bigint | NOT NULL, FK → full_game_data(id) | Game reference |
| rpg_system_id | integer | NOT NULL, FK → rpg_systems(id) | System reference |
| position | smallint | | Display order |
| **PRIMARY KEY** | | (game_id, rpg_system_id) | Composite key |

### 10. game_rpg_families
**Purpose**: Link games to their families

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_id | bigint | NOT NULL, FK → full_game_data(id) | Game reference |
| rpg_family_id | integer | NOT NULL, FK → rpg_families(id) | Family reference |
| position | smallint | | Display order |
| **PRIMARY KEY** | | (game_id, rpg_family_id) | Composite key |

### 11. game_honors
**Purpose**: Link games to their honors/awards

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_id | bigint | NOT NULL, FK → full_game_data(id) | Game reference |
| honor_id | integer | NOT NULL, FK → honors(id) | Honor reference |
| position | smallint | | Display order |
| **PRIMARY KEY** | | (game_id, honor_id) | Composite key |

### 12. game_primary_names
**Purpose**: Link games to their primary names

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_id | bigint | NOT NULL, FK → full_game_data(id) | Game reference |
| primary_name_id | integer | NOT NULL, FK → primary_names(id) | Name reference |
| position | smallint | | Display order |
| **PRIMARY KEY** | | (game_id, primary_name_id) | Composite key |

### 13. game_alternate_names
**Purpose**: Link games to their alternate names

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| game_id | bigint | NOT NULL, FK → full_game_data(id) | Game reference |
| alternate_name_id | integer | NOT NULL, FK → alternate_names(id) | Name reference |
| position | smallint | | Display order |
| **PRIMARY KEY** | | (game_id, alternate_name_id) | Composite key |

## Relationships Diagram

```
                        full_game_data
                              |
        ┌─────────────────────┼─────────────────────┐
        |                     |                     |
        ├── game_rpg_mechanics → rpg_mechanics     |
        ├── game_rpg_systems → rpg_systems         |
        ├── game_rpg_families → rpg_families       |
        ├── game_honors → honors                   |
        ├── game_primary_names → primary_names     |
        └── game_alternate_names → alternate_names |
```

## TypeScript Type Definitions

Located in `/shared/database.ts`:

```typescript
// Core entity
interface FullGameData {
  id: number
  title: string
  description?: string
  year?: number
  subtitle?: string
  image_url?: string
  thumbnail?: string
  rating_geek?: number
  rating_average?: number
  rating_voters?: number
  rank_category?: string
  rank_position?: number
  url?: string
  created_at: string
  updated_at: string
}

// Extended with relationships
interface GameWithRelations extends FullGameData {
  alternate_names?: AlternateName[]
  honors?: Honor[]
  primary_names?: PrimaryName[]
  rpg_families?: RpgFamily[]
  rpg_mechanics?: RpgMechanic[]
  rpg_systems?: RpgSystem[]
}
```

## Data Integrity Rules

### Constraints
1. **Primary Keys**: All tables have unique identifiers
2. **Foreign Keys**: Junction tables enforce referential integrity
3. **NOT NULL**: Critical fields (id, title, name) cannot be null
4. **Composite Keys**: Junction tables use composite primary keys to prevent duplicates
5. **Timestamps**: Automatic created_at and updated_at tracking

### Business Rules
1. A game can have multiple mechanics, systems, families, etc.
2. Each category item can be associated with multiple games
3. The `position` field in junction tables allows for ordered relationships
4. All category tables follow the same structure for consistency
5. URLs are stored for external reference (primarily BoardGameGeek)

## Query Patterns

### Common Queries

1. **Get all games with pagination**
```sql
SELECT * FROM full_game_data 
ORDER BY title 
LIMIT 20 OFFSET 0;
```

2. **Search games by title or description**
```sql
SELECT * FROM full_game_data 
WHERE title ILIKE '%search_term%' 
   OR description ILIKE '%search_term%';
```

3. **Get game with all relationships**
```sql
-- Requires multiple queries or joins
SELECT g.*, 
       array_agg(DISTINCT m.*) as mechanics,
       array_agg(DISTINCT s.*) as systems
FROM full_game_data g
LEFT JOIN game_rpg_mechanics gm ON g.id = gm.game_id
LEFT JOIN rpg_mechanics m ON gm.rpg_mechanic_id = m.id
LEFT JOIN game_rpg_systems gs ON g.id = gs.game_id
LEFT JOIN rpg_systems s ON gs.rpg_system_id = s.id
WHERE g.id = ?
GROUP BY g.id;
```

4. **Get statistics**
```sql
-- Total games
SELECT COUNT(*) FROM full_game_data;

-- Average rating
SELECT AVG(rating_average) 
FROM full_game_data 
WHERE rating_average IS NOT NULL;
```

## Indexing Strategy

### Recommended Indexes
1. **full_game_data**
   - Index on `title` for sorting
   - Index on `year` for filtering
   - Index on `rating_average` for sorting
   - Full-text index on `title`, `description` for search

2. **Junction Tables**
   - Already have composite primary key indexes
   - Consider adding index on `game_id` alone for faster lookups

3. **Category Tables**
   - Index on `name` for sorting and search
   - Index on `slug` for URL-based lookups

## Future Considerations

### Potential Enhancements
1. **User Management**
   - users table
   - user_collections table
   - user_ratings table
   - user_reviews table

2. **Session Tracking**
   - game_sessions table
   - session_participants table
   - session_notes table

3. **Enhanced Media**
   - game_images table (multiple images per game)
   - game_videos table
   - game_documents table (PDFs, rules)

4. **Social Features**
   - comments table
   - likes/favorites table
   - sharing_links table

### Performance Optimizations
1. Implement database views for complex queries
2. Add materialized views for statistics
3. Implement caching layer (Redis)
4. Consider partitioning for large tables
5. Add database triggers for updated_at maintenance

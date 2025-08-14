// Database type definitions based on the schema

export interface FullGameData {
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

export interface AlternateName {
  id: number
  name: string
  url: string
  category: string
  slug: string
}

export interface Honor {
  id: number
  name: string
  url: string
  category: string
  slug: string
}

export interface PrimaryName {
  id: number
  name: string
  url: string
  category: string
  slug: string
}

export interface RpgFamily {
  id: number
  name: string
  url: string
  category: string
  slug: string
}

export interface RpgMechanic {
  id: number
  name: string
  url: string
  category: string
  slug: string
}

export interface RpgSystem {
  id: number
  name: string
  url: string
  category: string
  slug: string
}

// Extended types with relationships
export interface GameWithRelations extends FullGameData {
  alternate_names?: AlternateName[]
  honors?: Honor[]
  primary_names?: PrimaryName[]
  rpg_families?: RpgFamily[]
  rpg_mechanics?: RpgMechanic[]
  rpg_systems?: RpgSystem[]
}

// Junction table types
export interface GameAlternateName {
  game_id: number
  alternate_name_id: number
  position?: number
}

export interface GameHonor {
  game_id: number
  honor_id: number
  position?: number
}

export interface GamePrimaryName {
  game_id: number
  primary_name_id: number
  position?: number
}

export interface GameRpgFamily {
  game_id: number
  rpg_family_id: number
  position?: number
}

export interface GameRpgMechanic {
  game_id: number
  rpg_mechanic_id: number
  position?: number
}

export interface GameRpgSystem {
  game_id: number
  rpg_system_id: number
  position?: number
}

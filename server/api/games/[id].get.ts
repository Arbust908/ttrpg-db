import { serverSupabaseServiceRole } from '#supabase/server'
import type { FullGameData, GameWithRelations } from '#shared/database'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid game ID'
    })
  }

  try {
    const client = serverSupabaseServiceRole(event)
    const gameId = Number(id)

    // Fetch game with all relationships
    const { data: game, error: gameError } = await client
      .from('full_game_data')
      .select('*')
      .eq('id', gameId)
      .single()

    if (gameError || !game) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Game not found'
      })
    }

    // Fetch related data in parallel
    const [mechanics, systems, families, honors, primaryNames, alternateNames] = await Promise.all([
      // Fetch mechanics
      client
        .from('game_rpg_mechanics')
        .select('position, rpg_mechanics(*)')
        .eq('game_id', gameId)
        .order('position'),

      // Fetch systems
      client
        .from('game_rpg_systems')
        .select('position, rpg_systems(*)')
        .eq('game_id', gameId)
        .order('position'),

      // Fetch families
      client
        .from('game_rpg_families')
        .select('position, rpg_families(*)')
        .eq('game_id', gameId)
        .order('position'),

      // Fetch honors
      client
        .from('game_honors')
        .select('position, honors(*)')
        .eq('game_id', gameId)
        .order('position'),

      // Fetch primary names
      client
        .from('game_primary_names')
        .select('position, primary_names(*)')
        .eq('game_id', gameId)
        .order('position'),

      // Fetch alternate names
      client
        .from('game_alternate_names')
        .select('position, alternate_names(*)')
        .eq('game_id', gameId)
        .order('position')
    ])

    // Type assertion helper for relation data
    interface RelationItem<T> {
      position?: number
      [key: string]: T | number | undefined
    }

    const gameWithRelations: GameWithRelations = {
      ...(game as FullGameData),
      rpg_mechanics: mechanics.data?.map((m: RelationItem<any>) => m.rpg_mechanics).filter(Boolean) || [],
      rpg_systems: systems.data?.map((s: RelationItem<any>) => s.rpg_systems).filter(Boolean) || [],
      rpg_families: families.data?.map((f: RelationItem<any>) => f.rpg_families).filter(Boolean) || [],
      honors: honors.data?.map((h: RelationItem<any>) => h.honors).filter(Boolean) || [],
      primary_names: primaryNames.data?.map((p: RelationItem<any>) => p.primary_names).filter(Boolean) || [],
      alternate_names: alternateNames.data?.map((a: RelationItem<any>) => a.alternate_names).filter(Boolean) || []
    }

    return {
      data: gameWithRelations,
      error: null
    }
  } catch (error) {
    const err = error as { statusCode?: number, statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Failed to fetch game'
    })
  }
})

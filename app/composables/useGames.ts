import type { FullGameData, GameWithRelations } from '#shared/database'

export const useGames = () => {
  const supabase = useSupabaseClient()

  const fetchGames = async (options?: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }) => {
    const { page = 1, limit = 20, search = '', sortBy = 'title', sortOrder = 'asc' } = options || {}

    let query = supabase
      .from('full_game_data')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    return {
      data: data as FullGameData[],
      error,
      count,
      totalPages: count ? Math.ceil(count / limit) : 0
    }
  }

  const fetchGameById = async (id: number) => {
    // Fetch game with all relationships
    const { data: game, error: gameError } = await supabase
      .from('full_game_data')
      .select('*')
      .eq('id', id)
      .single()

    if (gameError || !game) {
      return { data: null, error: gameError }
    }

    // Fetch related data
    const [mechanics, systems, families, honors, primaryNames, alternateNames] = await Promise.all([
      // Fetch mechanics
      supabase
        .from('game_rpg_mechanics')
        .select('position, rpg_mechanics(*)')
        .eq('game_id', id)
        .order('position'),

      // Fetch systems
      supabase
        .from('game_rpg_systems')
        .select('position, rpg_systems(*)')
        .eq('game_id', id)
        .order('position'),

      // Fetch families
      supabase
        .from('game_rpg_families')
        .select('position, rpg_families(*)')
        .eq('game_id', id)
        .order('position'),

      // Fetch honors
      supabase
        .from('game_honors')
        .select('position, honors(*)')
        .eq('game_id', id)
        .order('position'),

      // Fetch primary names
      supabase
        .from('game_primary_names')
        .select('position, primary_names(*)')
        .eq('game_id', id)
        .order('position'),

      // Fetch alternate names
      supabase
        .from('game_alternate_names')
        .select('position, alternate_names(*)')
        .eq('game_id', id)
        .order('position')
    ])

    const gameWithRelations: GameWithRelations = {
      ...(game as FullGameData),
      rpg_mechanics: mechanics.data?.map((m: any) => m.rpg_mechanics).filter(Boolean) || [],
      rpg_systems: systems.data?.map((s: any) => s.rpg_systems).filter(Boolean) || [],
      rpg_families: families.data?.map((f: any) => f.rpg_families).filter(Boolean) || [],
      honors: honors.data?.map((h: any) => h.honors).filter(Boolean) || [],
      primary_names: primaryNames.data?.map((p: any) => p.primary_names).filter(Boolean) || [],
      alternate_names: alternateNames.data?.map((a: any) => a.alternate_names).filter(Boolean) || []
    }

    return { data: gameWithRelations, error: null }
  }

  const createGame = async (game: Partial<FullGameData>) => {
    const { data, error } = await supabase
      .from('full_game_data')
      .insert(game as any)
      .select()
      .single()

    return { data, error }
  }

  const updateGame = async (id: number, updates: Partial<FullGameData>) => {
    const { data, error } = await supabase
      .from('full_game_data')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  }

  const deleteGame = async (id: number) => {
    const { error } = await supabase
      .from('full_game_data')
      .delete()
      .eq('id', id)

    return { error }
  }

  return {
    fetchGames,
    fetchGameById,
    createGame,
    updateGame,
    deleteGame
  }
}

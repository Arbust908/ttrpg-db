import { serverSupabaseServiceRole } from '#supabase/server'
import type { FullGameData } from '#shared/database'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Parse query parameters with defaults
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20
  const search = String(query.search || '')
  const sortBy = String(query.sortBy || 'title')
  const sortOrder = query.sortOrder === 'desc' ? 'desc' : 'asc'

  try {
    const client = serverSupabaseServiceRole(event)

    if (!client) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to initialize Supabase client'
      })
    }

    let supabaseQuery = client
      .from('full_game_data')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (search) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply sorting
    supabaseQuery = supabaseQuery.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    supabaseQuery = supabaseQuery.range(from, to)

    const { data, error, count } = await supabaseQuery

    if (error) {
      console.error('Supabase query error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: error.message || 'Database query failed'
      })
    }

    return {
      data: data as FullGameData[],
      count: count || 0,
      totalPages: count ? Math.ceil(count / limit) : 0,
      page,
      limit
    }
  } catch (error) {
    const err = error as { statusCode?: number, statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Failed to fetch games'
    })
  }
})

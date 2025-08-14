import { serverSupabaseServiceRole } from '#supabase/server'
import type { FullGameData } from '#shared/database'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // Let's send an authorization error
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
    // Temporary

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid game ID'
    })
  }

  try {
    const body = await readBody(event)

    if (!body || Object.keys(body).length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No update data provided'
      })
    }

    const client = serverSupabaseServiceRole(event)
    const gameId = Number(id)

    // Validate and prepare update data
    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'description', 'year', 'subtitle', 'image_url', 'thumbnail',
      'rating_geek', 'rating_average', 'rating_voters', 'rank_category',
      'rank_position', 'url'
    ]

    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field]
      }
    }

    // Update the game - use type assertion to bypass Supabase type inference issue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateQuery = client.from('full_game_data') as any
    const { data, error } = await updateQuery
      .update(updateData)
      .eq('id', gameId)
      .select()
      .single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message
      })
    }

    if (!data) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Game not found'
      })
    }

    return {
      data: data as FullGameData,
      error: null
    }
  } catch (error) {
    const err = error as { statusCode?: number, statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Failed to update game'
    })
  }
})

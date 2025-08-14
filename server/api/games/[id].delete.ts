import { serverSupabaseServiceRole } from '#supabase/server'

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
    const client = serverSupabaseServiceRole(event)
    const gameId = Number(id)

    // Delete the game (cascade will handle related records)
    const { error } = await client
      .from('full_game_data')
      .delete()
      .eq('id', gameId)

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message
      })
    }

    return {
      success: true,
      error: null
    }
  } catch (error) {
    const err = error as { statusCode?: number, statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Failed to delete game'
    })
  }
})

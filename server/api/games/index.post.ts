import { serverSupabaseServiceRole } from '#supabase/server'
import type { FullGameData } from '#shared/database'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    // Let's send an authorization error
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
    // Temporary

    if (!body || !body.title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title is required'
      })
    }

    const client = serverSupabaseServiceRole(event)

    const { data, error } = await client
      .from('full_game_data')
      .insert(body)
      .select()
      .single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message
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
      statusMessage: err.statusMessage || 'Failed to create game'
    })
  }
})

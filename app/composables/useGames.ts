import type { FullGameData, GameWithRelations } from '#shared/database'

interface FetchGamesResponse {
  data: FullGameData[]
  count: number
  totalPages: number
  page: number
  limit: number
}

interface GameResponse {
  data: FullGameData | GameWithRelations
  error: null | string
}

interface DeleteResponse {
  success: boolean
  error: null | string
}

export const useGames = () => {
  const fetchGames = async (options?: {
    page?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }) => {
    try {
      const params = new URLSearchParams()

      if (options?.page) params.append('page', options.page.toString())
      if (options?.limit) params.append('limit', options.limit.toString())
      if (options?.search) params.append('search', options.search)
      if (options?.sortBy) params.append('sortBy', options.sortBy)
      if (options?.sortOrder) params.append('sortOrder', options.sortOrder)

      const response = await $fetch<FetchGamesResponse>(`/api/games?${params.toString()}`)

      return {
        data: response.data || [],
        error: null,
        count: response.count || 0,
        totalPages: response.totalPages || 0
      }
    } catch (error) {
      console.error('Failed to fetch games:', error)
      return {
        data: [],
        error: error instanceof Error ? error.message : String(error),
        count: 0,
        totalPages: 0
      }
    }
  }

  const fetchGameById = async (id: number) => {
    try {
      const response = await $fetch<GameResponse>(`/api/games/${id}`)
      return {
        data: response.data as GameWithRelations,
        error: null
      }
    } catch (error) {
      console.error('Failed to fetch game:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  const createGame = async (game: Partial<FullGameData>) => {
    try {
      const response = await $fetch<GameResponse>('/api/games', {
        method: 'POST',
        body: game
      })
      return {
        data: response.data as FullGameData,
        error: null
      }
    } catch (error) {
      console.error('Failed to create game:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  const updateGame = async (id: number, updates: Partial<FullGameData>) => {
    try {
      const response = await $fetch<GameResponse>(`/api/games/${id}`, {
        method: 'PATCH',
        body: updates
      })
      return {
        data: response.data as FullGameData,
        error: null
      }
    } catch (error) {
      console.error('Failed to update game:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  const deleteGame = async (id: number) => {
    try {
      await $fetch<DeleteResponse>(`/api/games/${id}`, {
        method: 'DELETE'
      })
      return {
        error: null
      }
    } catch (error) {
      console.error('Failed to delete game:', error)
      return {
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  return {
    fetchGames,
    fetchGameById,
    createGame,
    updateGame,
    deleteGame
  }
}

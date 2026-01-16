'use client'

import { useEffect, useState } from 'react'
import type { Movie } from '@/types'
import { MovieService } from '@/services'

interface UseMovieResult {
  movie: Movie | null
  loading: boolean
  error: string | null
}

export function useMovie(id?: string): UseMovieResult {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const data = await MovieService.getById(id)
        setMovie(data)
      } catch (err: unknown) {
        setMovie(null)
        setError(err instanceof Error ? err.message : 'Error al cargar la película')
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  return { movie, loading, error }
}

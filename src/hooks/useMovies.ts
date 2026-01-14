'use client'

import { useEffect, useState } from 'react'
import type { Movie } from '@/types'
import { MovieService } from '@/services/movie.service'

interface UseMoviesResult {
  movies: Movie[]
  loading: boolean
  error: string | null
}

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadMovies = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await MovieService.getAll()

        if (!isMounted) return
        setMovies(data)
      } catch (err: unknown) {
        if (!isMounted) return
        setError(
          err instanceof Error
            ? err.message
            : 'Error al cargar películas'
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadMovies()

    return () => {
      isMounted = false
    }
  }, [])

  return { movies, loading, error }
}
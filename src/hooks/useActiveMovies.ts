'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Movie } from '@/types'
import { MovieService } from '@/services'

interface UseActiveMoviesResult {
  movies: Movie[]
  loading: boolean
  error: string | null
}

export function useActiveMovies(): UseActiveMoviesResult {
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
        setError(err instanceof Error ? err.message : 'Error al cargar películas')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadMovies()

    return () => {
      isMounted = false
    }
  }, [])

  const activeMovies = useMemo(() => {
    return movies.filter((movie) => movie.isActive)
  }, [movies])

  return { movies: activeMovies, loading, error }
}

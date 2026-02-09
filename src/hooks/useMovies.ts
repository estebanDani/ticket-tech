'use client'

import { useEffect, useState } from 'react'
import type { Movie } from '@/types'
import { MovieService } from '@/services'

interface UseMoviesResult {
  movies: Movie[]
  loading: boolean
  error: string | null
  load: () => Promise<void>
}

export function useMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const loadMovies = async (isMounted:boolean) => {
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

  useEffect(() => {
    let isMounted = true


    loadMovies(isMounted)

    return () => {
      isMounted = false
    }
  }, [])

  return { movies, loading, error ,load: () => loadMovies(true)};
}

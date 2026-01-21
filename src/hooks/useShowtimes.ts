'use client'

import { useState, useEffect } from 'react'
import { Showtime } from '@/types'
import { ShowtimeService } from '@/services/showtime.service'
import { sortShowtimesByDateTime } from '@/utils'

type UseShowtimesResult = {
  showtimes: Showtime[]
  loading: boolean
  error: string | null
}

export function useShowtimes(movieId?: string): UseShowtimesResult {
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (!movieId) {
        setShowtimes([])
        setLoading(false)
        setError(null)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await ShowtimeService.getByMovieId(movieId)
        const sorted = [...data].sort(sortShowtimesByDateTime)

        if (!cancelled) {
          setShowtimes(sorted)
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Failed to fetch showtimes'
        if (!cancelled) {
          setError(message)
          setShowtimes([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [movieId])

  return { showtimes, loading, error }
}

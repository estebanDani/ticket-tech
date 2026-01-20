'use client'

import * as React from 'react'
import { Showtime } from '@/types'
import { ShowtimeService } from '@/services/showtime.service'

type UseShowtimesResult = {
  showtimes: Showtime[]
  loading: boolean
  error: string | null
}

function sortByDateTime(a: Showtime, b: Showtime) {
  const at = a.startTime?.getTime?.() ?? 0
  const bt = b.startTime?.getTime?.() ?? 0
  return at - bt
}

export function useShowtimes(movieId?: string): UseShowtimesResult {
  const [showtimes, setShowtimes] = React.useState<Showtime[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
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
        const sorted = [...data].sort(sortByDateTime)

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

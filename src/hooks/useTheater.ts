'use client'

import { useEffect, useState } from 'react'
import type { Theater } from '@/types'
import { theaterService } from '@/services'

type UseTheaterResult = {
  theater: Theater | null
  loading: boolean
  error: string | null
}

export function useTheater(id?: string): UseTheaterResult {
  const [theater, setTheater] = useState<Theater | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      if (!id) {
        setTheater(null)
        setLoading(false)
        setError(null)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const data = await theaterService.getById(id)
        if (!isMounted) return
        setTheater(data)
      } catch (err: unknown) {
        if (!isMounted) return
        setTheater(null)
        setError(err instanceof Error ? err.message : 'Error al cargar sala')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [id])

  return { theater, loading, error }
}

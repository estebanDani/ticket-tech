'use client'
import { useEffect, useState } from 'react'
import type { Theater } from '@/types'
import { theaterService } from '@/services'

interface UseTheatersResult {
    theaters: Theater[]
    loading: boolean
    error: string | null
}


export function useTheaters(): UseTheatersResult {
    const [theaters, setTheaters] = useState<Theater[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadTheaters = async () => {
            try {
                setLoading(true)
                setError(null)

                const data = await theaterService.getAll()

                if (!isMounted) return
                setTheaters(data)
            } catch (err: unknown) {
                if (!isMounted) return
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Error al cargar salas'
                )
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadTheaters()

        return () => {
            isMounted = false
        }
    }, [])

    return { theaters, loading, error }
}
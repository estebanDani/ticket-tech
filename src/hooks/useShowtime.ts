import { useState, useEffect } from 'react'
import { ShowtimeService } from '@/services/showtime.service'
import { Showtime } from '@/types'

export const useShowtime = (showtimeId?: string) => {
    const [showtime, setShowtime] = useState<Showtime | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!showtimeId) return

        const fetchShowtime = async () => {
            try {
                setLoading(true)
                const showtime = await ShowtimeService.getById(showtimeId)
                setShowtime(showtime)
            } catch (error) {
                setError(error as string)
            } finally {
                setLoading(false)
            }
        }
        fetchShowtime()
    }, [showtimeId])
    return {
        showtime,
        loading,
        error
    }
}

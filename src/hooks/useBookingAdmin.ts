'use client'
import { useState, useEffect } from 'react'
import type { Booking } from '@/types'
import { BookingService } from '@/services/booking.service'

interface UseBookingsResult {
    bookings: Booking[]
    loading: boolean
    error: string | null
}

export const useBookingAdmin = (): UseBookingsResult => {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadBookings = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await BookingService.getAll()

                if (!isMounted) return
                setBookings(response.data)
            } catch (err: unknown) {
                if (!isMounted) return
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Error al cargar reservas'
                )
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadBookings()

        return () => {
            isMounted = false
        }
    }, [])

    return { bookings, loading, error }
}
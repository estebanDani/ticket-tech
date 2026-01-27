'use client'
import { useState } from 'react'
import { useShowtime } from '@/hooks/useShowtime'
import { SeatGrid } from '@/components/seats/SeatGrid'
import { Seat } from '@/types'

interface ClientProps {
    showtimeId: string
}

export const SeatPageClient = ({ showtimeId }: ClientProps) => {
    const [seatMap, setSeatMap] = useState<Seat[]>([])
    const { showtime, error, loading } = useShowtime(showtimeId)
    const theaterId = showtime?.theaterId
    return (
        <div>
            <p>SEAT PAGE {showtimeId}</p>
            <SeatGrid seatMap={ } reservedSeats={ } />
        </div>
    )
}

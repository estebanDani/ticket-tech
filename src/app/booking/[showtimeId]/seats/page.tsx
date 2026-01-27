import React from 'react'
import { SeatPageClient } from './components/SeatPageClient'

interface PropsSeats {
    params: Promise<{ showtimeId: string }>
}

const SeatsPage = async ({ params }: PropsSeats) => {
    const { showtimeId } = await Promise.resolve(params)
    return (
        <SeatPageClient showtimeId={showtimeId} />
    )
}

export default SeatsPage
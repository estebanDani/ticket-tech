'use client'
import { Container, CircularProgress, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useShowtime } from '@/hooks/useShowtime'
import { useTheater } from '@/hooks/useTheater'
import { SeatGrid } from '@/components/seats/SeatGrid'
import SeatLegend from '@/components/seats/SeatLegend'
import { Seat } from '@/types'
import { theme } from '@/theme/theme'

interface ClientProps {
    showtimeId: string
}

export const SeatPageClient = ({ showtimeId }: ClientProps) => {
    const { showtime, error: showtimeError, loading: showtimeLoading } = useShowtime(showtimeId)
    const theaterId = showtime?.theaterId
    const { theater, error: theaterError, loading: theaterLoading } = useTheater(theaterId)

    const [seatMap, setSeatMap] = useState<Seat[]>([])
    const [reservedSeats, setReservedSeats] = useState<string[]>([])

    const loading = showtimeLoading || theaterLoading
    const error = showtimeError || theaterError

    useEffect(() => {
        if (theater?.seatMap) {
            setSeatMap(theater.seatMap)
        }
    }, [theater])

    useEffect(() => {
        if (showtime?.reservedSeats) {
            setReservedSeats(showtime.reservedSeats)
        }
    }, [showtime])

    if (loading) {
        return (
            <Container sx={styles.container} maxWidth="xl">
                <CircularProgress />
            </Container>
        )
    }

    if (error) {
        return (
            <Container sx={styles.container} maxWidth="xl">
                <Typography variant="h6" color="error">
                    Error al cargar los datos
                </Typography>
            </Container>
        )
    }

    return (
        <Container sx={styles.container} maxWidth="xl">
            <SeatLegend />
            <SeatGrid seatMap={seatMap} reservedSeats={reservedSeats} />
        </Container>
    )
}
const styles = {
    container: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        gap: 5,
    }
}

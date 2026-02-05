import { Box, Typography } from '@mui/material'
import { useBookings } from '@/hooks'
import { BookingCard } from '@/components/booking/booking_card/BookingCard'
import SkeletonCard from './SkeletonCard'


const ListContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {children}
        </Box>
    )
}

export const BookingList = () => {
    const { bookings, loading } = useBookings()

    if (loading) {
        return (
            <ListContainer>
                {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </ListContainer>
        )
    }

    if (bookings.length === 0) {
        return (
            <ListContainer>
                <Typography variant="h6" color="black">
                    🎬 No tienes reservas aún
                </Typography>
                <Typography variant="body2" color="black" sx={{ mt: 1 }}>
                    ¡Reserva tus películas favoritas!
                </Typography>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {bookings.map((booking) => (
                <BookingCard key={booking.id}
                    booking={booking}
                />
            ))}
        </ListContainer>
    )

}

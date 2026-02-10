import { Box, Typography } from '@mui/material'
import { useBookings } from '@/hooks/useBookings'
import { BookingCard } from '@/components/booking/booking_card/BookingCard'
import SkeletonBookingCard from './SkeletonCard'

interface BookingListProps {
    statusFilter?: string;
    dateFilter?: string;
}

const ListContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {children}
        </Box>
    )
}

export const BookingList = ({ statusFilter = 'Todas', dateFilter = 'Todos' }: BookingListProps) => {
    const { bookings, loading } = useBookings()

    const filteredBookings = bookings.filter(booking => {
        if (statusFilter !== 'Todas' && booking.status !== statusFilter) {
            return false;
        }

        if (!booking.showtime) {
            return false;
        }
        const showTime = new Date(booking.showtime.startTime);
        const now = new Date();
        
        if (dateFilter === 'future' && showTime < now) return false;
        if (dateFilter === 'past' && showTime >= now) return false;

        return true;
    });

    if (loading) {
        return (
            <ListContainer>
                {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonBookingCard key={index} />
                ))}
            </ListContainer>
        )
    }

    if (bookings.length === 0) {
        return (
            <ListContainer>
                <Typography variant="h6" color="text.primary" align="center" sx={{ mt: 4 }}>
                    🎬 No tienes reservas en tu historial
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    ¡Ve a la cartelera y reserva tu primera película!
                </Typography>
            </ListContainer>
        )
    }

    if (filteredBookings.length === 0) {
        return (
             <ListContainer>
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    No hay reservas que coincidan con los filtros seleccionados.
                </Typography>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {filteredBookings.map((booking) => (
                <BookingCard 
                    key={booking.id}
                    booking={booking}
                />
            ))}
        </ListContainer>
    )

}

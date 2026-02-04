import { Box, Typography } from '@mui/material'
import SkeletonBookingCard from '@/components/booking/booking_card/SkeletonBookingCard'
import { BookingCard } from '@/components/booking/booking_card/BookingCard'
import { Booking } from '@/types'

interface BookingListProps {
    bookings: Booking[]
    loading: boolean
}

export const BookingList = ({ bookings, loading }: BookingListProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonBookingCard key={index} />
                ))
            ) : bookings.length === 0 ? (
                <Typography variant='h6' sx={{ mb: 3, fontWeight: 'bold' }}>
                    No tienes reservas
                </Typography>
            ) : (
                bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))
            )}
        </Box>
    )
}

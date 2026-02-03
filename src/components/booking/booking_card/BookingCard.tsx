import { useState, useMemo } from 'react';
import { Box, Button, Typography, Card, CardMedia } from '@mui/material';
import { theme } from '@/theme/theme'
import { Booking } from '@/types';
import { useShowtime, useTheater, useMovie } from '@/hooks';
import { BookingChip } from './BookingChip';
import { QrModal } from './QrModal';
import { formatDateWithYear, formatTime } from '@/utils';

interface BookingCardProps {
    booking: Booking;
}
export const BookingCard = ({ booking }: BookingCardProps) => {
    const { movie } = useMovie(booking.movieId)
    const { showtime } = useShowtime(booking.showtimeId)
    const { theater } = useTheater(showtime?.theaterId)
    const [openModal, setOpenModal] = useState(false)

    const bookingData = useMemo(() => {
        return {
            id: booking.id,
            status: booking.status,
            movie: {
                title: movie?.title || 'Cargando...',
                posterUrl: movie?.posterUrl || 'https://es.web.img2.acsta.net/pictures/14/11/03/11/00/378754.jpg'
            },
            showtime: {
                date: formatDateWithYear(showtime?.startTime),
                time: formatTime(showtime?.startTime),
            },
            seats: booking.seats.join(', '),
            theater: theater?.name || 'Cargando...',
            qrCode: booking.qrCode,
            price: booking.totalPreice,
        };
    }, [booking, movie, showtime, theater]);


    return (
        <>
            <Card sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={styles.container}>
                    <CardMedia
                        component="img"
                        image={bookingData.movie.posterUrl}
                        alt={bookingData.movie.title}
                        sx={{
                            width: 120,
                            height: 180,
                        }}
                    />
                    <Box sx={styles.info}>
                        <BookingChip status={bookingData.status} />
                        <Typography variant='h6' fontWeight={700}>{bookingData.movie.title}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='caption'>{bookingData.showtime.date} ⬥ ⏰ {bookingData.showtime.time}</Typography>
                            <Typography variant='caption'>{bookingData.theater} ⬥ 🪑 {bookingData.seats} ⬥ 💰 {bookingData.price}</Typography>
                        </Box>
                        <Typography variant='caption'>#{bookingData.id}</Typography>
                        <Box sx={styles.buttons}>
                            <Button
                                variant='outlined'
                                sx={{ color: theme.palette.grey[300], borderColor: theme.palette.grey[300] }}
                                onClick={() => setOpenModal(true)}
                            >
                                Ver QR
                            </Button>
                            <Button
                                variant='outlined'
                                sx={{ color: theme.palette.grey[300], borderColor: theme.palette.grey[300] }}
                            >
                                Detalles
                            </Button>
                            {bookingData.status === 'pending' &&
                                <Button
                                    variant='outlined'
                                    sx={{ color: theme.palette.error.main, borderColor: theme.palette.error.main }}
                                >
                                    X Cancelar
                                </Button>
                            }
                        </Box>
                    </Box>
                </Box>
            </Card>
            <QrModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                qrCode={bookingData.qrCode}
                idReserva={bookingData.id}
            />
        </>
    )
}
const styles = {
    container: {
        display: 'flex',
        justifyContent: "start",
        alignContent: "center",
        gap: 2
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignContent: "center",
        gap: 1
    },
    buttons: {
        display: 'flex',
        justifyContent: "center",
        alignContent: "center",
        gap: 1
    },
}

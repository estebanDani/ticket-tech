import { useState, useMemo } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Card, 
    CardMedia, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions,
    CircularProgress 
} from '@mui/material';
import { theme } from '@/theme/theme'
import { Booking } from '@/types';
import { useShowtime, useTheater, useMovie } from '@/hooks';
import { BookingService } from '@/services'; 
import { BookingChip } from './BookingChip';
import { QrModal } from './QrModal';
import { BookingDetailsModal } from '@/components';
import { formatDateWithYear, formatTime } from '@/utils';

interface BookingCardProps {
    booking: Booking;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
    const { movie } = useMovie(booking.movieId)
    const { showtime } = useShowtime(booking.showtimeId)
    const { theater } = useTheater(showtime?.theaterId)
    
    const [openQrModal, setOpenQrModal] = useState(false)
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    
    const [openCancelConfirm, setOpenCancelConfirm] = useState(false)
    const [cancelling, setCancelling] = useState(false)

    const bookingData = useMemo(() => {
        return {
            id: booking.id,
            status: booking.status,
            movie: {
                title: movie?.title,
                posterUrl: movie?.posterUrl
            },
            showtime: {
                date: formatDateWithYear(showtime?.startTime),
                time: formatTime(showtime?.startTime),
            },
            seats: booking.seats.join(', '),
            theater: theater?.name,
            qrCode: booking.qrCode,
            price: booking.totalPreice,
        };
    }, [booking, movie, showtime, theater]);

    const handleCancelBooking = async () => {
        try {
            setCancelling(true);
            await BookingService.cancel(booking.id);
            setOpenCancelConfirm(false);
            window.location.reload(); 
        } catch (error) {
            console.error("Error al cancelar", error);
            alert("Hubo un error al cancelar la reserva");
        } finally {
            setCancelling(false);
        }
    };

    return (
        <>
            <Card sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.grey[100]}` }}>
                <Box sx={styles.container}>
                    <CardMedia
                        component="img"
                        image={bookingData.movie.posterUrl}
                        alt={bookingData.movie.title}
                        sx={{
                            width: 120,
                            height: 180,
                            borderRadius: 2
                        }}
                    />
                    <Box sx={styles.info}>
                        <BookingChip status={bookingData.status} />
                        <Typography variant='h6' fontWeight={700}>{bookingData.movie.title}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='body1'>{bookingData.showtime.date} ⬥ ⏰ {bookingData.showtime.time}</Typography>
                            <Typography variant='body1'>{bookingData.theater} ⬥ 🪑 {bookingData.seats} ⬥ 💰 {bookingData.price}</Typography>
                        </Box>
                        <Typography variant='caption'>#{bookingData.id}</Typography>
                        
                        <Box sx={styles.buttons}>
                            <Button
                                variant='outlined'
                                sx={{ color: theme.palette.grey[300], borderColor: theme.palette.grey[300] }}
                                onClick={() => setOpenQrModal(true)}
                            >
                                Ver QR
                            </Button>
                            
                            <Button
                                variant='outlined'
                                sx={{ color: theme.palette.grey[300], borderColor: theme.palette.grey[300] }}
                                onClick={() => setOpenDetailsModal(true)}
                            >
                                Detalles
                            </Button>

                            {bookingData.status === 'pending' &&
                                <Button
                                    variant='outlined'
                                    onClick={() => setOpenCancelConfirm(true)}
                                    sx={{ 
                                        color: theme.palette.error.main, 
                                        borderColor: theme.palette.error.main,
                                        '&:hover': {
                                            backgroundColor: 'rgba(211, 47, 47, 0.04)',
                                            borderColor: theme.palette.error.dark
                                        }
                                    }}
                                >
                                    X Cancelar
                                </Button>
                            }
                        </Box>
                    </Box>
                </Box>
            </Card>

            <QrModal
                open={openQrModal}
                onClose={() => setOpenQrModal(false)}
                qrCode={bookingData.qrCode}
                idReserva={bookingData.id}
            />

            <BookingDetailsModal 
                open={openDetailsModal}
                onClose={() => setOpenDetailsModal(false)}
                data={bookingData}
            />

            <Dialog
                open={openCancelConfirm}
                onClose={() => !cancelling && setOpenCancelConfirm(false)}
            >
                <DialogTitle>¿Cancelar Reserva?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas cancelar esta reserva? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setOpenCancelConfirm(false)} 
                        color="inherit" 
                        disabled={cancelling}
                    >
                        No, mantener
                    </Button>
                    <Button 
                        onClick={handleCancelBooking} 
                        color="error" 
                        variant="contained" 
                        autoFocus
                        disabled={cancelling}
                        startIcon={cancelling ? <CircularProgress size={20} color="inherit"/> : null}
                    >
                        {cancelling ? "Cancelando..." : "Sí, Cancelar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: "start",
        alignContent: "center",
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' } 
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignContent: "center",
        gap: 1,
        width: '100%'
    },
    buttons: {
        display: 'flex',
        justifyContent: "flex-start", 
        alignContent: "center",
        gap: 1,
        flexWrap: 'wrap',
        mt: 1
    },
}
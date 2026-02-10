import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Grid,
    Divider,
    Chip,
    IconButton
} from '@mui/material';
import {Close, CalendarToday,AccessTime, LocationOn, Chair,AttachMoney} from '@mui/icons-material';
import { theme } from '@/theme/theme';

interface BookingData {
    id: string;
    status: string;
    movie: {
        title?: string;
        posterUrl?: string;
    };
    showtime: {
        date: string;
        time: string;
    };
    seats: string;
    theater?: string;
    price: number;
}

interface BookingDetailsModalProps {
    open: boolean;
    onClose: () => void;
    data: BookingData;
}

export const BookingDetailsModal = ({ open, onClose, data }: BookingDetailsModalProps) => {
    
    const statusColors: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
        pending: 'warning',
        confirmed: 'success',
        cancelled: 'error'
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography component="span" variant="h6" fontWeight={700}>
                    Detalles de Reserva
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid
                        size={{ xs: 12, sm: 4 }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >

                        <Box
                            component="img"
                            src={data.movie.posterUrl}
                            alt={data.movie.title}
                            sx={{
                                width: '100%',
                                maxWidth: 150,
                                borderRadius: 2,
                                boxShadow: 3,
                                objectFit: 'cover'
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 8 }}>
                        <Box display="flex" flexDirection="column" gap={1.5}>
                            <Box>
                                <Typography variant="h5" fontWeight={800} color="primary" lineHeight={1.2}>
                                    {data.movie.title}
                                </Typography>
                                <Chip 
                                    label={data.status.toUpperCase()} 
                                    color={statusColors[data.status] || 'default'} 
                                    size="small" 
                                    sx={{ mt: 1, fontWeight: 'bold' }} 
                                />
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" gap={1} alignItems="center">
                                <CalendarToday color="action" fontSize="small" />
                                <Typography variant="body1" fontWeight={500}>{data.showtime.date}</Typography>
                            </Box>
                            <Box display="flex" gap={1} alignItems="center">
                                <AccessTime color="action" fontSize="small" />
                                <Typography variant="body1" fontWeight={500}>{data.showtime.time}</Typography>
                            </Box>

                            <Box display="flex" gap={1} alignItems="center">
                                <LocationOn color="action" fontSize="small" />
                                <Typography variant="body2">{data.theater}</Typography>
                            </Box>

                            <Box display="flex" gap={1} alignItems="flex-start">
                                <Chair color="action" fontSize="small" sx={{ mt: 0.3 }} />
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Asientos:</Typography>
                                    <Typography variant="body1" fontWeight={700}>{data.seats}</Typography>
                                </Box>
                            </Box>

                             <Box 
                                sx={{ 
                                    mt: 1, 
                                    p: 1.5, 
                                    bgcolor: theme.palette.grey[50], 
                                    borderRadius: 2, 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center'
                                }}
                            >
                                <Box display="flex" alignItems="center">
                                    <AttachMoney color="success" />
                                    <Typography variant="body2" fontWeight={600}>Total Pagado</Typography>
                                </Box>
                                <Typography variant="h6" fontWeight={800} color="success.main">
                                    Bs {data.price}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="caption" display="block" textAlign="center" color="text.secondary">
                            ID de Transacción: {data.id}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="contained" fullWidth>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
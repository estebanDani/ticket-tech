'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  Container, 
  Paper, 
} from '@mui/material';
import { 
  CheckCircle, 
  Movie as MovieIcon, 
  CalendarToday, 
  AccessTime, 
  MeetingRoom, 
  EventSeat, 
  MonetizationOn, 
  CreditCard,
  Smartphone,
  Home,
  ConfirmationNumber
} from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

import { useBooking } from '@/contexts/BookingContext';

export default function BookingConfirmation() {
  const router = useRouter();
  const { selectedMovie, selectedShowtime, selectedTheater, selectedSeats } = useBooking();

  if (!selectedMovie || !selectedShowtime || !selectedTheater) {
    return <Typography>No hay información de reserva disponible.</Typography>;
  }

  const showtimeDate = new Date(selectedShowtime.startTime);
  const formattedDate = format(selectedShowtime.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
  const formattedTime = format(showtimeDate, "HH:mm a", { locale: es });
  
  const totalPrice = selectedShowtime.price * selectedSeats.length;
  const bookingCode = `#BK-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;

  const DetailRow = ({ icon, text }: { icon: React.ReactNode, text: string | React.ReactNode }) => (
    <Box display="flex" alignItems="center" gap={1.5} mb={1}>
      <Box color="grey.400" display="flex">{icon}</Box>
      <Typography variant="body2" fontWeight={500} color="text.primary">
        {text}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      
      <Box textAlign="center" mb={4}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" fontWeight={700} color="success.main" gutterBottom>
          ¡RESERVA CONFIRMADA!
        </Typography>
        <Typography variant="body1" color="text.primary">
          Tu reserva ha sido procesada exitosamente
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 0, 
          overflow: 'hidden', 
          borderRadius: 3, 
          border: '1px solid',
          borderColor: 'grey.100' 
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px dashed', borderColor: 'grey.300' }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                🏷️ DETALLES DE TU RESERVA
            </Typography>
        </Box>

        <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}> 
            
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                Código de Reserva: {bookingCode}
            </Typography>

            <Stack spacing={0.5} mb={4}>
                <DetailRow icon={<MovieIcon fontSize="small"/>} text={selectedMovie.title} />
                <DetailRow icon={<CalendarToday fontSize="small"/>} text={formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)} />
                <DetailRow icon={<AccessTime fontSize="small"/>} text={formattedTime} />
                <DetailRow icon={<MeetingRoom fontSize="small"/>} text={selectedTheater.name} />
                <DetailRow icon={<EventSeat fontSize="small"/>} text={`Asientos: ${selectedSeats.join(', ')}`} />
                <DetailRow icon={<MonetizationOn fontSize="small"/>} text={`Total Pagado: ${totalPrice} Bs`} />
                <DetailRow icon={<CreditCard fontSize="small"/>} text="Método: Tarjeta de crédito" />
            </Stack>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" my={4}>
                <Box 
                    sx={{ 
                        width: 100, 
                        height: 100, 
                        bgcolor: 'grey.100', 
                        borderRadius: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    <Smartphone sx={{ fontSize: 60, color: 'primary.main' }} />
                </Box>
                <Typography variant="caption" color="grey.800" sx={{ mt: 1 }}>
                    👈 Presenta este código en la entrada del cine
                </Typography>
            </Box>
        </Box>
      </Paper>

      <Paper 
        elevation={0}
        sx={{ 
            mt: 4, 
            p: 2, 
            bgcolor: 'warning.light', 
            borderRadius: 2,
            borderLeft: '4px solid',
            borderColor: 'warning.main'
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            📝 IMPORTANTE:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2, typography: 'caption', color: 'text.primary' }}>
            <li>Llega 15 minutos antes del inicio de la función</li>
            <li>Presenta este QR o el código en la entrada</li>
            <li>No se permiten reembolsos después de 2 horas antes de la función</li>
        </Box>
      </Paper>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4} justifyContent="center">
        <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Home />}
            onClick={() => router.push('/')}
            sx={{ px: 4, py: 1.5 }}
        >
            Volver al Inicio
        </Button>
        <Button 
            variant="contained" 
            color="success" 
            startIcon={<ConfirmationNumber />}
            onClick={() => router.push('/my-bookings')} 
            sx={{ px: 4, py: 1.5 }}
        >
            Ver Mis Reservas
        </Button>
      </Stack>

    </Container>
  );
}
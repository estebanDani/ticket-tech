'use client';

import { Card, CardContent, Typography, Divider, Button, Stack, Box} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { useBooking } from '@/contexts/BookingContext';

interface BookingSummaryProps {
  onConfirm: () => void;
}

export default function BookingSummary({ onConfirm }: BookingSummaryProps) {
  const {selectedMovie, selectedShowtime, selectedTheater, selectedSeats} = useBooking();

  if (!selectedMovie || !selectedShowtime || !selectedTheater) {
    return null;
  }

  const showtimeDate = new Date(selectedShowtime.startTime);
  const formattedDate = format(selectedShowtime.date, "EEE d MMMM, yyyy", { locale: es });
  const formattedTime = format(showtimeDate, "HH:mm", { locale: es });

  const seatPrice = selectedShowtime.price; 
  const totalPrice = seatPrice * selectedSeats.length;
  
  return (
    <Card sx={{ 
      weight: '100%',
      maxWidth: 370,
      borderRadius: 1, 
      boxShadow: 3
      }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📋 RESUMEN DE COMPRA
        </Typography>

        <Stack spacing={1} mb={2} border={0.5} borderColor="grey.300" padding={1} borderRadius={1}>
          <Typography fontWeight={600}>
            🎬 {selectedMovie.title}
          </Typography>

          <Typography variant="body2" >
            📆 {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
            <br />
            🕖 {formattedTime}
            <br />
            🏢 {selectedTheater.name}
            <br />
            🪑 Asientos: {selectedSeats.join(', ')}
          </Typography>
          
        </Stack>


        <Stack spacing={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Subtotal:</Typography>
            <Typography><strong >{totalPrice} Bs</strong></Typography>
          </Box>

          <Divider />
          
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Servicio:</Typography>
            <Typography><strong >0 Bs</strong></Typography>
          </Box>
          
          <Divider />
          
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">TOTAL:</Typography>
            <Typography><strong >{totalPrice} Bs</strong></Typography>
          </Box>
        </Stack>

        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 3, borderRadius: 1 }}
          onClick={onConfirm}
        >
          Confirmar y Pagar – {totalPrice} Bs
        </Button>
      </CardContent>
    </Card>
  );
}
'use client';

import React, { useMemo } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

import { Seat } from '@/types';
import { useBooking } from '@/contexts/BookingContext';
import { SeatButton, SeatStatus } from './SeatButton';

interface SeatGridProps {
  seatMap: Seat[];
  reservedSeats: string[];
}

export const SeatGrid: React.FC<SeatGridProps> = ({ seatMap, reservedSeats }) => {
  const { selectedSeats, setSeats } = useBooking();
  const MAX_SEATS = 8;

  const rows = useMemo(() => {
    return seatMap.reduce((acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    }, {} as Record<string, Seat[]>);
  }, [seatMap]);

  const handleSeatClick = (seatId: string) => {
    const isSelected = selectedSeats.includes(seatId);

    if (isSelected) {
      setSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length >= MAX_SEATS) {
        alert(`No puedes seleccionar más de ${MAX_SEATS} asientos.`);
        return;
      }
      setSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatStatus = (seatId: string): SeatStatus => {
    if (reservedSeats.includes(seatId)) return 'reserved';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        p: 4,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'grey.300',
          color: 'grey.900',
          py: 1,
          mb: 8,
          mx: 'auto',
          width: '80%',
          fontSize: '0.75rem',
          letterSpacing: 2,
        }}
      >
        🎥 PANTALLA
      </Paper>

      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        {Object.keys(rows)
          .sort()
          .map((rowLabel) => (
            <Grid
              key={rowLabel}
              container
              sx={{
                mb: 1,
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'grey.800',
                  fontWeight: 'bold',
                  width: 30,
                  textAlign: 'center',
                }}
              >
                {rowLabel}
              </Typography>

              <Grid
                sx={{
                  display: 'grid',
                  gap: 1,
                  gridAutoFlow: 'column',
                  justifyContent: 'center',
                  placeItems: 'center',
                }}
              >
                {rows[rowLabel]
                  .sort((a, b) => a.number - b.number)
                  .map((seat) => (
                    <SeatButton
                      key={seat.id}
                      seat={seat.id}                     
                      status={getSeatStatus(seat.id)}    
                      onClick={handleSeatClick}       
                    />
                  ))}
              </Grid>
            </Grid>
          ))}
      </Box>
    </Box>
  );
};

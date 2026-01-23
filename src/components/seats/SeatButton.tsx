'use client';

import { Box } from '@mui/material';
import { Seat } from '@/types';

interface SeatButtonProps {
  seat: Seat;
  isReserved: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const SeatButton = ({
  seat,
  isReserved,
  isSelected,
  onClick,
}: SeatButtonProps) => {
  const hasAisle = seat.number === 3 || seat.number === 7;

  return (
    <Box
      sx={{
        mr: hasAisle ? 4 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        onClick={isReserved ? undefined : onClick}
        sx={{
          width: 30,
          height: 30,
          borderRadius: '6px',
          cursor: isReserved ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: '0.2s',
          backgroundColor: isReserved
            ? theme => theme.palette.error.main
            : isSelected
            ? theme => theme.palette.success.main
            : theme => theme.palette.grey[400],
          '&:hover': {
            opacity: isReserved ? 1 : 0.8,
            transform: isReserved ? 'none' : 'scale(1.1)',
          },
        }}
      />
    </Box>
  );
};

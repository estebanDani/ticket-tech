'use client'

import { MouseEvent } from 'react'
import { Tooltip, ToggleButton } from '@mui/material'

export type SeatStatus = 'available' | 'reserved' | 'selected'

export type SeatButtonProps = {
  seat: string
  status: SeatStatus
  onClick: (seat: string) => void
  disabled?: boolean
}

function getSeatStyles(status: SeatStatus) {
  if (status === 'reserved') {
    return {
      bgcolor: 'error.main',
      color: 'error.contrastText',
      '&:hover': { bgcolor: 'error.dark' },
    }
  }

  if (status === 'selected') {
    return {
      bgcolor: 'success.main',
      color: 'success.contrastText',
      '&:hover': { bgcolor: 'success.dark' },
      '&.Mui-selected': {
        bgcolor: 'success.main',
        color: 'success.contrastText',
      },
      '&.Mui-selected:hover': {
        bgcolor: 'success.dark',
      },
    }
  }

  return {
    bgcolor: 'grey.300',
    color: 'text.primary',
    '&:hover': { bgcolor: 'grey.400' },
  }
}

export function SeatButton({
  seat,
  status,
  onClick,
  disabled,
}: SeatButtonProps) {
  const isReserved = status === 'reserved'
  const isDisabled = disabled ?? isReserved

  const handleClick = (_: MouseEvent<HTMLElement>) => {
    if (isDisabled) return
    onClick(seat)
  }

  return (
    <Tooltip title={`Asiento ${seat}`} arrow>
      <span>
        <ToggleButton
          value={seat}
          selected={status === 'selected'}
          disabled={isDisabled}
          onClick={handleClick}
          size="small"
          aria-label={`Seat ${seat}`}
          sx={{
            minWidth: 44,
            height: 44,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            textTransform: 'none',
            fontWeight: 700,
            ...getSeatStyles(status),
            '&.Mui-disabled': {
              opacity: 0.75,
              cursor: 'not-allowed',
            },
          }}
        >
          {seat}
        </ToggleButton>
      </span>
    </Tooltip>
  )
}

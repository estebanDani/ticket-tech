'use client'

import { MouseEvent, useMemo } from 'react'
import { addDays, format, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

export type DateSelectorProps = {
  value: Date
  onDateSelect: (date: Date) => void
  daysToShow?: number
  minDate?: Date
  disabled?: boolean
  size?: 'small' | 'medium'
}

function formatLabel(date: Date) {
  const rawDay = format(date, 'EEE', { locale: es })
  const day = rawDay.replace('.', '')
  const dayCap = day.charAt(0).toUpperCase() + day.slice(1)
  return `${dayCap} ${format(date, 'dd/MM')}`
}

export function DateSelector({
  value,
  onDateSelect,
  daysToShow = 7,
  minDate,
  disabled = false,
  size = 'small',
}: DateSelectorProps) {
  const baseDate = useMemo(() => startOfDay(minDate ?? new Date()), [minDate])

  const dates = useMemo(
    () => Array.from({ length: daysToShow }, (_, i) => startOfDay(addDays(baseDate, i))),
    [baseDate, daysToShow]
  )

  const selectedKey = useMemo(() => format(startOfDay(value), 'yyyy-MM-dd'), [value])

  const handleChange = (_: MouseEvent<HTMLElement>, newKey: string | null) => {
    if (!newKey) return
    const selected = dates.find((d) => format(d, 'yyyy-MM-dd') === newKey)
    if (selected) onDateSelect(selected)
  }

  return (
    <ToggleButtonGroup
      value={selectedKey}
      exclusive
      onChange={handleChange}
      disabled={disabled}
      size={size}
      sx={{
        width: '100%',
        overflowX: 'auto',
        display: 'flex',
        gap: 1,
        '& .MuiToggleButton-root': {
          textTransform: 'none',
          borderRadius: 2,
          whiteSpace: 'nowrap',
          px: 2,
        },
      }}
    >
      {dates.map((date) => {
        const key = format(date, 'yyyy-MM-dd')
        const label = formatLabel(date)

        return (
          <ToggleButton key={key} value={key} aria-label={label}>
            {label}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDateLabel(date: Date) {
  const rawDay = format(date, 'EEE', { locale: es })
  const day = rawDay.replace('.', '')
  const dayCap = day.charAt(0).toUpperCase() + day.slice(1)
  return `${dayCap} ${format(date, 'dd/MM')}`
}

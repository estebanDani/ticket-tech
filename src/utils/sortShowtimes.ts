import { Showtime } from '@/types'

export function sortShowtimesByDateTime(a: Showtime, b: Showtime) {
  return a.startTime.getTime() - b.startTime.getTime()
}

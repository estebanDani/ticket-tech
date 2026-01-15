import type { Theater, Seat } from '@/types/theater.types'

const generateSeatMap = (rows: number, seatsPerRow: number) => {
  const seats:Seat [] = []
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (let r = 0; r < rows; r++) {
    for (let s = 1; s <= seatsPerRow; s++) {
      seats.push({
        id: `${alphabet[r]}${s}`,
        row: alphabet[r],
        number: s,
        type: s === 1 ? 'disabled' : 'normal',
        position: {
          x: s,
          y: r + 1,
        },
      })
    }
  }

  return seats
}

export const mockTheaters: Array<Omit<Theater, 'id'>> = [
  {
    name: 'Sala 1',
    rows: 8,
    seatsPerRow: 10,
    capacity: 80,
    seatMap: generateSeatMap(8, 10),
    amenities: ['Dolby Digital', '2D'],
  },
  {
    name: 'Sala 2',
    rows: 10,
    seatsPerRow: 12,
    capacity: 120,
    seatMap: generateSeatMap(10, 12),
    amenities: ['3D', 'Sonido Surround'],
  },
  {
    name: 'Sala 3',
    rows: 10,
    seatsPerRow: 15,
    capacity: 150,
    seatMap: generateSeatMap(10, 15),
    amenities: ['IMAX', 'Dolby Atmos'],
  },
  {
    name: 'Sala VIP',
    rows: 6,
    seatsPerRow: 10,
    capacity: 60,
    seatMap: generateSeatMap(6, 10),
    amenities: ['Butacas reclinables', '4D', 'E-Motion'],
  },
]

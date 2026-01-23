import {collection, doc, runTransaction} from 'firebase/firestore'
import QRCode  from 'qrcode'

import { db } from '@/services/firebase'
import type { Booking,CreateBookingDto } from '@/types'
import { COLLECTIONS } from '@/utils'

export class BookingService {
  
  static async create(data: CreateBookingDto): Promise<Booking> {
    
    const bookingRef = doc(collection(db, COLLECTIONS.BOOKINGS))
    const showtimeRef = doc(db, COLLECTIONS.SHOWTIMES, data.showtimeId)

    return await runTransaction(db, async (transaction) => {
      const showtimeSnap = await transaction.get(showtimeRef)

      if (!showtimeSnap.exists()) {
        throw new Error('Showtime no existe')
      }

      const showtime = showtimeSnap.data()

      const availableSeats: number = showtime.availableSeats
      const reservedSeats: string[] = showtime.reservedSeats || []

      //comprobar asientos
      const alreadyReserved = data.seats.some((seat) =>
        reservedSeats.includes(seat)
      )

      if (alreadyReserved) {
        throw new Error('One or more seats are already reserved')
      }

      if (availableSeats < data.seats.length) {
        throw new Error('There are not enough available seats')
      }

      //updateShowtime
      transaction.update(showtimeRef, {
        availableSeats: availableSeats - data.seats.length,
        reservedSeats: [...reservedSeats, ...data.seats],
      })
      const qrCode = await QRCode.toDataURL(bookingRef.id)
      
      //generateQR
      const booking: Booking = {
        id: bookingRef.id,
        ...data,
        qrCode,
      }

      return booking
    })
  }
}

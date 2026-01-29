import {collection, doc, getDoc, getDocs, orderBy, query, runTransaction, where} from 'firebase/firestore'
import QRCode  from 'qrcode'

import { db } from '@/services/firebase'
import type { Booking,CreateBookingDto } from '@/types'
import { COLLECTIONS } from '@/utils'
import { Movie, Showtime } from '@/types'

export interface BookingWithDetails extends Booking {
  movie?: Movie;
  showtime?: Showtime;
}

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
      transaction.set(bookingRef, booking);
      return booking
    })
  }

  static async getByUser(userId: string): Promise<BookingWithDetails[]> {
    try {
      const bookingsRef = collection(db, COLLECTIONS.BOOKINGS);
      
      const q = query(
        bookingsRef, 
        where("userId", "==", userId), 
        orderBy("bookingDate", "desc")
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return [];
      }

      const rawBookings = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          bookingDate: data.bookingDate?.toDate ? data.bookingDate.toDate() : new Date(data.bookingDate),
        };
      }) as Booking[];

      const bookingsWithDetails = await Promise.all(
        rawBookings.map(async (booking) => {
          
          const [movieSnap, showtimeSnap] = await Promise.all([
             getDoc(doc(db, COLLECTIONS.MOVIES, booking.movieId)),
             getDoc(doc(db, COLLECTIONS.SHOWTIMES, booking.showtimeId))
          ]);

          return {
            ...booking,
            movie: movieSnap.exists() ? ({ id: movieSnap.id, ...movieSnap.data() } as Movie) : undefined,
            showtime: showtimeSnap.exists() ? ({ id: showtimeSnap.id, ...showtimeSnap.data() } as Showtime) : undefined,
          };
        })
      );

      return bookingsWithDetails;

    } catch (error) {
      console.error("Error", error);
      throw new Error("No se pude cargar");
    }
  }
}

import {collection, doc, getDocs, limit, query, QueryDocumentSnapshot, runTransaction, startAfter, where} from 'firebase/firestore'
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
      transaction.set(bookingRef, booking);
      return booking
    })
  }

 
  static async getAll(options?: { 
    pageSize?: number; 
    lastDoc?: QueryDocumentSnapshot;
    filters?: {
      userId?:string;
      status?:'pending' | 'confirmed' | 'cancelled';
    }}): Promise<{ data: Booking[];lastDoc: QueryDocumentSnapshot | null;}> {

    const { pageSize = 10, lastDoc, filters} = options || {};

    let queryBooking = query(collection(db, COLLECTIONS.BOOKINGS));

    if (filters?.userId) {
      queryBooking = query(queryBooking, where('userId', '==', filters.userId));
    }

    if (filters?.status) {
      queryBooking = query(queryBooking, where('status', '==', filters.status));
    }

    if (lastDoc) {
      queryBooking = query(queryBooking, startAfter(lastDoc));
    }

    queryBooking = query(queryBooking, limit(pageSize));

    const snapshot = await getDocs(queryBooking);

    const bookings: Booking[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Booking, 'id'>),
    }));

    const lastDocs =
      snapshot.docs.length > 0
        ? snapshot.docs[snapshot.docs.length - 1]
        : null;

    return {
      data: bookings,
      lastDoc: lastDocs,
    };
  }

}

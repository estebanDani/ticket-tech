import { Timestamp } from "firebase/firestore";
import { Movie } from "./movie.types";
import { Showtime } from "./showtime.types";

export interface Booking {
    id: string;
    userId: string;
    showtimeId: string;
    movieId: string;
    seats: string[];
    totalPreice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentMethod: string;
    bookingDate: Timestamp;
    qrCode: string;
}



export interface BookingWithDetails extends Booking {
    movie?: string;
    theater?: string;
    user?: string;
    movieObje?: Movie;
    showtime?: Showtime;
}

export type CreateBookingDto = Omit<Booking, 'id' | 'qrCode'>;
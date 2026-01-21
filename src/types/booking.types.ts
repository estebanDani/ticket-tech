export interface Booking {
    id: string;
    userId: string;
    showtimeId: string;
    movieId: string;
    seats: string [];
    totalPreice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentMethod: string;
    bookingDate:Date;
    qrCode: string;
}

export type CreateBookingDto = Omit<Booking, 'id'| 'qrCode'>;
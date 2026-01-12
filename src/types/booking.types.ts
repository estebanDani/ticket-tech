export interface Booking {
    id: string;
    userId: string;
    showtimeID: string;
    movieId: string;
    seats: string [];
    totalPreice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentMethod: string;
    bookingDate:Date;
    qrCode: string;
}
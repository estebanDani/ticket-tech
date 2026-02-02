export interface Showtime {
    id: string;
    movieId: string;
    theaterId: string;
    startTime: Date;
    endTime: Date;
    price: number;
    availableSeats: number;
    reservedSeats: string[];
    date: string;
}

export type CreateShowtimeDto = Omit<Showtime, 'id'>;
export type UpdateShowtimeDto = Partial<Omit<Showtime, 'id'>>;
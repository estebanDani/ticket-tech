export interface Showtime {
    id: string;
    movieId: string;
    theaterId: string;
    startTime: Date;
    endTime: Date; 
    price: number;
    availableSeats: number;
    reservedSeats: string[];
    date:string;
}
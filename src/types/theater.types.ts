export interface Theater {
    id: string;
    name: string;
    capacity: number;
    rows: number;
    seatsPerRow: number;
    seatMap: Seat[];
    amenities: string[];
}

export interface Seat {
    id: string;
    row: string;
    number: number;
    type: 'normal' | 'disabled';
    position: { x: number, y: number };
}

export type CreateTheaterDto = Omit<Theater, 'id'|'capacity'|'seatMap'>;


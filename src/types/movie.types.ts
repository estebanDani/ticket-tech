export interface Movie {
    id: string;
    title: string;
    synopsis: string;
    duration: number;
    genre: string [];
    rating: number;
    posterUrl: string;
    trailerUrl: string;
    releaseDate: Date;
    isActive: boolean;
    createdAt: Date;
}

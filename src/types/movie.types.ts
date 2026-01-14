export interface Movie {
    id: string;
    title: string;
    synopsis: string;
    duration: number;
    genre: string [];
    rating: string;
    posterUrl: string;
    trailerUrl: string;
    releaseDate: Date;
    isActive: boolean;
    createdAt: Date;
}

export type CreateMovieDto = Omit<Movie, 'id'>;

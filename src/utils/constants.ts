import { CreateMovieDto } from "@/types";

export const COLLECTIONS = {
  MOVIES: 'movies',
  THEATERS: 'theaters',
  SHOWTIMES: 'showtimes',
  BOOKINGS: 'bookings',
  USERS: 'users',
} as const;

export const GenereMovies = {
    ALL : 'all',
    ACTION:'Acción',
    DRAMA:'Drama',
    COMEDY:'Comedia',
    HORROR:'Terror',
    ANIMATION:'Animación',
    ADVENTURE:'Aventura',
    FANTASY:'Fantasía'
}as const;

export const GENRE_LIST = [
  { value: GenereMovies.ALL, label: 'Todos' },
  { value: GenereMovies.ACTION, label: 'Acción' },
  { value: GenereMovies.DRAMA, label: 'Drama' },
  { value: GenereMovies.COMEDY, label: 'Comedia' },
  { value: GenereMovies.HORROR, label: 'Terror' },
  { value: GenereMovies.ANIMATION, label: 'Animación' },
  { value: GenereMovies.ADVENTURE, label: 'Aventura' },
  { value: GenereMovies.FANTASY, label: 'Fantasía' },
];
export const RATINGS_LIST = ["G","PG","PG-13","R","NC-17",] as const;


export const BOOKING_LABEL_MAP = new Map<number, string>([
  [0, 'Volver a Horarios'],
  [1, 'Volver a Selección de Asientos'],
  [2, 'Volver'],
]);
export const MOVIE_INITIAL_VALUES: CreateMovieDto = {
  title: "",
  synopsis: "",
  duration: 0,
  genre: [],
  rating: "",
  posterUrl: "",
  trailerUrl: "",
  isActive: true,
  releaseDate: new Date(), 
  createdAt: new Date(),
};


export enum PAYMETMETHOD_ENUM {Cash ='cash' , Card ='card' ,Transfer= 'transfer'};

export const PAYMETMETHOD_MAP = new Map<PAYMETMETHOD_ENUM, string>([
  [PAYMETMETHOD_ENUM.Cash, '💵 Efectivo en taquilla'],
  [PAYMETMETHOD_ENUM.Card,'💳 Tarjeta de crédito / débito'],
  [PAYMETMETHOD_ENUM.Transfer,'📲 Transferencia bancaria']
])

export const STATE_BOOKING = {
  ALL: 'Todas',
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
} as const;
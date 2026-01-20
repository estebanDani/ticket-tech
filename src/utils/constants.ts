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
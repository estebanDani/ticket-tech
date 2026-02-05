import { Movie } from "@/types";
import { GenereMovies } from "./constants";

export function searchMovie(movies: Movie [], movieTitle: string, movieGenre?: string): Movie [] {
  return movies.filter(movie =>
  {
    const matchesTitle = movie.title
            .toLowerCase()
            .includes(movieTitle.toLowerCase())
    
    const matchesGenre = !movieGenre ||
    movieGenre === GenereMovies.ALL ||
    movie.genre?.includes(movieGenre)

    return movieGenre ? matchesTitle && matchesGenre: matchesTitle
  }
  );
}
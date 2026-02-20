"use client";

import { MovieService, ShowtimeService, theaterService } from "@/services";
import { useEffect, useState } from "react";
import { Movie, Theater } from "@/types";

interface EnrichedShowtime {
  id: string;
  movieId: string;
  theaterId: string;
  startTime: Date;
  endTime: Date;
  price: number;
  availableSeats: number;
  reservedSeats: string[];
  date: string;
  movieName: string;
  theaterName: string;
}

export const useShowtimesView = () => {
  const [data, setData] = useState<EnrichedShowtime[]>([]);
  const [moviesMap, setMoviesMap] = useState<Record<string, string>>({});
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const load = async () => {
    setLoading(true);
    const [showtimes, movies, theatersData] = await Promise.all([
      ShowtimeService.getAll(),
      MovieService.getAll(),
      theaterService.getAll(),
    ]);

    const movieMap = Object.fromEntries(movies.map((m) => [m.id, m.title]));
    const theaterMap = Object.fromEntries(theatersData.map((t) => [t.id, t.name]));

    const enriched = showtimes.map((s) => ({
      ...s,
      movieName: movieMap[s.movieId] || "—",
      theaterName: theaterMap[s.theaterId] || "—",
    }));

    setMoviesMap(movieMap);
    setMoviesList(movies);
    setTheaters(theatersData);
    setData(enriched);
    setLoading(false);

  };

  useEffect(() => {
    load();
  }, []);

  return { showtimes: data, moviesMap, moviesList, theaters, load , loading};
};
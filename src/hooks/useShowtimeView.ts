import { MovieService, ShowtimeService, theaterService } from "@/services";
import { useEffect, useState } from "react";

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

type MovieMap = Record<string, string>;

export const useShowtimesView = () => {
    const [data, setData] = useState<EnrichedShowtime[]>([]);
    const [movies, setMovie] = useState<MovieMap>({});

    const load = async () => {
        const [showtimes, movies, theaters] = await Promise.all([
        ShowtimeService.getAll(),
        MovieService.getAll(),
        theaterService.getAll(),
        ]);

        const movieMap = Object.fromEntries(
            movies.map((m) => [m.id, m.title])
        );

        const theaterMap = Object.fromEntries(
        theaters.map((t) => [t.id, t.name])
        );

        const enriched = showtimes.map((s) => ({
        ...s,
        movieName: movieMap[s.movieId] ? movieMap[s.movieId] : "—",
        theaterName: theaterMap[s.theaterId]? theaterMap[s.theaterId]: "—",
        }));
        setMovie(movieMap)
        setData(enriched);
    };

    useEffect(() => {
        load();
    }, []);

    return { showtimes: data, movies, load };
};

import { useEffect, useState } from "react";
import { ShowtimeService } from "@/services";
import { Showtime } from "@/types";

export function useShowtimes() {
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchShowtimes = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ShowtimeService.getAll();
            setShowtimes(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchShowtimes();
    }, []);

    return { showtimes, loading, error };
}
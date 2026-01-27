"use client";

import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { format, startOfDay } from "date-fns";

import { DateSelector } from "@/components/common/DateSelector";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ShowtimeCard } from "@/components/showtimes/ShowtimeCard";
import { useShowtimes } from "@/hooks/useShowtimes";
import { useMovie } from "@/hooks/useMovie";
import { useRouter } from "next/navigation";

type Props = { movieId: string };

export function ShowtimesPageClient({ movieId }: Props) {
  const { movie, loading: movieLoading, error: movieError } = useMovie(movieId);
  const {
    showtimes,
    loading: showtimesLoading,
    error: showtimesError,
  } = useShowtimes(movieId);

  const loading = movieLoading || showtimesLoading;
  const error = movieError || showtimesError;
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfDay(new Date()),
  );

  const selectedKey = useMemo(
    () => format(startOfDay(selectedDate), "yyyy-MM-dd"),
    [selectedDate],
  );

  const filtered = useMemo(
    () => showtimes.filter((s) => s.date === selectedKey),
    [showtimes, selectedKey],
  );
  const handleNavigate = (showtimeId: string) => {
    router.push(`/booking/${showtimeId}/seats`);
  };

  return (
    <Box px={3} py={4}>
      <Typography variant="h4" fontWeight={800} mb={2}>
        {movie?.title ?? "Horarios"}
      </Typography>

      <DateSelector value={selectedDate} onDateSelect={setSelectedDate} />

      <Box mt={3}>
        {loading && <LoadingSpinner />}

        {!loading && error && (
          <Typography color="error" fontWeight={600}>
            {error}
          </Typography>
        )}

        {!loading && !error && filtered.length === 0 && (
          <Typography color="text.secondary">
            No hay funciones disponibles para este día.
          </Typography>
        )}

        {!loading &&
          !error &&
          filtered.map((showtime) => (
            <Box key={showtime.id} mb={2}>
              <ShowtimeCard
                showtime={showtime}
                handleClick={() => handleNavigate(showtime.id)}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

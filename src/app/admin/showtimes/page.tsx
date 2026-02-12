"use client";

import { Container, Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useShowtimesView } from "@/hooks/useShowtimeView";
import PageHeader from "@/components/common/PageHeader";
import { ShowtimesFilters, ShowtimesTable } from "@/components";

interface ShowtimesFilters {
  movieId: string;
  date: string;
}
export default function ShowtimesPage() {
  const { showtimes ,movies} = useShowtimesView();
  const [filters, setFilters] = useState<ShowtimesFilters>({
    movieId: "",
    date: "",
  });

  const filteredShowtimes = useMemo(() => {
    return showtimes.filter((s) => {
      const matchMovie = filters.movieId
        ? s.movieId === filters.movieId
        : true;

      const matchDate = filters.date
        ? s.date === filters.date
        : true;

      return matchMovie && matchDate;
    });
  }, [showtimes, filters]);

  return (
    <Container maxWidth={false} sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <PageHeader
          title="Administración de funciones"
          description="Gestiona las funciones del cine"
          icon="🎬"
        />
        
        <Box display="flex" alignItems="center" gap={1}>
          <ShowtimesFilters
            moviesfilter ={movies}
            filters={filters}
            onChange={setFilters}
          />
          <Button variant="contained">
            Nueva Función
          </Button>
        </Box>
      </Box>
      <ShowtimesTable showtimes={filteredShowtimes} />
    </Container>
  );
}

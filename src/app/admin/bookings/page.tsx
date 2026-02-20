"use client"
import { useMemo, useState } from 'react'
import { Container, Box, CircularProgress } from '@mui/material'
import PageHeader from '@/components/common/PageHeader'
import { useMovies, useTheaters, useShowtimes, useClients, useBookingAdmin } from '@/hooks'
import { BookingsTable } from './components/bookingsTable'
import ActionPanel from './components/ActionPanel'

interface Filter {
  date: string;
  status: string;
  movie: string;
}

export default function BookingsPage() {
  const { bookings, loading} = useBookingAdmin();
  const { movies } = useMovies();
  const { theaters } = useTheaters();
  const { showtimes } = useShowtimes();
  const { clients } = useClients();

  const [filter, setFilter] = useState<Filter>({
    date: "",
    status: "",
    movie: "",
  })

  const DataTable =  bookings.map((booking) => {
    const showtime = showtimes?.find(s => s.id === booking.showtimeId);
    const movie = movies?.find(m => m.id === booking.movieId);
    const theater = theaters?.find(t => t.id === showtime?.theaterId);
    const user = clients?.find(c => c.uid === booking.userId);

    return {
      ...booking,
      movie: movie?.title || 'Sin título',
      user: user?.displayName || 'Usuario desconocido',
      theater: theater?.name || 'Sin sala',
      totalPrice: booking.totalPreice,
    }
  })

  const filterTable = useMemo(() => {

    return DataTable.filter((booking) => {
      const bookingDate = booking.bookingDate.toDate();
      const bookingDateString = bookingDate.toISOString().split('T')[0];

      const matchesDate = !filter.date || bookingDateString === filter.date;
      const matchesStatus = !filter.status || booking.status === filter.status;
      const matchesMovie = !filter.movie || booking.movie.toLowerCase().includes(filter.movie.toLowerCase());

      return matchesDate && matchesStatus && matchesMovie;
    });
  }, [DataTable, filter]);

  if(loading){
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6, minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PageHeader
          title="Reservas"
          description="Administra las reservas de los usuarios"
          icon="📖"
        />
      </Box>
      <ActionPanel
        filterDate={filter.date}
        filterStatus={filter.status}
        filterMovie={filter.movie}
        setFilterDate={(date) => setFilter(prev => ({ ...prev, date: date || "" }))}
        setFilterStatus={(status) => setFilter(prev => ({ ...prev, status: status || "" }))}
        setFilterMovie={(movie) => setFilter(prev => ({ ...prev, movie: movie || "" }))}
      />
      <BookingsTable bookings={filterTable} />
    </Container>
  )
}
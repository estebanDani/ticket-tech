'use client'
import { useMemo } from 'react'
import { Grid, Container, Card, CardHeader, CardContent, Box, CircularProgress } from '@mui/material'
import { Movie, Paid, TheaterComedy, ListAlt } from '@mui/icons-material';
import { DataCard } from './DataCard';
import { PieChart } from '@mui/x-charts';
import { theme } from '@/theme/theme';
import { useBookings, useShowtimes, useMovies } from '@/hooks';

export default function DashboardPage() {

  const { bookings, loading } = useBookings();
  const { movies } = useMovies();
  const { showtimes } = useShowtimes();

  const { today, todayString } = useMemo(() => {
    const now = new Date();
    return {
      today: now.toDateString(),
      todayString: now.toISOString().split('T')[0]
    };
  }, []);

  const bookingsIncome = useMemo(() =>
    bookings.reduce((acc, booking) => acc + booking.totalPreice, 0),
    [bookings]
  );

  const totalBookingsToday = useMemo(() =>
    bookings.filter(booking => booking.bookingDate.toDate().toDateString() === today).length,
    [bookings, today]
  );

  const totalShowtimesToday = useMemo(() =>
    showtimes.filter(showtime => showtime.date === todayString).length,
    [showtimes, todayString]
  );

  const values = useMemo(() => {
    return {
      movies: movies.length,
      showtimes: totalShowtimesToday,
      bookings: totalBookingsToday,
      income: `${bookingsIncome} Bs.`,
    }
  }, [movies, totalShowtimesToday, totalBookingsToday, bookingsIncome]);

  const dataStats = useMemo(() => [
    {
      title: 'Total de Películas',
      value: values.movies,
      icon: <Movie color='primary' fontSize="large" />,
      color: theme.palette.primary.light,
    },
    {
      title: 'Total de Funciones',
      value: values.showtimes,
      icon: <TheaterComedy color="secondary" fontSize="large" />,
      color: theme.palette.violet.light,
    },
    {
      title: 'Total de Reservas',
      value: values.bookings,
      icon: <ListAlt fontSize="large" color="warning" />,
      color: theme.palette.warning.light,
    },
    {
      title: 'Total de Ingresos',
      value: values.income,
      icon: <Paid color='success' fontSize="large" />,
      color: theme.palette.success.light,
    },
  ], [values]);

  const dataMovies = useMemo(() => {
    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      count: bookings.filter((booking) => booking.movieId === movie.id).length,
    }));
  }, [movies, bookings]);

  if(loading){
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6, minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth={false} sx={{ py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2} justifyContent={'space-between'}>
        {dataStats.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <DataCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          </Grid>
        ))}
      </Grid>
      <Card>
        <CardHeader
          title="Películas mas reservadas"
          subheader="Observa cuales fueron las películas mas reservadas"
        />
        <CardContent>
          <PieChart
            series={[{
              data: dataMovies.map((movie) => ({
                id: movie.id,
                value: movie.count,
                label: movie.title,
              })),
            }]}
            width={200}
            height={200}
          />
        </CardContent>
      </Card>
    </Container>
  )
}

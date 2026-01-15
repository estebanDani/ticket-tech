"use client"
import { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import MovieGrid from '@/components/movies/MovieGrid';
import { MovieService } from '@/services/movie.service';
import { Movie } from '@/types';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const movies = await MovieService.getAll()
        setMovies(movies)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <MovieGrid
          movies={movies}
          loading={loading}
        />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" gutterBottom>
            🎬 Cinema Tickets
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Sistema de Reserva de Tickets
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Proyecto configurado exitosamente ✅
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
"use client"
import { useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { MovieGrid } from '@/components';
import { useMovies } from '@/hooks/useMovies';

export default function Home() {
  const { movies, loading } = useMovies()
  const [searchValue, setSearchValue] = useState('')
  const filterMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <Header
        searchValue={searchValue}
        onChangeSearch={handleSearch}
      />
      {!filterMovies.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            No se encontraron películas
          </Typography>
          🚫🎬🎬🎬🚫
        </Box>
      ) : (
        <MovieGrid
          movies={filterMovies}
          loading={loading}
        />
      )}
      <Container maxWidth="lg">
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
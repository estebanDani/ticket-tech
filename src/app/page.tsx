"use client"
import { useState, useMemo } from 'react'
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { MovieGrid } from '@/components';
import { useMovies } from '@/hooks/useMovies';

export default function Home() {
  const { movies, loading } = useMovies()
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const filteredMovies = useMemo(() => {
    if (selectedGenre === 'all') return movies

    return movies.filter(movie =>
      movie.genre.includes(selectedGenre)
    )
  }, [movies, selectedGenre])

  return (
    <>
      <Header />
        <Typography variant='h3' sx={{paddingTop:'40px', paddingLeft:'30px'}}>🎥 Cartelera</Typography>
        <Typography sx={{paddingTop:'10px', paddingLeft:'30px'}}>Peliculas en Exhibicion</Typography>

        <FormControl sx={{ width: 120, ml: 4, mt: 3 }}>
        <InputLabel sx={{color: "text.primary"}}> Género</InputLabel>
        <Select
          value={selectedGenre}
          label="Género"
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="Acción">Acción</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Comedia">Comedia</MenuItem>
          <MenuItem value="Terror">Terror</MenuItem>
          <MenuItem value="Animación">Animación</MenuItem>
          <MenuItem value="Aventura">Aventura</MenuItem>
          <MenuItem value="Fantasía">Fantasía</MenuItem>

        </Select>
      </FormControl>
        <MovieGrid
          movies={filteredMovies}
          loading={loading}
        />

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
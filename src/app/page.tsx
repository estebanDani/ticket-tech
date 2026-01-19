'use client'

import { useState, useMemo } from 'react'
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { Header, Footer, MovieGrid } from '@/components'
import { useActiveMovies } from '@/hooks/useActiveMovies'
import { GenereMovies } from '@/utils'

export default function Home() {
  const { movies, loading, error } = useActiveMovies()

  const [selectedGenre, setSelectedGenre] = useState<string>(GenereMovies.ALL)

  const filteredMovies = useMemo(() => {
    if (selectedGenre === GenereMovies.ALL) return movies

    return movies.filter(movie =>
      movie.genre?.includes(selectedGenre)
    )
  }, [movies, selectedGenre])

  return (
    <>
      <Header />

      <Container maxWidth={false} disableGutters sx={{ py: 4 }}>
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            mb: 3,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          🎞️ Cartelera
        </Typography>

        <FormControl sx={{ width: 160, ml: 3, mb: 3 }}>
          <InputLabel>Género</InputLabel>
          <Select
            value={selectedGenre}
            label="Género"
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <MenuItem value= {GenereMovies.ALL}>Todos</MenuItem>
            <MenuItem value={GenereMovies.ACTION}>Acción</MenuItem>
            <MenuItem value={GenereMovies.DRAMA}>Drama</MenuItem>
            <MenuItem value={GenereMovies.COMEDY}>Comedia</MenuItem>
            <MenuItem value={GenereMovies.HORROR}>Terror</MenuItem>
            <MenuItem value={GenereMovies.ANIMATION}>Animación</MenuItem>
            <MenuItem value={GenereMovies.ADVENTURE}>Aventura</MenuItem>
            <MenuItem value={GenereMovies.FANTASY}>Fantasía</MenuItem>
          </Select>
        </FormControl>

        {error ? (
          <Box sx={{ py: 2, px: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              Ocurrió un error
            </Typography>
            <Typography variant="body2">{error}</Typography>
          </Box>
        ) : filteredMovies.length === 0 && !loading ? (
          <Box sx={{ px: 3 }}>
            <Typography variant="body2">
              No hay películas disponibles para este género
            </Typography>
          </Box>
        ) : (
          <MovieGrid movies={filteredMovies} loading={loading} />
        )}
      </Container>

      <Footer />
    </>
  )
}

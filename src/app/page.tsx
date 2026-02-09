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
import { GenereMovies, GENRE_LIST, searchMovie } from '@/utils'

export default function Home() {
  const { movies, loading, error } = useActiveMovies()

  const [searchValue, setSearchValue] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>(GenereMovies.ALL)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const filteredMovies = useMemo(() => {
    return searchMovie(movies, searchValue, selectedGenre)
  }, [movies, searchValue, selectedGenre])

  return (
    <>
      <Header
        searchValue={searchValue}
        onChangeSearch={handleSearch}
      />

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
            {GENRE_LIST.map((genre) => (
              <MenuItem key={genre.value} value={genre.value}>
                {genre.label}
              </MenuItem>
            ))}
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
              No hay películas disponibles con estos filtros
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

"use client"
import { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { Header, Footer, MovieGrid } from '@/components'
import { useActiveMovies } from '@/hooks/useActiveMovies'

export default function Home() {
  const { movies, loading, error } = useActiveMovies()
  const [searchValue, setSearchValue] = useState('')
  const filterMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

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

        {error ? (
          <Box sx={{ py: 2, px: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              Ocurrió un error
            </Typography>
            <Typography variant="body2">{error}</Typography>
          </Box>
        ) : filterMovies.length === 0 && !loading ? (
          <Box sx={{ px: 3 }}>
            <Typography variant="body2">No hay películas disponibles</Typography>
          </Box>
        ) : (
          <MovieGrid movies={filterMovies} loading={loading} />
        )}
      </Container>

      <Footer />
    </>
  )
}

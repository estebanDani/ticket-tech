'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

import { MovieDetail } from '@/components'
import { useMovie } from '@/hooks/useMovie'
import { useBooking } from '@/contexts/BookingContext'

interface MovieDetailClientProps {
  id: string
}

export function MovieDetailClient({ id }: MovieDetailClientProps) {
  const router = useRouter()
  const { movie, loading, error } = useMovie(id)
  const {setMovie} = useBooking()

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 2 }}>
          Volver a Cartelera
        </Button>

        <Typography variant="h6" fontWeight={700}>
          Ocurrió un error
        </Typography>
        <Typography variant="body2">{error}</Typography>
      </Container>
    )
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 2 }}>
          Volver a Cartelera
        </Button>

        <Typography variant="h6" fontWeight={700}>
          Película no encontrada
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 3 }}>
        Volver a Cartelera
      </Button>

      <MovieDetail
        movie={movie}
        footer={
          <Box sx={{ mt: 3 }}>
            <Button
              component={Link}
              href={`/showtimes/${movie.id}`}
              variant="contained"
              size="large"
              sx={{ width: { xs: '100%', md: 260 } }}
              onClick={()=>setMovie(movie)}
            >
              Ver Horarios y Reservar
            </Button>
          </Box>
        }
      />
    </Container>
  )
}

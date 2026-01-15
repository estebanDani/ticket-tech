'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import StarIcon from '@mui/icons-material/Star'
import EventIcon from '@mui/icons-material/Event'

import type { Movie } from '@/types'
import { MovieService } from '@/services/movie.service'

type Params = { id: string }

export default function MovieDetailPage() {
  const router = useRouter()
  const params = useParams<Params>()
  const id = params?.id

  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const data = await MovieService.getById(id)
        setMovie(data)
      } catch (err: unknown) {
        setMovie(null)
        setError(err instanceof Error ? err.message : 'Error al cargar la película')
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 6 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
          Volver a Cartelera
        </Button>

        <Typography variant="h6" fontWeight={700}>
          Ocurrió un error
        </Typography>
        <Typography variant="body2">{error}</Typography>
      </Box>
    )
  }

  if (!movie) {
    return (
      <Box sx={{ py: 6 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 2 }}>
          Volver a Cartelera
        </Button>

        <Typography variant="h6" fontWeight={700}>
          Película no encontrada
        </Typography>
      </Box>
    )
  }

  const isPlaceholder = movie.posterUrl.includes('via.placeholder.com')

  return (
    <Box sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 3 }}>
        Volver a Cartelera
      </Button>

      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: '100%', md: 320 },
                height: { xs: 420, md: 420 },
                borderRadius: 2,
                overflow: 'hidden',
                flexShrink: 0,
                bgcolor: 'grey.200',
              }}
            >
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 320px"
                priority={!isPlaceholder}
                unoptimized={isPlaceholder}
              />
            </Box>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <Typography variant="h4" fontWeight={800}>
                {movie.title}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                <LocalOfferIcon fontSize="small" sx={{ opacity: 0.7 }} />
                {movie.genre.map((g) => (
                  <Chip key={g} label={g} size="small" variant="outlined" />
                ))}
              </Stack>

              <Stack direction="row" spacing={3} flexWrap="wrap" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon fontSize="small" sx={{ opacity: 0.7 }} />
                  <Typography variant="body2">{movie.duration}min</Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <StarIcon fontSize="small" sx={{ opacity: 0.7 }} />
                  <Typography variant="body2">{movie.rating}</Typography>
                </Stack>
              </Stack>

              {movie.releaseDate ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <EventIcon fontSize="small" sx={{ opacity: 0.7 }} />
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>
                    Estreno: {movie.releaseDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              ) : null}

              <Divider />

              <Box
                sx={{
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                  Sinopsis
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                  {movie.synopsis}
                </Typography>
              </Box>

              <Button variant="contained" sx={{ px: 3, py: 1.2 }}>
                Ver Horarios y Reservar
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

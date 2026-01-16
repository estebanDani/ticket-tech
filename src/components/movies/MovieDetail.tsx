'use client'

import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { format } from 'date-fns'
import type { Movie } from '@/types'

interface MovieDetailProps {
  movie: Movie
}

function safeFormatDate(value: unknown): string {
  try {
    if (!value) return '—'
    const date = value instanceof Date ? value : new Date(value as any)
    if (Number.isNaN(date.getTime())) return '—'
    return format(date, 'dd/MM/yyyy')
  } catch {
    return '—'
  }
}

function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const releaseDate = safeFormatDate(movie.releaseDate)
  const duration = formatDuration(movie.duration)

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Poster */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardMedia
              component="img"
              height="520"
              image={movie.posterUrl || '/images/placeholder-poster.png'}
              alt={movie.title}
              sx={{
                objectFit: 'cover',
                height: { xs: 420, md: 520 }, // ✅ responsive
              }}
            />
          </Card>
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                {movie.title}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label={`⏱️ ${duration}`} size="small" />
                <Chip label={`🔞 ${movie.rating || '—'}`} size="small" />
                <Chip label={`📅 ${releaseDate}`} size="small" />
              </Stack>
            </Box>

            <Divider />

            {/* ✅ Limitar ancho para mejor lectura */}
            <Box sx={{ maxWidth: 700 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Sinopsis
              </Typography>

              {/* ✅ Más contraste (sin verse “pesado”) */}
              <Typography
                sx={{
                  color: 'text.primary',
                  opacity: 0.85,
                  whiteSpace: 'pre-line',
                }}
              >
                {movie.synopsis || 'Sin sinopsis disponible.'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Géneros
              </Typography>

              {movie.genre?.length ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {movie.genre.map((g) => (
                    <Chip key={g} label={g} variant="outlined" />
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary">—</Typography>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

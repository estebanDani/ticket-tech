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
import { formatDuration } from '@/utils/formatDuration'

interface MovieDetailProps {
  movie: Movie
}

function safeFormatDate(value: Date | null | undefined): string {
  if (!value) return '—'
  if (Number.isNaN(value.getTime())) return '—'
  return format(value, 'dd/MM/yyyy')
}

export function MovieDetail({ movie }: MovieDetailProps) {
  const releaseDate = safeFormatDate(movie.releaseDate)
  const duration = formatDuration(movie.duration)

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
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
              image={movie.posterUrl || '/images/placeholder-poster.png'}
              alt={movie.title}
              sx={{ objectFit: 'cover', height: { xs: 420, md: 520 } }}
            />
          </Card>
        </Grid>

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

            <Box sx={{ maxWidth: 700 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Sinopsis
              </Typography>

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

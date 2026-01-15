import { Card, CardActions, CardMedia, CardContent, Typography, Stack, Chip, Button } from '@mui/material';
import AccessAlarm from '@mui/icons-material/AccessAlarm';
import StarIcon from '@mui/icons-material/Star';

import { Movie } from '@/types';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Card
            sx={{
                maxWidth: 320,
                height: '100%',
                borderRadius: 2
            }}
        >

            <CardMedia
                sx={{
                    height: 370
                }}
                component="img"
                image={movie.posterUrl}
                title={movie.title}
            />

            <CardContent sx={{ pb: 0 }}>
                <Typography variant="h3" fontWeight={600} gutterBottom>
                    {movie.title}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <AccessAlarm fontSize="small" />
                        <Typography variant="body2">
                            {movie.duration} min
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <StarIcon fontSize="small" color="warning" />
                        <Typography variant="body2">
                            {movie.rating}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" mb={1} mt={1}>
                    {movie.genre.map((genre) => (
                        <Chip
                            key={genre}
                            label={genre}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    ))}
                </Stack>
            </CardContent>

            {/* Actions */}
            <CardActions sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 1 }}
                >
                    Ver más
                </Button>
            </CardActions>
        </Card>
    );
};
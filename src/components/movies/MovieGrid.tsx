import React from 'react'
import { Grid, Skeleton } from '@mui/material'
import { Movie } from '@/types'
import { MovieCard } from './MovieCard'

interface Props {
    movies: Movie[]
    loading: boolean
}

const MovieGrid = ({ movies, loading }: Props) => {
    return (
        <Grid container
            spacing={2}
            justifyContent="start"
            padding={3}
            sx={{ width: '100%', marginInline: 0 }}
        >
            {movies.map(movie => (
                <Grid
                    key={movie.id}
                    size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <MovieCard movie={movie} />
                </Grid>
            ))}
        </Grid>
    )
}

export default MovieGrid
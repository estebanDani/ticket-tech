import React from 'react'
import { Movie } from '@/types'
import { MovieCard } from '../MovieCard'
import { Grid } from '@mui/material'

interface Props {
    movies: Movie[]
}
const MovieCards = ({ movies }: Props) => {
    return (
        movies.map(movie => (
            <Grid key={movie.id}
                size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
                sx={{ display: 'flex', justifyContent: 'center' }}>
                <MovieCard movie={movie} />
            </Grid>
        ))
    )
}

export default MovieCards
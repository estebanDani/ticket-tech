import React from 'react'
import { Grid } from '@mui/material'
import { Movie } from '@/types'
import MovieCard from './MovieCard'

interface Props {
    movies: Movie[]
}

const MovieGrid = ({ movies }: Props) => {
    return (
        <Grid container spacing={2}>
            {movies.map(movie => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                </Grid>
            ))}
        </Grid>
    )
}

export default MovieGrid
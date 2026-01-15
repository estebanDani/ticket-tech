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
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="start" alignItems="center" paddingBlock={2} >
            {loading ? (
                <Grid container spacing={2}>
                    {[...Array(12)].map((_, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                            <Skeleton variant="rectangular" height={400} width={300} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                movies.map(movie => (
                    <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} >
                        <MovieCard movie={movie} />
                    </Grid>
                ))
            )}
        </Grid>
    )
}

export default MovieGrid
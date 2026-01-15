import React from 'react'
import { Grid, Skeleton } from '@mui/material'
import { Movie } from '@/types'
import { MovieCard } from './MovieCard'

interface Props {
    movies: Movie[]
    loading: boolean
}
interface ContentProps {
    children: React.ReactNode
    key: any

}
const GridContent = ({ children, key }: ContentProps) => {
    return (
        <Grid
            key={key}
            size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            {children}
        </Grid>
    )
}

const SkeletonCard = () => {
    return (
        Array.from({ length: 8 }).map((_, index) => (
            <GridContent key={index}>
                <Skeleton
                    variant='rectangular'
                    animation='wave'
                    sx={{ width: 320, height: 480 }}
                />
            </GridContent>
        ))
    )
}

const MovieCards = ({ movies }: { movies: Movie[] }) => {
    return (
        movies.map(movie => (
            <GridContent key={movie.id}>
                <MovieCard movie={movie} />
            </GridContent>
        ))
    )
}

const MovieGrid = ({ movies, loading }: Props) => {
    return (
        <Grid container
            spacing={2}
            justifyContent="start"
            padding={3}
            sx={{ width: '100%', marginInline: 0 }}
        >
            {loading ? SkeletonCard() : <MovieCards movies={movies} />}
        </Grid>
    )
}

export default MovieGrid

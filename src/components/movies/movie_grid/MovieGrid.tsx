import { Grid } from '@mui/material'
import { Movie } from '@/types'
import SkeletonCards from './SkeletonCards'
import MovieCards from './MovieCards'

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
            {loading ? <SkeletonCards /> : <MovieCards movies={movies} />}
        </Grid>
    )
}

export default MovieGrid

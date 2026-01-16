import { Grid } from '@mui/material'
import { Skeleton } from '@mui/material'

const SkeletonCards = () => {
    return (
        <Grid container spacing={2}>
            {Array.from({ length: 8 }).map((_, index) => (
                <Grid key={`gid-card-${index}`} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                    <Skeleton variant="rectangular" animation="wave" sx={{ width: 320, height: 480 }} />
                </Grid>
            ))}
        </Grid>
    )
}
export default SkeletonCards
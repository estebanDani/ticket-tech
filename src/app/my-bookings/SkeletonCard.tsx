
import { Box, Card, Skeleton } from '@mui/material';
import { theme } from '@/theme/theme'

export const SkeletonBookingCard = () => {

    return (
        <>
            <Card sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.grey[100]}` }}>
                <Box sx={styles.container}>
                    <Skeleton
                        variant="rectangular"
                        width={120}
                        height={180}
                        sx={{
                            borderRadius: 2,
                        }}
                    />
                    <Box sx={styles.info}>
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="text" width={200} height={20} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Skeleton variant="text" width={200} height={20} />
                            <Skeleton variant="text" width={200} height={20} />
                        </Box>
                        <Skeleton variant="text" width={100} height={20} />
                        <Box sx={styles.buttons}>
                            <Skeleton variant="rectangular" width={100} height={40} />
                            <Skeleton variant="rectangular" width={100} height={40} />
                            <Skeleton variant="rectangular" width={100} height={40} />
                        </Box>
                    </Box>
                </Box>
            </Card>
        </>
    )
}
const styles = {
    container: {
        display: 'flex',
        justifyContent: "start",
        alignContent: "center",
        gap: 2
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignContent: "center",
        gap: 1
    },
    buttons: {
        display: 'flex',
        justifyContent: "center",
        alignContent: "center",
        gap: 1
    },
}

export default SkeletonBookingCard
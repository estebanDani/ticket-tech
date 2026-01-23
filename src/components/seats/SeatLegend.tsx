import { Container, Box, Typography, Chip } from '@mui/material'
import { theme } from '@/theme/theme'

const SeatLegend = () => {

    const LegendItems = [
        {
            color: theme.palette.grey[400],
            label: 'Disponible',
        },
        {
            color: theme.palette.error.main,
            label: 'Reservado',
        },
        {
            color: theme.palette.success.main,
            label: 'Tu selección',
        },
    ]
    return (
        <Container sx={{ ...styles.container }}>
            {LegendItems.map((item, index) => (
                <Box sx={styles.subContainer} key={`legend-item-${index}`}>
                    <Chip sx={{ ...styles.seat, backgroundColor: item.color }} />
                    <Typography variant='h6'>{item.label}</Typography>
                </Box>
            ))}
        </Container>
    )
}

export default SeatLegend

const styles = {
    container: {
        paddingBlock: '12px',
        borderRadius: '8px',
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
    },
    subContainer: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
    },
    seat: {
        width: '35px',
        height: '35px',
        borderRadius: '10%',
    },
}
import { Container, Box, Typography, Chip } from '@mui/material'
import { theme } from '@/theme/theme'

const SeatLegend = ({ type }: { type: 'screen' | 'info' }) => {

    const LegendItems = [
        {
            color: theme.palette.grey[500],
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
    const backgroundColor = type == "info" ? theme.palette.background.default : theme.palette.grey[500];
    return (
        <Container sx={{ ...styles.container, backgroundColor }}>
            {type == "info" ? (
                LegendItems.map((item, index) => (
                    <Box sx={styles.subContainer} key={`legend-item-${index}`}>
                        <Chip sx={{ ...styles.seat, backgroundColor: item.color }} />
                        <Typography variant='h6'>{item.label}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant='h6' sx={styles.screenContainer}>🎥 PANTALLA</Typography>
            )}
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
    screenContainer: {
        textAlign: 'center',
        color: theme.palette.grey[200],
    }
}
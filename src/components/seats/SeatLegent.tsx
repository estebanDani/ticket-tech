import React from 'react'
import { Container, Box, Typography, Chip } from '@mui/material'
import { theme } from '@/theme/theme'

const SeatLegent = () => {
    return (
        <Container sx={styles.container}>
            <Box sx={styles.subContainer}>
                <Chip sx={{ ...styles.seat, backgroundColor: '#444444' }} />
                <Typography variant='h6'>Disponible</Typography>
            </Box>
            <Box sx={styles.subContainer}>
                <Chip sx={{ ...styles.seat }} color='error' />
                <Typography variant='h6'>Reservado</Typography>
            </Box>
            <Box sx={styles.subContainer}>
                <Chip sx={{ ...styles.seat }} color='success' />
                <Typography variant='h6'>Tu selección</Typography>
            </Box>
        </Container>
    )
}

export default SeatLegent

const styles = {
    container: {
        paddingBlock: '12px',
        backgroundColor: theme.palette.background.default,
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
        width: '45px',
        height: '45px',
    }
}
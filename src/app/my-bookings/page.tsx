'use client'
import { useBookings } from '@/hooks'
import { Container, Typography, Button, Box, Select, MenuItem, FormControl } from '@mui/material'
import { BookingList } from './BookingList'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function MyBookingsPage() {
    const { bookings, loading } = useBookings()
    const router = useRouter()
    return (
        <Container maxWidth={false} disableGutters sx={{ p: 4 }}>
            <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 2 }}>
                Volver al inicio
            </Button>
            <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
                🎫 MIS RESERVAS
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, my: 8 }}>
                <Select
                    value="Todas"
                    onChange={(e) => console.log(e.target.value)}
                    sx={{ width: 120 }}
                >
                    <MenuItem value="Todas">Todas</MenuItem>
                    <MenuItem value="Pendientes">Pendientes</MenuItem>
                    <MenuItem value="Confirmadas">Confirmadas</MenuItem>
                    <MenuItem value="Canceladas">Canceladas</MenuItem>
                </Select>
                <Select
                    value="Este Mes"
                    onChange={(e) => console.log(e.target.value)}
                    sx={{ width: 150 }}
                >
                    <MenuItem value="Este Mes">Este Mes</MenuItem>
                    <MenuItem value="Mes Pasado">Mes Pasado</MenuItem>
                    <MenuItem value="Año Pasado">Año Pasado</MenuItem>
                </Select>
            </Box>
            <BookingList bookings={bookings} loading={loading} />
        </Container>
    )
}


'use client'
import { useState } from 'react'
import { Container, Typography, Button, Box, Select, MenuItem } from '@mui/material'
import { BookingList } from './BookingList'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function MyBookingsPage() {
    const router = useRouter()
    
    const [statusFilter, setStatusFilter] = useState('Todas')
    const [dateFilter, setDateFilter] = useState('Todos')

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
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ width: 150, height: 40 }}
                    size="small"
                >
                    <MenuItem value="Todas">Todas</MenuItem>
                    <MenuItem value="confirmed">Confirmadas</MenuItem>
                    <MenuItem value="pending">Pendientes</MenuItem>
                    <MenuItem value="cancelled">Canceladas</MenuItem>
                </Select>
                <Select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    sx={{ width: 150, height: 40 }}
                    size="small"
                >
                    <MenuItem value="Todos">Todas las fechas</MenuItem>
                    <MenuItem value="future">Próximas</MenuItem>
                    <MenuItem value="past">Pasadas</MenuItem>
                </Select>
            </Box>

            <BookingList statusFilter={statusFilter} dateFilter={dateFilter} />
        </Container>
    )
}
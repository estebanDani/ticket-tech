"use client";

import React, { useEffect, useMemo } from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    Stack,
    CircularProgress,
    Alert,
    Divider
} from "@mui/material";
import { useBooking } from "@/contexts/BookingContext";
import { useTheater } from "@/hooks/useTheater";
import { SeatGrid } from "@/components/seats/SeatGrid";
import { ArrowBackIos } from "@mui/icons-material";
import SeatLegend from "@/components/seats/SeatLegend";
import { useRouter } from "next/navigation";

export default function SeatsPage() {
    const router = useRouter();
    const { selectedMovie, selectedShowtime, selectedSeats } = useBooking();

    const { theater, loading, error } = useTheater(selectedShowtime?.theaterId);

    useEffect(() => {
        if (!selectedShowtime) {
            router.push("/");
        }
    }, [selectedShowtime, router]);

    const totalPrice = useMemo(() => {
        return selectedSeats.length * (selectedShowtime?.price || 0);
    }, [selectedSeats, selectedShowtime]);


    if (loading) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="60vh" gap={2}>
                <CircularProgress />
                <Typography>Cargando mapa de sala...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error" action={
                    <Button color="inherit" size="small" onClick={() => router.back()}>Volver</Button>
                }>
                    {error}
                </Alert>
            </Container>
        );
    }

    const seatListNames = selectedSeats.length > 0
        ? selectedSeats.join(", ")
        : "Ninguno";

    return (

        <Container maxWidth={false} sx={{ py: 2, px: { xs: 2, md: 4 } }}>
            <Button
                startIcon={<ArrowBackIos sx={{ fontSize: 14 }} />}
                onClick={() => router.back()}
                sx={{ textTransform: 'none', mb: 2 }}
            >
                Volver a Horarios
            </Button>

            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm: 2 }} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                        <Typography variant="body1" fontWeight="bold">
                            🎬 {selectedMovie?.title}
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{ display: { xs: 'none', sm: 'block' } }}>|</Typography>
                        <Typography variant="body2" color="text.primary">
                            📅 {selectedShowtime?.date}
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{ display: { xs: 'none', sm: 'block' } }}>|</Typography>
                        <Typography variant="body2" color="text.primary">
                            🕒 {selectedShowtime ? new Date(selectedShowtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                        </Typography>
                    </Stack>

                    <Typography variant="body1" fontWeight="bold">
                        💰 {selectedShowtime?.price} Bs/asiento
                    </Typography>
                </Box>
            </Paper>

            <SeatLegend />

            <Box>
                <SeatGrid
                    seatMap={theater?.seatMap || []}
                    reservedSeats={selectedShowtime?.reservedSeats || []}
                />
            </Box>

            <Paper sx={{ p: 7, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📋 RESUMEN DE SELECCIÓN
                </Typography>

                <Box sx={{ my: 2 }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="text.primary">🪑 Asientos seleccionados:</Typography>
                        <Typography align="right">{seatListNames}</Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography color="text.primary">💰 Precio total:</Typography>
                        <Typography variant="h5" color="primary" fontWeight="bold">
                            {totalPrice} Bs
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={selectedSeats.length === 0}
                    sx={{ py: 1.5, fontSize: '1.1rem' }}
                >
                    Continuar al Pago
                </Button>
            </Paper>

        </Container>
    );
}

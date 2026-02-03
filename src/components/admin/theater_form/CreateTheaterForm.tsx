// components/theater/CreateTheaterForm.tsx
'use client';

import { useState } from 'react';
import { Container, Typography, Button, Box, Alert, CircularProgress } from '@mui/material';
import { useNewTheater } from '@/hooks/useNewTheater';
import { TheaterFormFields } from './TheaterFormFields';

const CreateTheaterForm = () => {
    const {
        formData,
        errors,
        loading,
        previewCapacity,
        isValid,
        handleChange,
        toggleAmenity,
        createTheater
    } = useNewTheater();

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await createTheater();

        if (result.success) {
            setSuccessMessage('¡Sala creada exitosamente!');
            setErrorMessage('');
        } else {
            setErrorMessage(result.error || 'Error al crear la sala');
            setSuccessMessage('');
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant='h4' sx={{ mb: 3 }}>
                Crear nueva sala
            </Typography>

            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TheaterFormFields
                    formData={formData}
                    errors={errors}
                    previewCapacity={previewCapacity}
                    handleChange={handleChange}
                    toggleAmenity={toggleAmenity}
                />

                <Button variant="contained" type="submit" disabled={!isValid || loading} fullWidth sx={{ mt: 2 }}>
                    {loading ? (
                        <>
                            <CircularProgress size={24} sx={{ mr: 1 }} />
                            Creando...
                        </>
                    ) : (
                        'Crear Sala'
                    )}
                </Button>
            </Box>
        </Container>
    );
};

export default CreateTheaterForm;
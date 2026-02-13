'use client';

import { useEffect, useMemo, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { TheaterFormFields } from './TheaterFormFields';
import { CreateTheaterDto } from '@/types';
import { SubmitHandler } from 'react-hook-form';

interface MovieFormProps {
  initialData?: CreateTheaterDto | null,
  onSubmit: SubmitHandler<CreateTheaterDto>,
  isLoading?: boolean
}

const CreateTheaterForm = ({
    initialData,
    onSubmit,
    isLoading =false
}:MovieFormProps) => {


    const [formData, setFormData] = useState({
        name: '',
        rows: 0,
        seatsPerRow: 0,
        amenities: [] as string[],
    })
    const [errors, setErrors] = useState({
        name: '',
        rows: '',
        seatsPerRow: '',
    })

    const validation = useMemo(() => {
        const newErrors = {
            name: '',
            rows: '',
            seatsPerRow: '',
        };

        if (formData.name.trim() === '') {
            newErrors.name = 'El nombre es requerido';
        }

        if (formData.rows <= 0) {
            newErrors.rows = 'Debe haber al menos 1 fila';
        }

        if (formData.seatsPerRow <= 0) {
            newErrors.seatsPerRow = 'Debe haber al menos 1 asiento por fila';
        }
        setErrors(newErrors)
        const isValid = !newErrors.name && !newErrors.rows && !newErrors.seatsPerRow;

        return { isValid, errors: newErrors };

    }, [formData.name, formData.rows, formData.seatsPerRow])

    const handleChange = (field: keyof typeof formData, value: string | number) => {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        };
    
        const toggleAmenity = (amenity: string) => {
            setFormData(prev => ({
                ...prev,
                amenities: prev.amenities.includes(amenity)
                    ? prev.amenities.filter(a => a !== amenity)
                    : [...prev.amenities, amenity]
            }));
        };
    
        const previewCapacity = useMemo(() => {
            return formData.rows * formData.seatsPerRow;
        }, [formData.rows, formData.seatsPerRow]);
    
    useEffect(() => {
        if (initialData) {
          setFormData(initialData)
        }else{
            setErrors({
            name: '',
            rows: '',
            seatsPerRow: '',
        })
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };


    const isEditMode = !!initialData;


    return (
        <Container maxWidth="md" sx={{mt:2,mb:2 }} >
            <Typography variant='h4' sx={{ mb: 3 }}>
                {isEditMode ? "✏️ Editar Sala" : "🎬 Nueva Sala"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TheaterFormFields
                    formData={formData}
                    errors={errors}
                    previewCapacity={previewCapacity}
                    handleChange={handleChange}
                    toggleAmenity={toggleAmenity}
                />

                <Button variant="contained" type="submit" disabled={!validation.isValid ||  isLoading} fullWidth sx={{ mt: 2 }}>
                    {/* {isLoading ? (
                        <>
                            <CircularProgress size={24} sx={{ mr: 1 }} />
                            Creando...
                        </>
                    ) : (
                        'Crear Sala'
                    )} */}
                    {isLoading ? "Guardando..." : isEditMode ? "Actualizar Sala" : "Crear Sala"}
                </Button>
            </Box>
        </Container>
    );
};

export default CreateTheaterForm;
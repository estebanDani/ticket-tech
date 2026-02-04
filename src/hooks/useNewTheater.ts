import { useState, useMemo } from 'react'
import { theaterService } from '@/services'

export const useNewTheater = () => {
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
    const [loading, setLoading] = useState(false)

    const validation = useMemo(() => {
        const newErrors = {
            name: '',
            rows: '',
            seatsPerRow: ''
        }
        if (formData.name.trim() === '') {
            newErrors.name = 'El nombre es requerido';
        }

        if (formData.rows <= 0) {
            newErrors.rows = 'Debe haber al menos 1 fila';
        }

        if (formData.seatsPerRow <= 0) {
            newErrors.seatsPerRow = 'Debe haber al menos 1 asiento por fila';
        }

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

    const createTheater = async () => {

        if (!validation.isValid) {
            setErrors(validation.errors);
            return { success: false, error: 'Por favor completa todos los campos correctamente' };
        }
        setLoading(true)

        try {
            const newTheater = await theaterService.create(formData);

            setFormData({
                name: '',
                rows: 0,
                seatsPerRow: 0,
                amenities: [],
            });

            setErrors({ name: '', rows: '', seatsPerRow: '' });

            return { success: true, data: newTheater };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error al crear el teatro'
            };
        } finally {
            setLoading(false);
        }
    }


    return {
        formData,
        errors,
        loading,
        previewCapacity,
        isValid: validation.isValid,
        handleChange,
        toggleAmenity,
        createTheater,
    }
}

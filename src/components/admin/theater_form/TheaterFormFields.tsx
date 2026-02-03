// components/theater/TheaterFormFields.tsx
'use client';

import {
    TextField,
    Box,
    FormLabel,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Typography
} from '@mui/material';
import { theme } from '@/theme/theme';

interface FormData {
    name: string;
    rows: number;
    seatsPerRow: number;
    amenities: string[];
}

interface TheaterFormFieldsProps {
    formData: FormData;
    errors: {
        name: string;
        rows: string;
        seatsPerRow: string;
    };
    previewCapacity: number;
    handleChange: (field: keyof FormData, value: string | number) => void;
    toggleAmenity: (amenity: string) => void;
}

export const TheaterFormFields = ({
    formData,
    errors,
    previewCapacity,
    handleChange,
    toggleAmenity
}: TheaterFormFieldsProps) => {
    return (
        <>
            <TextField
                label="Nombre de sala"
                variant="outlined"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
                fullWidth
                sx={styles.label}
            />

            <TextField
                label="Número de filas"
                variant="outlined"
                type="number"
                value={formData.rows || ''}
                onChange={(e) => handleChange('rows', parseInt(e.target.value) || 0)}
                error={!!errors.rows}
                helperText={errors.rows}
                required
                fullWidth
                slotProps={{ htmlInput: { min: 1 } }}
                sx={styles.label}
            />

            <TextField
                label="Asientos por fila"
                variant="outlined"
                type="number"
                value={formData.seatsPerRow || ''}
                onChange={(e) => handleChange('seatsPerRow', parseInt(e.target.value) || 0)}
                error={!!errors.seatsPerRow}
                helperText={errors.seatsPerRow}
                required
                fullWidth
                slotProps={{ htmlInput: { min: 1 } }}
                sx={styles.label}
            />

            {previewCapacity > 0 && (
                <Typography variant="body2" color="black">
                    Capacidad estimada: {previewCapacity} asientos
                </Typography>
            )}

            <Box>
                <FormLabel sx={{ color: 'black' }}>Amenidades</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        label="3D"
                        control={
                            <Checkbox
                                checked={formData.amenities.includes('3D')}
                                onChange={() => toggleAmenity('3D')}
                                sx={styles.checkbox}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Dolby Atmos"
                        control={
                            <Checkbox
                                checked={formData.amenities.includes('Dolby Atmos')}
                                onChange={() => toggleAmenity('Dolby Atmos')}
                                sx={styles.checkbox}
                            />
                        }
                    />
                    <FormControlLabel
                        label="IMAX"
                        control={
                            <Checkbox
                                checked={formData.amenities.includes('IMAX')}
                                onChange={() => toggleAmenity('IMAX')}
                                sx={styles.checkbox}
                            />
                        }
                    />
                </FormGroup>
            </Box>
        </>
    );
};

const styles = {
    checkbox: {
        color: theme.palette.primary.main
    },
    label: {
        '& .MuiInputLabel-root': {
            color: theme.palette.grey[600],
        },
    }
};
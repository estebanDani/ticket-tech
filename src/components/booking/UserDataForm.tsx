'use client';  

import {Paper, Typography, TextField, Checkbox, FormControlLabel, FormHelperText, Box} from '@mui/material';
import { Person } from '@mui/icons-material';
import { Controller,Control } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
  confirm: boolean;
}

interface Props {
  control: Control<FormData>;
}

export default function UserDataForm({control}: Props) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        <Person color='primary' sx={{ fontSize: 30 }}></Person>DATOS DEL COMPRADOR
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Typography >Nombre completo</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
              margin="none"
            />
        
        )}/>
        <Typography  >Email</Typography>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="none"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
        )}
        />
        <Typography>Teléfono</Typography>
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="none"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
        )}
        />

      <Controller
        name="terms"
      control={control}
      render={({ field, fieldState }) => (
        <>
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Acepto los términos y condiciones"
          />
          {fieldState.error && (
            <FormHelperText error>
              {fieldState.error.message}
            </FormHelperText>
          )}
        </>
      )}
      />

      <Controller
        name="confirm"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Deseo recibir promociones por email"
            />
            {fieldState.error && (
              <FormHelperText error>
                {fieldState.error.message}
              </FormHelperText>
            )}
          </>
      )}
      />
      </Box>
    </Paper>
  );
}

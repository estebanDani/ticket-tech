'use client';  

import {Paper, Typography, Checkbox, FormControlLabel, FormHelperText, Stack, Divider} from '@mui/material';
import { Person } from '@mui/icons-material';
import { Controller,Control } from 'react-hook-form';
import { User } from '@/types';

interface FormData {
  terms: boolean;
  confirm: boolean;
}

interface Props {
  control: Control<FormData>;
  userData: User | null;
}

export default function UserDataForm({control,userData}: Props) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          <Person color='primary' sx={{ fontSize: 30 }}></Person>DATOS DEL COMPRADOR
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='space-between' ml={4} mr={4}>
          <Typography  >Nombre Completo:</Typography>
          <Typography ><strong>{userData?.displayName}</strong></Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />

      <Stack direction='row' justifyContent='space-between' ml={4} mr={4}>
        <Typography >Email:</Typography>
        <Typography ><strong>{userData?.email}</strong></Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      
      <Stack ml={4}>
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
      </Stack>
    </Paper>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, CircularProgress, TextField, Typography} from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerSchema } from '@/schemas';
import { useAuth } from '@/contexts';
import { showError } from '@/utils';
import { CreateUserDto } from '@/types';
import { useRouter } from 'next/navigation';

type RegisterFormData = {
  user: CreateUserDto;
  password: string;
  passwordConfirm?: string;
};

const DEFAULT_VALUES: RegisterFormData = {
  user:{
    displayName:'',
    email:'',
    role:'user',
    createdAt: new Date()
  },
  password:'',
  passwordConfirm:''
  
};

const FORM_OPTIONS = {
  mode: 'onBlur' as const,
  defaultValues: DEFAULT_VALUES,
};

export default function RegisterPage() {
  const router = useRouter();
  const { register} = useAuth(); 
  const [loadingPage, setLoading] = useState(false);

  const { control , handleSubmit} = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    ...FORM_OPTIONS,
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      await register(data.user, data.password);
      router.push(`/auth/login`);
    } catch  {
      showError('Failed to Register. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width={400}>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h5" mb={2} textAlign="center">
            Datos Personales
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography >Nombre completo</Typography>
            <Controller
              name="user.displayName"
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
              name="user.email"
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
            <Typography>Contraseña</Typography>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type='password'
                  fullWidth
                  margin="none"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
            )}
            />

            <Typography>Contraseña</Typography>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type='password'
                  fullWidth
                  margin="none"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
            )}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loadingPage}
            sx={{ mt: 2 }}
          >
            {loadingPage ? <CircularProgress size={24} /> : 'Registrate'}
          </Button>
        </form>

        <Typography mt={2} textAlign="center">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
}
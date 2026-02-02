'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, CircularProgress, TextField, Typography} from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/schemas';
import { useAuth } from '@/contexts'
import { showError } from '@/utils';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login} = useAuth(); 
  const [loadingPage, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      router.push(`/`);
    } catch {
      showError('Failed to Login. Please check your credentials and try again.');
    }finally{
      
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
      <Box width={350}>
        <Typography variant="h5" mb={2} textAlign="center">
          Iniciar sesión
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password */}
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loadingPage}
            sx={{ mt: 2 }}
          >
            {loadingPage ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>

        {/* Link a Register */}
        <Typography mt={2} textAlign="center">
          ¿No tienes cuenta?{' '}
          <Link href="/auth/register">Regístrate</Link>
        </Typography>
      </Box>
    </Box>
  );
}
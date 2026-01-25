'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import PaymentMethodForm from './PaymentMethodForm';
import UserDataForm from './UserDataForm';
import BookingSummary from '@/components/booking/BookingSummary';
import BookingStepper from '@/components/booking/BookingStepper';

type PaymentMethod = 'cash' | 'card' | 'transfer';

interface UserForm {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
  confirm: boolean;
}

export default function BookingCheckoutPage() {
  const { showtimeId } = useParams();
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('card');

  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    phone: '',
    terms: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
  const newErrors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.name.trim()) {
    newErrors.name = 'Nombre requerido';
  } else if (form.name.trim().length < 3) {
    newErrors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!form.email) {
    newErrors.email = 'Email requerido';
  } else if (!emailRegex.test(form.email)) {
    newErrors.email = 'Email inválido';
  }

  if (!form.phone) {
    newErrors.phone = 'Teléfono requerido';
  } else if (!/^[0-9]+$/.test(form.phone)) {
    newErrors.phone = 'El teléfono solo debe contener números';
  } else if (form.phone.length < 7) {
    newErrors.phone = 'Teléfono demasiado corto';
  }

  if (!form.terms) {
    newErrors.terms = 'Debes aceptar los términos';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleConfirm = async () => {
    if (!validate()) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1500));

      console.log('Reserva confirmada', {
        user: form,
        showtimeId,
        paymentMethod,
      });

    setLoading(false);

    router.push(`/booking/${showtimeId}/success`);
  };

  if (loading) {
      return (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )
    }

  return (
    <Container sx={{ py: 4}}>
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 2 }}>
          Volver a Selección de Asientos
      </Button>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        📝 Checkout - Confirma tu Reserva
      </Typography>
      <BookingStepper activeStep={1} />
      <Grid container spacing={4} direction={{ xs: 'column', lg: 'row' }}>
        <Grid  size={{ xs: 12, lg: 8 }}>
          <PaymentMethodForm
            value={paymentMethod}
            onChange={setPaymentMethod}
          />

          <UserDataForm
            value={form}
            errors={errors}
            onChange={(data) =>
              setForm((prev) => ({ ...prev, ...data }))
            }
          />
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs:12, lg:4 }}>
          <BookingSummary
            onConfirm={handleConfirm}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

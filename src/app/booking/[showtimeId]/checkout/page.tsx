'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import { Box,  CircularProgress,  Grid,  } from '@mui/material';

import PaymentMethodForm from '@/components/booking/PaymentMethodForm';
import UserDataForm from '@/components/booking/UserDataForm';
import BookingSummary from '@/components/booking/BookingSummary';
import { checkoutSchema } from '@/schemas/checkout.schema';

type PaymentMethod = 'cash' | 'card' | 'transfer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
  confirm: boolean;
}

export default function CheckoutPage() {
  const { showtimeId } = useParams();
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('card');

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      terms: false,
      confirm: false,
    },
  });


  const onSubmit = async (data:FormData) => {

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1500));

      console.log('Reserva confirmada', {
        user: data,
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
    <Grid container spacing={4} direction={{ xs: 'column', lg: 'row' }}>
      <Grid  size={{ xs: 12, lg: 8 }}>
        <PaymentMethodForm
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
        <UserDataForm
          control={control}
        />
      </Grid>
      <Grid size={{ xs:12, lg:4 }}>
        <BookingSummary
          onConfirm={handleSubmit(onSubmit)}
        />
      </Grid>
    </Grid>
  );
}

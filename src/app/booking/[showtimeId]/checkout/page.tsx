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
import { PAYMETMETHOD_ENUM } from '@/utils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
  confirm: boolean;
}

const DEFAULT_VALUES: FormData = {
  name: '',
  email: '',
  phone: '',
  terms:false,
  confirm:false
};

const FORM_OPTIONS = {
  mode: 'onBlur' as const,
  defaultValues: DEFAULT_VALUES,
};

export default function CheckoutPage() {
  const { showtimeId } = useParams();
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [paymentMethod, setPaymentMethod] = useState<PAYMETMETHOD_ENUM>(PAYMETMETHOD_ENUM.Card);

  const [loading, setLoading] = useState<boolean>(false);

  


  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(checkoutSchema),
    ...FORM_OPTIONS,
  });


  const onSubmit = async () => {

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1500));

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

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, CircularProgress, Grid } from '@mui/material'; 

import PaymentMethodForm from '@/components/booking/PaymentMethodForm';
import UserDataForm from '@/components/booking/UserDataForm';
import BookingSummary from '@/components/booking/BookingSummary';
import BookingConfirmation from '@/components/booking/BookingConfirmation'; 

import { checkoutSchema } from '@/schemas/checkout.schema';
import { PAYMETMETHOD_ENUM, showError } from '@/utils';
import { BookingService } from '@/services/booking.service';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts';
import { Timestamp } from 'firebase/firestore';

interface FormData {
  terms: boolean;
  confirm: boolean;
}

const DEFAULT_VALUES: FormData = {
  terms: false,
  confirm: false
};

const FORM_OPTIONS = {
  mode: 'onBlur' as const,
  defaultValues: DEFAULT_VALUES,
};

export default function CheckoutPage() {
  const { showtimeId } = useParams();
  const router = useRouter();
  const { selectedSeats, selectedShowtime, clearBooking } = useBooking();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PAYMETMETHOD_ENUM>(PAYMETMETHOD_ENUM.Card);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false); 

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(checkoutSchema),
    ...FORM_OPTIONS,
  });

  useEffect(() => {
    if ((!selectedSeats.length || !selectedShowtime) && !isSuccess) {
      router.push('/');
    }
  }, [selectedSeats, selectedShowtime, router, isSuccess]);


  const onSubmit = async () => {
    setLoading(true);
    if (!user) return;

    try {
      if (!selectedShowtime) {
        showError('No showtime selected');
        setLoading(false);
        return;
      }

      await BookingService.create({
        userId: user.uid,
        showtimeId: showtimeId as string,
        movieId: selectedShowtime?.movieId ?? '',
        seats: selectedSeats,
        totalPreice: selectedShowtime.price * selectedSeats.length, 
        status: 'pending',
        paymentMethod,
        bookingDate: Timestamp.now()
      });

      setIsSuccess(true);
      
    } catch (error) {
      console.error(error);
      showError(typeof error === 'string' ? error : 'Ocurrió un error al procesar la reserva');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6, minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isSuccess) {
    return <BookingConfirmation />;
  }

  return (
    <Grid container spacing={4} direction={{ xs: 'column', lg: 'row' }}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <PaymentMethodForm
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
        <UserDataForm
          control={control}
          userData={user}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <BookingSummary
          onConfirm={handleSubmit(onSubmit)}
        />
      </Grid>
    </Grid>
  );
}
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
import { PAYMETMETHOD_ENUM, showError } from '@/utils';
import { BookingService } from '@/services/booking.service';
import { useBooking } from '@/contexts/BookingContext';

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
  const { selectedSeats,selectedShowtime, clearBooking } = useBooking();

  /* ---------------- STATE ---------------- */
  const [paymentMethod, setPaymentMethod] = useState<PAYMETMETHOD_ENUM>(PAYMETMETHOD_ENUM.Card);

  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(checkoutSchema),
    ...FORM_OPTIONS,
  });


  const onSubmit = async () => {

    setLoading(true);

    try{
      if (!selectedShowtime) {
        showError('No showtime selected');
        setLoading(false);
        return;
      }
      
      const response = await BookingService.create({
        userId:'',
        showtimeId: showtimeId as string,
        movieId: selectedShowtime?.movieId ?? '',
        seats: selectedSeats,
        totalPreice: selectedShowtime.price * selectedSeats.length,
        status:'pending',
        paymentMethod,
        bookingDate: new Date()
      })

      router.push(`/booking/${showtimeId}/tickets/${response.id}`);
    }catch(error){
      showError(error as string || 'Ocurrio un error al procesar la reserva')
    }finally{
      clearBooking();
      setLoading(false);
    }
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

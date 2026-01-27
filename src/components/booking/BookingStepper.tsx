'use client';

import { BOOKING_LABEL_MAP } from '@/utils';
import { ArrowBack } from '@mui/icons-material';
import {Stepper, Step, StepLabel, Box, Typography, Button} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

enum BookingStepPath {
  SEATS = 'seats',
  CHECKOUT = 'checkout',
  TICKETS = 'tickets',
}

type BookingStep = {
  label: string;
  path: BookingStepPath;
};

const steps: BookingStep[] = [
  { label: 'Seleccionar Asientos', path: BookingStepPath.SEATS },
  { label: 'Confirmar Pago', path: BookingStepPath.CHECKOUT },
  { label: 'Obtener Tickets', path: BookingStepPath.TICKETS },
];


export default function BookingStepper() {
  const router = useRouter();
  const pathName = usePathname();

  const activeStep = useMemo(()=>{
    return steps.findIndex(step => pathName.includes(step.path));
  }, [pathName]);

  return (
    <Box sx={{ width: '100%', m: 3, ml:0}}>
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 2 }}>
         {BOOKING_LABEL_MAP.get(activeStep) ?? 'Volver'}
      </Button>
      { activeStep === 1 && (
        <Typography variant="h4" fontWeight={800} gutterBottom>
          📝 Checkout - Confirma tu Reserva
        </Typography>
      )
      }
      <Stepper activeStep={activeStep} >
        {steps.map((step,index) => (
            <Step key={step.label} >
                <StepLabel>
                    <strong>PASO {index+1}</strong>
                    <br/>
                    {step.label}
                </StepLabel>
            </Step>
        ))}
      </Stepper>
    </Box>
  );
}

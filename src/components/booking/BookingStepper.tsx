'use client';

import { ArrowBack } from '@mui/icons-material';
import {Stepper, Step, StepLabel, Box, Typography, Button} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';


const steps= [
  { label: 'Seleccionar Asientos', path: 'seats' },
  { label: 'Confirmar Pago', path: 'checkout' },
  { label: 'Obtener Tickets', path: 'tickets' },
];


export default function BookingStepper() {
  const router = useRouter();
  const pathName = usePathname();

  const activeStep = steps.findIndex(step => pathName.includes(step.path));
    
  const backLabelMap: Record<number, string> = {
    0: 'Volver a Horarios',
    1: 'Volver a Selección de Asientos',
    2: 'Volver',
  };
  return (
    <Box sx={{ width: '100%', m: 3, ml:0}}>
      <Button startIcon={<ArrowBack />} onClick={() => router.back()} sx={{ mb: 2 }}>
         {backLabelMap[activeStep]}
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

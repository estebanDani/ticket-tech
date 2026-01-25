'use client';

import {
  Stepper,
  Step,
  StepLabel,
  Box,
} from '@mui/material';

interface BookingStepperProps {
  activeStep: number;
}

const steps:Record<string, string>= {
  'PASO 1':'Seleccionar Asientos',
  'PASO 2':'Confirmar Pago',
  'PASO 3':'Obtener Tickets',
};

export default function BookingStepper({
  activeStep,
}: BookingStepperProps) {
  return (
    <Box sx={{ width: '100%', m: 3, ml:0}}>
      <Stepper activeStep={activeStep} >
        {Object.entries(steps).map(([key, label]) => (
            <Step key={key} >
                <StepLabel>
                    <strong>{key}</strong>
                    <br/>
                    {label}
                </StepLabel>
            </Step>
        ))}
      </Stepper>
    </Box>
  );
}

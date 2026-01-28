'use client';  

import {  PAYMETMETHOD_ENUM, PAYMETMETHOD_MAP } from '@/utils';
import {Paper, Typography, RadioGroup, FormControlLabel, Radio} from '@mui/material';

interface Props {
  value: PAYMETMETHOD_ENUM;
  onChange: (value: PAYMETMETHOD_ENUM) => void;
}

export default function PaymentMethodForm({ value, onChange }: Props) {

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>💳 MÉTODO DE PAGO</Typography>

      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value as PAYMETMETHOD_ENUM)}
      >
        {[...PAYMETMETHOD_MAP.entries()].map(([key, label]) => (
            <FormControlLabel
            sx={{ 
                    m:1,
                    ml:0,
                    border:0.5, 
                    borderColor:"grey.300",
                    borderRadius:1
                  }}
            key={key}
            value={key}
            control={<Radio />}
            label={label}
            />
        ))}
      </RadioGroup>
    </Paper>
  );
}

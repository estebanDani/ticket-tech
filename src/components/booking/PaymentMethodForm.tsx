'use client';  

import {Paper, Typography, RadioGroup, FormControlLabel, Radio} from '@mui/material';

type PaymentMethod = 'cash' | 'card' | 'transfer';

interface Props {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

export default function PaymentMethodForm({ value, onChange }: Props) {

    const paymetMethods :Record<PaymentMethod, string>={
        'cash': '💵 Efectivo en taquilla',
        'card': '💳 Tarjeta de crédito / débito',
        'transfer': '📲 Transferencia bancaria'
    }
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>💳 MÉTODO DE PAGO</Typography>

      <RadioGroup
        value={value}
        onChange={(e) => onChange(e.target.value as PaymentMethod)}
      >
        {Object.entries(paymetMethods).map(([key, label]) => (
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

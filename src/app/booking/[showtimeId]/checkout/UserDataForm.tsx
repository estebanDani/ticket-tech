import {Paper, Typography, TextField, Checkbox, FormControlLabel, FormHelperText, Box} from '@mui/material';
import { Person } from '@mui/icons-material';

interface UserForm {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
  confirm: boolean;
}

interface Props {
  value: UserForm;
  errors: Record<string, string>;
  onChange: (data: Partial<UserForm>) => void;
}

export default function UserDataForm({ value, errors, onChange }: Props) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        <Person color='primary' sx={{ fontSize: 30 }}></Person>DATOS DEL COMPRADOR
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Typography >Nombre completo</Typography>
        <TextField
          value={value.name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <Typography  >Email</Typography>
        <TextField
          type='email'
          value={value.email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <Typography>Teléfono</Typography>
        <TextField
          type='number'
          value={value.phone}
          error={!!errors.phone}
          helperText={errors.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={value.terms}
              onChange={(e) => onChange({ terms: e.target.checked })}
            />
          }
          label="Acepto los términos y condiciones"
        />

        {errors.terms && (
          <FormHelperText error>{errors.terms}</FormHelperText>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={value.confirm}
              onChange={(e) => onChange({ confirm: e.target.checked })}
            />
          }
          label="Deseo recibir confirmación por email"
        />

      </Box>
    </Paper>
  );
}

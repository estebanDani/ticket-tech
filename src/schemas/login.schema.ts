import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('Campo requerido'),
  password: yup
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Campo requerido'),
});


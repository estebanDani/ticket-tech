import { CreateUserDto } from '@/types';
import * as yup from 'yup';


interface RegisterFormData {
  user: CreateUserDto;
  password: string;
  passwordConfirm?: string;
}


export const registerSchema: yup.ObjectSchema<RegisterFormData> = yup.object().shape({
  user: yup.object().shape({
    email: yup
      .string()
      .required('Campo requerido')
      .email('Formato de email inválido'),
    displayName: yup
      .string()
      .required('Campo requerido')
      .min(2, 'El nombre debe tener al menos 2 letras'),
    role: yup
      .string()
      .oneOf(['user', 'admin']).default('user'),
    createdAt: yup.date().default(() => new Date()),
  }),
  password: yup
    .string()
    .required('Campo requerido')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  passwordConfirm: yup.string().when('password', (password, schema) => {
    return password && password.length > 0
      ? schema
          .required('Confirmación de contraseña')
          .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      : schema.notRequired();
  }),
});


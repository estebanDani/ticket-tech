import * as yup from 'yup';

interface FormData {
  name: string;
  email: string;
  phone: string;
  terms: boolean;
  confirm: boolean;
}

export const checkoutSchema: yup.ObjectSchema<FormData> = yup.object({
  name: yup
    .string()
    .required('Nombre requerido')
    .min(2, 'El nombre debe tener al menos 2 letras')
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo debe contener letras'
    ),

  email: yup
    .string()
    .required('Email requerido')
    .email('Formato de email inválido'),

  phone: yup
    .string()
    .required('Teléfono requerido')
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(10, 'El teléfono no debe tener más de 10 dígitos'),

  terms: yup
    .boolean()
    .default(false)
    .oneOf([true], 'Debes aceptar los términos'),

  confirm: yup
    .boolean()
    .default(false),
});


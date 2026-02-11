import * as yup from 'yup';

interface FormData {
  terms: boolean;
  confirm: boolean;
}

export const checkoutSchema: yup.ObjectSchema<FormData> = yup.object({
  terms: yup
    .boolean()
    .default(false)
    .oneOf([true], 'Debes aceptar los términos'),

  confirm: yup
    .boolean()
    .default(false),
});


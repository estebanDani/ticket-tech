import { enqueueSnackbar, VariantType } from 'notistack'

export const showSnackbar = (
  message: string,
  variant: VariantType = 'default'
) => {
  enqueueSnackbar(message, { variant })
}
export const showError = (message: string) =>
  showSnackbar(message, 'error')

export const showSuccess = (message: string) =>
  showSnackbar(message, 'success')

export const showWarning = (message: string) =>
  showSnackbar(message, 'warning')
import * as yup from "yup";

export const showtimeSchema = yup.object({
  movieId: yup.string().required("La película es obligatoria"),
  theaterId: yup.string().required("La sala es obligatoria"),
  startTime: yup.date().required("La fecha y hora son obligatorias"),
  price: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("El precio es obligatorio")
    .min(1, "El precio debe ser mayor a 0"),
  availableSeats: yup.number().required().min(0),
  date: yup.string().required("La fecha es obligatoria")
});
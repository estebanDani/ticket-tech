import * as yup from 'yup';


export const movieSchema = yup.object({
  title: yup.string().required("El título es obligatorio"),
  synopsis: yup.string()
    .required("La sinopsis es obligatoria")
    .min(10, "Mínimo 10 caracteres"),
  duration: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("La duración es obligatoria")
    .min(1, "Mínimo 1 minuto"),
  genre: yup.array()
    .of(yup.string().required())
    .min(1, "Selecciona al menos un género")
    .required(),
  rating: yup.string().required("Clasificación obligatoria"),
  posterUrl: yup.string()
    .url("Debe ser una URL válida")
    .required("URL del póster obligatoria"),
  trailerUrl: yup.string()
    .url("Debe ser una URL válida")
    .required("URL del trailer obligatoria"),
  releaseDate: yup.date()
    .required("Fecha obligatoria")
    .typeError("Fecha inválida"),
  isActive: yup.boolean().required(),
  createdAt: yup.date().default(() => new Date())
}).required();
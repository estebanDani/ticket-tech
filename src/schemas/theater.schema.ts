import * as yup from "yup";

export const theaterSchema = yup.object({
    name: yup.string().required("El nombre es obligatorio"),
    rows: yup.number().required("El número de filas es obligatorio"),
    seatsPerRow: yup.number().required("El número de asientos por fila es obligatorio"),
    amenities: yup.array().of(yup.string()).required(),
}).required();
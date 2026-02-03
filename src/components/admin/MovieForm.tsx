"use client";

import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Grid, 
  Typography,
  Paper,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  OutlinedInput,
  FormControlLabel,
  Switch
} from "@mui/material";
import { Movie, CreateMovieDto } from "@/types";
import { GENRE_LIST, RATINGS_LIST } from "@/utils";

const schema = yup.object({
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

type MovieFormData = yup.InferType<typeof schema>;

interface MovieFormProps {
  initialData?: Movie; 
  onSubmit: SubmitHandler<CreateMovieDto>; 
  isLoading?: boolean;
}

export const MovieForm: React.FC<MovieFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading = false 
}) => {
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      synopsis: "",
      duration: 0,
      genre: [],
      rating: "",
      posterUrl: "",
      trailerUrl: "", 
      releaseDate: new Date(),
      isActive: true,
      createdAt: new Date(),
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        releaseDate: new Date(initialData.releaseDate),
        createdAt: new Date(initialData.createdAt),
      });
    }
  }, [initialData, reset]);

  const onFormSubmit: SubmitHandler<MovieFormData> = async (data) => {
    await onSubmit(data);
  };

  const isEditMode = !!initialData;

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
        {isEditMode ? "✏️ Editar Película" : "🎬 Nueva Película"}
      </Typography>

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Grid container spacing={3}>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Título"
              InputLabelProps={{ shrink: true, sx: {color: 'text.primary'} }} 
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Sinopsis"
              InputLabelProps={{ shrink: true, sx: {color: 'text.primary'}}} 
              {...register("synopsis")}
              error={!!errors.synopsis}
              helperText={errors.synopsis?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Duración (min)"
              InputLabelProps={{ shrink: true, sx: {color: 'text.primary'} }} 
              {...register("duration")}
              error={!!errors.duration}
              helperText={errors.duration?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={!!errors.rating}>
                <InputLabel
                shrink
                sx={{ color: 'text.primary' }}
                >              
                Clasificación
                </InputLabel>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Select 
                    {...field} 
                    label="Clasificación"
                    notched 
                  >
                    {RATINGS_LIST.map((r) => (
                      <MenuItem key={r} value={r}>{r}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.rating?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth error={!!errors.genre}>
                <InputLabel
                shrink
                sx={{ color: 'text.primary' }}
                >              
                    Géneros
                </InputLabel>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    input={<OutlinedInput label="Géneros" notched />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((val) => {

                          const genreObj = GENRE_LIST.find(g => g.value === val);
                          const labelToShow = genreObj ? genreObj.label : val;
                          
                          return (
                            <Chip key={val} label={labelToShow} size="small" />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {GENRE_LIST.map(({value, label}) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.genre?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="URL Poster"
              InputLabelProps={{ shrink: true, sx: {color: 'text.primary'} }} 
              {...register("posterUrl")}
              error={!!errors.posterUrl}
              helperText={errors.posterUrl?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="URL Trailer"
              InputLabelProps={{ shrink: true, sx: {color: 'text.primary'} }} 
              {...register("trailerUrl")}
              error={!!errors.trailerUrl}
              helperText={errors.trailerUrl?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Estreno"
              InputLabelProps={{ shrink: true, sx: {color: 'text.primary'} }} 
              {...register("releaseDate")}
              error={!!errors.releaseDate}
              helperText={errors.releaseDate?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} display="flex" alignItems="center">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch 
                      checked={field.value} 
                      onChange={(e) => field.onChange(e.target.checked)} 
                      color="primary" 
                    />
                  }
                  label="Película Activa (En Cartelera)"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? "Guardando..." : isEditMode ? "Actualizar Pelicula" : "Crear Pelicula"}
            </Button>
          </Grid>

        </Grid>
      </form>
    </Paper>
  );
};
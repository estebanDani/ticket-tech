"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

import {
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
  InputAdornment,
  Alert
} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { Movie, Theater, CreateShowtimeDto, Showtime } from "@/types";

const schema = yup.object({
  movieId: yup.string().required("Debes seleccionar una película"),
  theaterId: yup.string().required("Debes seleccionar una sala"),
  price: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("El precio es obligatorio")
    .min(1, "El precio debe ser mayor a 0"),
  startTime: yup.date()
    .required("Fecha y hora obligatoria")
    .typeError("Fecha inválida"),
}).required();

type ShowtimeFormData = yup.InferType<typeof schema>;

interface ShowtimeFormProps {
  initialData?: Showtime;
  movies: Movie[];        
  theaters: Theater[];    
  existingShowtimes?: Showtime[];
  onSubmit: (data: CreateShowtimeDto) => Promise<void>; 
  isLoading?: boolean;
}

export const ShowtimeForm: React.FC<ShowtimeFormProps> = ({ 
  initialData, 
  movies, 
  theaters,
  existingShowtimes = [],
  onSubmit, 
  isLoading = false 
}) => {
  
  const [conflictError, setConflictError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ShowtimeFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      movieId: "",
      theaterId: "",
      price: 0,
      startTime: new Date(),
    },
  });

  const selectedMovieId = watch("movieId");
  const selectedStartTime = watch("startTime");

  const calculatedEndTime = useMemo(() => {
    if (!selectedMovieId || !selectedStartTime) return null;
    const movie = movies.find(m => m.id === selectedMovieId);
    if (!movie) return null;
    return dayjs(selectedStartTime).add(movie.duration, 'minute');
  }, [selectedMovieId, selectedStartTime, movies]);


  useEffect(() => {
    if (initialData) {
      reset({
        movieId: initialData.movieId,
        theaterId: initialData.theaterId,
        price: initialData.price,
        startTime: new Date(initialData.startTime),
      });
    }
  }, [initialData, reset]);

  const checkTimeConflict = (theaterId: string, start: Dayjs, end: Dayjs): boolean => {
    const theaterShowtimes = existingShowtimes.filter(s => 
      s.theaterId === theaterId && s.id !== initialData?.id
    );

    return theaterShowtimes.some(show => {
      const showStart = dayjs(show.startTime); 
      const showEnd = dayjs(show.endTime);

      return start.isBefore(showEnd) && end.isAfter(showStart);
    });
  };

  const onFormSubmit: SubmitHandler<ShowtimeFormData> = async (data) => {
    setConflictError(null);
    
    if (!calculatedEndTime) {
      setConflictError("Error al calcular la hora de fin. Verifica la película.");
      return;
    }

    const start = dayjs(data.startTime);
    const end = calculatedEndTime;

    if (checkTimeConflict(data.theaterId, start, end)) {
      setConflictError("⚠️ Conflicto: Ya existe una función en esta sala a esa hora.");
      return; 
    }

    const theater = theaters.find(t => t.id === data.theaterId);
    if (!theater) {
        setConflictError("Error: Sala no encontrada");
        return;
    }

    const movie = movies.find(m => m.id === data.movieId);
    if (movie && !movie.isActive) {
      setConflictError("⚠️ Aviso: Esta película está marcada como inactiva.");
      return;
    }

    const finalData: CreateShowtimeDto = {
      movieId: data.movieId,
      theaterId: data.theaterId,
      price: data.price,
      startTime: data.startTime,
      
      endTime: end.toDate(),
      date: start.format("YYYY-MM-DD"), 
      availableSeats: theater.capacity, 
      reservedSeats: []
    };

    await onSubmit(finalData);
  };

  const isEditMode = !!initialData;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
          {isEditMode ? "✏️ Editar Función" : "📅 Nueva Función"}
        </Typography>

        {conflictError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {conflictError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <Grid container spacing={3}>
            
            {/* 1. PELÍCULA */}
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth error={!!errors.movieId}>
                <InputLabel
                  shrink
                  sx={{ color: 'text.primary' }}
                > Película
                </InputLabel>
                <Controller
                  name="movieId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Película" notched>
                      {movies.map((movie) => (
                        <MenuItem key={movie.id} value={movie.id}>
                          {movie.title} ({movie.duration} min)
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.movieId?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth error={!!errors.theaterId}>
                <InputLabel
                  shrink
                  sx={{ color: 'text.primary' }}
                > Sala</InputLabel>
                <Controller
                  name="theaterId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Sala / Teatro" notched>
                      {theaters.map((theater) => (
                        <MenuItem key={theater.id} value={theater.id}>
                          {theater.name} (Cap: {theater.capacity})
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.theaterId?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Precio Entrada"
                InputLabelProps={{ shrink: true, sx: {color: 'text.primary'} }}
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">Bs</InputAdornment>
                    }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="startTime"
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <DateTimePicker
                    label="Fecha y Hora"
                    value={value ? dayjs(value) : null}
                    onChange={(newValue) =>
                      onChange(newValue ? newValue.toDate() : null)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                        sx: {
                          '& .MuiInputLabel-root': {
                            color: 'text.primary',
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: 'text.primary',
                          },
                        },
                      },
                    }}
                    disablePast
                  />
                )}
              />
            </Grid>



            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Hora Fin"
                value={
                  calculatedEndTime
                    ? calculatedEndTime.format("DD/MM/YYYY HH:mm")
                    : "--:--"
                }
                InputLabelProps={{
                  sx: {
                    color: 'text.primary',
                    '&.Mui-focused': {
                      color: 'text.primary',
                    },
                  },
                }}
                variant="filled"
                helperText="Se calcula automáticamente sumando duración"
              />
            </Grid>


            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                {isLoading ? "Procesando..." : isEditMode ? "Guardar Función" : "Editar Función"}
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};
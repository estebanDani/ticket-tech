"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, MenuItem, Grid, Typography, Paper} from "@mui/material";
import { showtimeSchema } from "@/schemas";

interface ShowtimeFormProps {
  initialData?: any | null;
  movies: Record<string, string>;
  theaters: any[];
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export const ShowtimeForm: React.FC<ShowtimeFormProps> = ({
  initialData,
  movies,
  theaters,
  onSubmit,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(showtimeSchema),
    mode: 'onChange',
    defaultValues: {
      price: 0,
      availableSeats: 0,
      date: new Date().toISOString().split('T')[0]
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        startTime: new Date(initialData.startTime),
      });
    }
  }, [initialData, reset]);

  const isEditMode = !!initialData;

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
        {isEditMode ? "✏️ Editar Función" : "🎬 Nueva Función"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
            <Grid size={12}>
            <TextField
              select
              fullWidth
              label="Película"
              InputLabelProps={{ shrink: true }}
              {...register("movieId")}
              error={!!errors.movieId}
              helperText={errors.movieId?.message}
            >
              {Object.entries(movies).map(([id, name]) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Sala"
              InputLabelProps={{ shrink: true }}
              {...register("theaterId")}
              error={!!errors.theaterId}
              helperText={errors.theaterId?.message}
            >
              {theaters.map((t) => (
                <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Precio (Bs)"
              InputLabelProps={{ shrink: true }}
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de la función"
              InputLabelProps={{ shrink: true }}
              {...register("date")}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="time"
                  label="Hora de Inicio"
                  InputLabelProps={{ shrink: true }}
                  value={field.value instanceof Date ? field.value.toTimeString().slice(0, 5) : field.value}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const date = new Date();
                    date.setHours(parseInt(hours), parseInt(minutes));
                    field.onChange(date);
                  }}
                  error={!!errors.startTime}
                  helperText={errors.startTime?.message}
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? "Guardando..." : isEditMode ? "Actualizar Función" : "Crear Función"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
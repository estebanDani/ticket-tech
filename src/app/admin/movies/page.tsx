'use client';

import { useState } from 'react';
import { Button, Dialog } from '@mui/material';

import { showError, showSuccess } from '@/utils';
import { CreateMovieDto } from '@/types';
import { MovieService } from '@/services';
import { MovieForm } from '@/components';
import { useMovies } from '@/hooks';


export default function MoviesPage() {
  const { load } = useMovies();
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (data: CreateMovieDto) => {
    setSubmitting(true);

    try {
      await MovieService.create(data);

      showSuccess('Película creada correctamente');
      setOpen(false);
      await load();

    } catch {
      showError( 'Ocurrió un error al crear la película');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={()=>setOpen(true)}>
        Nueva Película
      </Button>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={()=>setOpen(false)}
      >
        <MovieForm
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Dialog>
    </>
  );
}

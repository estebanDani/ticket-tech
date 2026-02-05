'use client';

import * as React from 'react';
import {Button, Dialog} from '@mui/material/';

import { showError, showSuccess } from '@/utils';
import { CreateMovieDto } from '@/types';
import { MovieService } from '@/services';
import { MovieForm } from '@/components';
import { useMovies } from '@/hooks';


export default function MoviesPage() {
  const { load } = useMovies();
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: CreateMovieDto) => {
    setSubmitting(true);

    try {
      await MovieService.create(data);

      showSuccess('Película creada correctamente');
      handleClose();
      await load();

    } catch {
      showError( 'Ocurrió un error al crear la película');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Nueva Película
      </Button>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <MovieForm
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Dialog>
    </>
  );
}

'use client';

import { useState } from 'react';
import { Button, Dialog, Container, Box } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { showError, showSuccess } from '@/utils';
import { CreateMovieDto, Movie, UpdateMovieDto } from '@/types';
import { MovieService } from '@/services';
import { MovieForm } from '@/components';
import { DeleteModal } from '@/components/common/DeleteModal';
import { useMovies } from '@/hooks';
import { MovieTable } from './MovieTable';

export default function MoviesPage() {
  const { movies, load } = useMovies();
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleSubmit = async (data: CreateMovieDto) => {
    setSubmitting(true);

    try {
      if (selectedMovie) {
        const updateData: UpdateMovieDto = data;
        await MovieService.update(selectedMovie.id, updateData);
        showSuccess("Película Actualizada Correctamente");
      } else {
        await MovieService.create(data);
        showSuccess("Película Creada Correctamente");
      }

      setOpen(false);
      setSelectedMovie(undefined);
      await load();
    } catch {
      showError('Ocurrió un error al procesar la película');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedMovie(undefined);
    setOpen(true);
  };

  const handleOpenEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleOpenDeleteDialog = (movie: Movie) => {
    setMovieToDelete(movie);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setMovieToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!movieToDelete) return;

    setDeleting(true);

    try {
      await MovieService.delete(movieToDelete.id);
      showSuccess("Película Eliminada Correctamente");
      await load();
      handleCloseDeleteDialog();
    } catch {
      showError('Ocurrió un error al eliminar la película');
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(undefined);
  };

  return (
    <Container maxWidth={false} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PageHeader title="Películas" description="Gestiona las películas de tu cine" icon="📽️" />
        <Button variant="contained" onClick={handleOpenCreate}>
          Nueva Película
        </Button>
      </Box>

      <MovieTable
        movies={movies}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDeleteDialog}
      />

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <MovieForm
          initialData={selectedMovie}
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Dialog>

      <DeleteModal
        open={deleteDialogOpen}
        title="Confirmar Eliminación"
        itemName={movieToDelete?.title}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        isDeleting={deleting}
      />
    </Container>
  );
}
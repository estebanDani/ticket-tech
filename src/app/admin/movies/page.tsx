'use client';

import { useMemo, useState } from 'react';
import { Button, Dialog, Container, Box, TextField, InputAdornment } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { showError, showSuccess } from '@/utils';
import { CreateMovieDto, Movie, UpdateMovieDto } from '@/types';
import { MovieService } from '@/services';
import { MovieForm } from '@/components';
import { DeleteModal } from '@/components/common/DeleteModal';
import { useMovies } from '@/hooks';
import { MovieTable } from './MovieTable';
import { Search } from '@mui/icons-material';

export default function MoviesPage() {
  const { movies, load } = useMovies();
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

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
      setSelectedMovie(null);
      await load();
    } catch {
      showError('Ocurrió un error al procesar la película');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedMovie(null);
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
    setSelectedMovie(null);
  };

  const filteredMovies = useMemo(()=>{
    return  movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  },[movies,search]) 

  return (
    <Container maxWidth={false} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap:2,flexWrap:'wrap'}}>
        <PageHeader title="Películas" description="Gestiona las películas de tu cine" icon="📽️" />

        <Box sx={{display:'flex',flexWrap:'wrap', alignItems:'center',
          justifyContent:{ xs: 'space-between', md: 'flex-end' },
           width: { xs: '100%', md: 'auto' }, gap:1}}>
          <TextField
            fullWidth
            sx={{
              width: { xs: '100%', sm: 250 },
            }}
            size="small"
            placeholder="Buscar película..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button  variant="contained" onClick={handleOpenCreate}>
            Nueva Película
          </Button>
        </Box>
      </Box>
      <MovieTable
        movies={filteredMovies}
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
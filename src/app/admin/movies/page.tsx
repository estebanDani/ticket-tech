'use client';

import { useState } from 'react';
import { Box, Button, CircularProgress, Dialog, InputAdornment, Paper, TextField } from '@mui/material';

import { showError, showSuccess } from '@/utils';
import { CreateMovieDto, Movie } from '@/types';
import { MovieService } from '@/services';
import { useMovies } from '@/hooks';

import { MovieForm } from '@/components';
import { FormDelete } from '@/components/admin/movie_form/FormDelete';
import MovieTable from '@/components/admin/movie_form/MovieTable';
import { Search } from '@mui/icons-material';


export default function MoviesPage() {
  const {movies, load, loading } = useMovies();

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'create' | 'update' | 'delete' | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [search, setSearch] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (mode: 'create' | 'update' | 'delete', movie?: Movie) => {
    setMode(mode);
    setSelectedMovie(movie ?? null);
    setOpen(true);
  };
  
  const handleCreate = async (data: CreateMovieDto) => {
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

  const handleUpdate = async () => {
     if (!selectedMovie) return;
    setSubmitting(true);
    try {
      await MovieService.update(selectedMovie?.id, selectedMovie);
      showSuccess('Película actualizada correctamente');
      setOpen(false);
      await load();
      
    } catch(error) {
      console.error(error)
      showError( 'Ocurrió un error al crear la película');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if(!selectedMovie) return;
    setSubmitting(true);

    try {
      await MovieService.delete(selectedMovie.id);
      showSuccess('Película eliminada correctamente');
      setOpen(false);
      setSelectedMovie(null);
      await load();
    } catch {
      showError('Ocurrió un error al eliminar la película');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }
  
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={() => handleOpen("create")}>
          Nueva Película
        </Button>

        <TextField
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
      </Paper>
      <br />
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={()=>setOpen(false)}
      >
        {mode === 'create' && (
          <MovieForm onSubmit={handleCreate} isLoading={submitting} />
        )}

        {mode === 'update' && selectedMovie && (
          <MovieForm
            initialData={selectedMovie}
            onSubmit={handleUpdate}
            isLoading={submitting}
          />
        )}

        {mode === 'delete' && selectedMovie && (
          <FormDelete
            title={selectedMovie.title}
            handleDelete={handleDelete}
            submit={submitting}
          />
        )}

      </Dialog>
      <MovieTable
        movies={filteredMovies}
        onEdit={(movie) => handleOpen('update', movie)}
        onDelete={(movie) => handleOpen('delete', movie)}
      />
    </>
  );
}

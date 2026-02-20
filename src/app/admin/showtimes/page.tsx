'use client';

import { useMemo, useState } from 'react';
import { Button, Dialog, Container, Box, CircularProgress } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { showError, showSuccess } from '@/utils';
import { ShowtimeService } from '@/services';
import { ShowtimeForm, ShowtimesFilters, ShowtimesTable } from '@/components';
import { ShowtimeDelete } from '@/components';
import { useShowtimesView } from '@/hooks/useShowtimeView';
import { CreateShowtimeDto, EnrichedShowtime } from '@/types';

export default function ShowtimesPage() {
  const { showtimes, moviesMap, moviesList, theaters, load, loading} = useShowtimesView();
  
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedShowtime, setSelectedShowtime] = useState<EnrichedShowtime | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [showtimeToDelete, setShowtimeToDelete] = useState<EnrichedShowtime | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  
  const [filters, setFilters] = useState({ movieId: "", date: "" });

  const handleSubmit = async (data: CreateShowtimeDto) => {
    setSubmitting(true);
    try {
      if (selectedShowtime) {
        await ShowtimeService.update(selectedShowtime.id, data);
        showSuccess("Función Actualizada Correctamente");
      } else {
        await ShowtimeService.create(data);
        showSuccess("Función Creada Correctamente");
      }
      setOpen(false);
      setSelectedShowtime(null);
      await load();
    } catch {
      showError('Ocurrió un error al procesar la función');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!showtimeToDelete) return;
    setDeleting(true);
    try {
      await ShowtimeService.delete(showtimeToDelete.id);
      showSuccess("Función Eliminada Correctamente");
      await load();
      setDeleteDialogOpen(false);
      setShowtimeToDelete(null);
    } catch {
      showError('Ocurrió un error al eliminar la función');
    } finally {
      setDeleting(false);
    }
  };

  const filteredShowtimes = useMemo(() => {
    return (showtimes as EnrichedShowtime[]).filter((s) => {
      const matchMovie = filters.movieId ? s.movieId === filters.movieId : true;
      const matchDate = filters.date ? s.date === filters.date : true;
      return matchMovie && matchDate;
    });
  }, [showtimes, filters]);

  if(loading){
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6, minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth={false} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PageHeader title="Administración de funciones" description="Gestiona el horario del cine" icon="🎬" />
        <Box display="flex" alignItems="center" gap={1}>
          <ShowtimesFilters moviesfilter={moviesMap} filters={filters} onChange={setFilters} />
          <Button variant="contained" onClick={() => { setSelectedShowtime(null); setOpen(true); }}>
            Nueva Función
          </Button>
        </Box>
      </Box>

      <ShowtimesTable 
        showtimes={filteredShowtimes} 
        onEdit={(s) => { setSelectedShowtime(s as EnrichedShowtime); setOpen(true); }} 
        onDelete={(s) => { setShowtimeToDelete(s as EnrichedShowtime); setDeleteDialogOpen(true); }} 
      />

      <Dialog fullWidth maxWidth="md" open={open} onClose={() => setOpen(false)}>
        <ShowtimeForm
          initialData={selectedShowtime ?? undefined}
          movies={moviesList}
          theaters={theaters}
          existingShowtimes={showtimes}
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <ShowtimeDelete
            title={showtimeToDelete ? `${showtimeToDelete.movieName} (${showtimeToDelete.date})` : ""}
            handleDelete={handleConfirmDelete}
            submit={deleting}
        />
      </Dialog>
    </Container>
  );
}
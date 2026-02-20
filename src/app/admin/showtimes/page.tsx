'use client';

import { useState } from 'react';
import { 
  Button, 
  Dialog, 
  Container, 
  Box, 
  CircularProgress 
} from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { showError, showSuccess } from '@/utils';
import { ShowtimeService } from '@/services';
import { 
  ShowtimeForm, 
  ShowtimesFilters, 
  ShowtimesTable, 
  ShowtimeDelete 
} from '@/components';
import { useShowtimesView } from '@/hooks/useShowtimeView';
import { CreateShowtimeDto, EnrichedShowtime } from '@/types';

export default function ShowtimesPage() {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [filters, setFilters] = useState({ movieId: "", date: "" });

  const { 
    showtimes, 
    totalCount, 
    moviesMap, 
    moviesList, 
    theaters, 
    load, 
    loading 
  } = useShowtimesView(page + 1, rowsPerPage);

  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedShowtime, setSelectedShowtime] = useState<EnrichedShowtime | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [showtimeToDelete, setShowtimeToDelete] = useState<EnrichedShowtime | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

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
    } catch (error: any) {
      showError(error.message || 'Error al eliminar');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PageHeader title="Administración de funciones" description="Gestiona el horario del cine" icon="🎬" />
        <Box display="flex" alignItems="center" gap={1}>
          <ShowtimesFilters 
            moviesfilter={moviesMap} 
            filters={filters} 
            onChange={(f) => { setFilters(f); setPage(0); }} 
          />
          <Button variant="contained" onClick={() => { setSelectedShowtime(null); setOpen(true); }}>
            Nueva Función
          </Button>
        </Box>
      </Box>

      <Box sx={{ position: 'relative' }}>
        {loading && (
          <Box sx={{ 
            position: 'absolute', top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', zIndex: 2 
          }}>
            <CircularProgress />
          </Box>
        )}
        
        <ShowtimesTable 
          showtimes={showtimes} 
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onEdit={(s) => { setSelectedShowtime(s as EnrichedShowtime); setOpen(true); }} 
          onDelete={(s) => { setShowtimeToDelete(s as EnrichedShowtime); setDeleteDialogOpen(true); }} 
        />
      </Box>

      {/* Modales */}
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
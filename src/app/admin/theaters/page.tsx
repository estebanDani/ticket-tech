"use client"
import { useState } from 'react'
import { Box, Container, Button, Dialog, CircularProgress } from '@mui/material'
import { useTheaters } from '@/hooks'
import { CreateTheaterDto, Theater } from '@/types'
import { theaterService } from '@/services'
import { showError, showSuccess, State } from '@/utils'
import PageHeader from '@/components/common/PageHeader'
import { CreateTheaterForm, TheaterFormDelete, TheaterTable } from '@/components'


export default function TheatersPage() {
  const { theaters,load ,loading} = useTheaters();
  const [open,setOpen] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [state,setState] = useState<State | null>(null);
  const [selectedTheater,setSelectedTheater] = useState<Theater | null>()

  const handleOpen = (theater:Theater |null, state:State) =>{
    setState(state)
    setSelectedTheater(theater)
    setOpen(true)
  }

  const handleCreate = async (data:CreateTheaterDto) =>{
    setSubmitting(true)

    try {
      await theaterService.create(data);
      setOpen(false)
      setSelectedTheater(null)
      setState(null)
      showSuccess("Sala creada Correctamente");
      await load();
    } catch {
      showError('Ocurrio un error a la hora de crear la sala')
    }finally{
      setSubmitting(false)
    }
  }

  const handleUpdate = async (data:CreateTheaterDto) =>{
    setSubmitting(true)
    
    if (!selectedTheater) {
      return;
    }

    try {
      await theaterService.update(selectedTheater.id,data);
      setOpen(false)
      setSelectedTheater(null)
      setState(null)
      showSuccess('Sala actualizada correctamente')
      await load();
    } catch {
      showError('Ocurrio un error a la hora de actualizar la sala')
    }finally{
      setSubmitting(false)
    }
  }

  const handleDelete = async () =>{
    setSubmitting(true)
    
    if (!selectedTheater) {
      return;
    }

    try {
      await theaterService.delete(selectedTheater.id);
      setOpen(false)
      setSelectedTheater(null)
      setState(null)
      showSuccess("Sala Eliminada Correctamente");
      await load();
    } catch {
      showError('Ocurrio un error a la hora de eliminar la sala')
    }finally{
      setSubmitting(false)
    }
  }
  if(loading){
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 6, minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }
  
  return (
    <Container maxWidth={false} sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PageHeader
          title="Administración de salas"
          description="Administra tus salas"
          icon="🎪"
        />
        <Button variant="contained" onClick={()=>handleOpen(null,State.CREATE)}>
          Nueva Sala
        </Button>
      </Box>
      <TheaterTable
        theaters={theaters}
        onEdit={handleOpen}
        onDelete={handleOpen}
      />

      <Dialog fullWidth maxWidth="md" disableRestoreFocus open={open} onClose={()=>setOpen(false)}>
        {state === 'create' && 
        <CreateTheaterForm
          initialData={selectedTheater}
          onSubmit={handleCreate}
          isLoading={submitting}
        />}
        {state === 'update' &&selectedTheater &&<>
        <CreateTheaterForm 
          initialData={selectedTheater}
          onSubmit={handleUpdate}
          isLoading={submitting}
        />
        </>}
        {state === 'delete'&& selectedTheater && 
        
        <TheaterFormDelete
          handleDelete={handleDelete}
          title={selectedTheater?.name}
          submit={submitting}
        />}
        
      </Dialog>
      
    </Container>
  )
}
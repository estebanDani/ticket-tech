"use client"
import { useState } from 'react'
import { Box, Container, Button, Dialog } from '@mui/material'
import { useTheaters } from '@/hooks'
import { CreateTheaterDto, Theater } from '@/types'
import { theaterService } from '@/services'
import { showError, showSuccess } from '@/utils'
import PageHeader from '@/components/common/PageHeader'
import { CreateTheaterForm, TheaterFormDelete, TheaterTable } from '@/components'

enum Estado {
  CREATE ='create',
  UPDATE ='update',
  DELETE ='delete'
}

export default function TheatersPage() {
  const { theaters,load } = useTheaters();
  const [open,setOpen] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [estado,setEstado] = useState<Estado | null>(null);
  const [selectedTheater,setSelectedTheater] = useState<Theater | null>()

  const handleOpen = (theater:Theater |null, estado:string) =>{
    if (estado === 'update') {
      setEstado(Estado.UPDATE)
    }else if (estado === 'delete'){
      setEstado(Estado.DELETE)
    }else{
      setEstado(Estado.CREATE)
    }
    setSelectedTheater(theater)
    setOpen(true)
  }

  const handleCreate = async (data:CreateTheaterDto) =>{
    setSubmitting(true)

    try {
      await theaterService.create(data);
      setOpen(false)
      setSelectedTheater(null)
      setEstado(null)
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
      setEstado(null)
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
      setEstado(null)
      showSuccess("Sala Eliminada Correctamente");
      await load();
    } catch {
      showError('Ocurrio un error a la hora de eliminar la sala')
    }finally{
      setSubmitting(false)
    }
  }

  
  return (
    <Container maxWidth={false} sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PageHeader
          title="Administración de salas"
          description="Administra tus salas"
          icon="🎪"
        />
        <Button variant="contained" onClick={()=>handleOpen(null,'create')}>
          Nueva Sala
        </Button>
      </Box>
      <TheaterTable
        theaters={theaters}
        onEdit={handleOpen}
        onDelete={handleOpen}
      />

      <Dialog fullWidth maxWidth="md" disableRestoreFocus open={open} onClose={()=>setOpen(false)}>
        {estado === 'create' && 
        <CreateTheaterForm
          initialData={selectedTheater}
          onSubmit={handleCreate}
          isLoading={submitting}
        />}
        {estado === 'update' &&selectedTheater &&<>
        <CreateTheaterForm 
          initialData={selectedTheater}
          onSubmit={handleUpdate}
          isLoading={submitting}
        />
        </>}
        {estado === 'delete'&& selectedTheater && 
        
        <TheaterFormDelete
          handleDelete={handleDelete}
          title={selectedTheater?.name}
          submit={submitting}
        />}
        
      </Dialog>
      
    </Container>
  )
}
"use client"
import { Box, Container, Button } from '@mui/material'
import PageHeader from '@/components/common/PageHeader'
import TheaterTable from './TheaterTable'
import { Theater } from '@/types'
import { useTheaters } from '@/hooks'

export default function TheatersPage() {
  const { theaters } = useTheaters();

  const handleOpenCreate = () => {
  }

  const handleEdit = (theater: Theater) => {
  }

  const handleDelete = (theater: Theater) => {
  }

  return (
    <Container maxWidth={false} sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PageHeader
          title="Administración de salas"
          description="Administra tus salas"
          icon="🎪"
        />
        <Button variant="contained" onClick={handleOpenCreate}>
          Nueva Sala
        </Button>
      </Box>
      <TheaterTable
        theaters={theaters}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  )
}
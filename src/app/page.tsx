import { Container, Typography, Box } from '@mui/material'
import { Header } from '../components/common/Header';

export default function Home() {
  return (
    <>
      <Header />
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" gutterBottom>
          🎬 Cinema Tickets
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Sistema de Reserva de Tickets
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Proyecto configurado exitosamente ✅
        </Typography>
      </Box>
    </Container>
    </>
  );
}
import { Container, Typography, Box } from '@mui/material'
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export default function Home() {
  useEffect(() => {
    getAllTheaters()
  }, [])
  const getAllTheaters = async () => {
    console.log('Fetching theaters...')
    try {
      const theaters = await theaterService.getAll()
      console.log('Theaters:', theaters)
    } catch (error) {
      console.error(error)
    }
  }
  const createTheater = async () => {
    console.log('Creating theater...')
    try {
      await theaterService.create({
        name: 'Sala 1',
        rows: 10,
        seatsPerRow: 10,
        amenities: ["Popcorn", "Coca-Cola", "Agua"]
      })
      alert('Theater created successfully!')
    } catch (error) {
      console.error(error)
      alert('Error creating theater')
    }
  }
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
      <Footer />
    </>
  );
}
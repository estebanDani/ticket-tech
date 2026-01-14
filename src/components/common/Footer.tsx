'use client';

import { Box, Container, Typography, Stack } from '@mui/material';

export function Footer(){
      const colorText = '#ffffff';
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#343434',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={10}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body2" sx={{color: colorText}}>
            © 2025 Cinema Tickets 
          </Typography>

          <Typography variant="body2" sx={{color: colorText}}>
            Contacto
          </Typography>

          <Typography variant="body2" sx={{color: colorText}}>
            📍 Ubicacion
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}


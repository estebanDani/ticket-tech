'use client';

import { Box, Container, Typography, Stack } from '@mui/material';

export function Footer(){
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.200',
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
          <Typography variant="body2" sx={{color: "text.secondary"}}>
            © 2025 Cinema Tickets 
          </Typography>

          <Typography variant="body2" sx={{color: "text.secondary"}}>
            Contacto
          </Typography>

          <Typography variant="body2" sx={{color: "text.secondary"}}>
            📍 Ubicacion
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}


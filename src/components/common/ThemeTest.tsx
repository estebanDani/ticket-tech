'use client'

import { Box, Typography, Button, Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export function ThemeTest() {
  const theme = useTheme()

  return (
    <Card sx={{ p: theme.spacing(3), maxWidth: 400 }}>
      <Typography variant="h1" color="primary">
        MUI Theme OK
      </Typography>

      <Typography sx={{ mt: theme.spacing(2) }}>
        Theme personalizado funcionando
      </Typography>

      <Box sx={{ mt: theme.spacing(2) }}>
        <Button variant="contained" color="secondary">
          Botón de prueba
        </Button>
      </Box>
    </Card>
  )
}

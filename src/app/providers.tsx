'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import { theme } from '@/theme/theme'
import { BookingProvider } from '@/contexts/BookingContext'
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <BookingProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </BookingProvider>
      </SnackbarProvider>
    </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

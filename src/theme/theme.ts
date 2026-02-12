import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    violet: Palette['primary']
  }
  interface PaletteOptions {
    violet?: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: "#cfdbfc",
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    warning: {
      light: "#fcf7e8",
      main: '#ff9800',
    },
    error: {
      light: '#ef5350',
      main: '#d32f2f',
      dark: '#c62828',
    },
    success: {
      light: '#e9fce9',
      main: '#2e7d32',
      dark: '#1b5e20',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    violet: {
      main: '#6700dc',
      light: '#d8b6f2',
      dark: '#2c0152',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
    grey: {
      100: '#EAEFEF',
      200: '#343434',
      300: '#333',
      400: '#444',
      800: '#888',
      900: '#aaa'

    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
})
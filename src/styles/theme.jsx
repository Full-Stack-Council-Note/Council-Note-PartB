import { createTheme } from '@mui/material/styles';


// Created a light theme with custom component styles
const CNtheme = createTheme({
  typography: {
    fontFamily: [
      
      'Segoe UI',
      'sans-serif',
      'Helvetica Neue',
      'Arial',
    ].join(','),
  },               
  palette: {
    primary: {
      main: '#FFD700',
    
      contrastText: '#FFD700',
    },
    secondary: {
      main: '#000080',
      light: '#FFD700',
      contrastText: '#FFD700',
    },
    background: {
      default: '#50C878',
    },
    action: {
      shadow: '#000080',
      hover: '#000080',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            borderRadius: 4,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#0000CD',
          borderRadius: 0, // Required to remove white pixel on corner of inputs
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: '#FFFF00',
          '&:hover': {
            textDecoration: 'none',
            color: '#FFD700',
          },
        },
      },
    },
  },
});

export default CNtheme;
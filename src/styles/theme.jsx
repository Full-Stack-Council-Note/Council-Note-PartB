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
      main: '#0000CD',
      light: '#FFD700',
      contrastText: '#FFD700',
    },
    background: {
      default: '#50C878',
    },
    action: {
      shadow: '#FF7070',
      hover: '#191970',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0000FF',
            borderRadius: 0, 
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
          color: '#0000FF',
          '&:hover': {
            textDecoration: 'none',
            color: '#0000CD',
          },
        },
      },
    },
  },
});

export default CNtheme;
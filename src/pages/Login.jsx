import { CssBaseline, GlobalStyles } from '@mui/material/';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

import CNtheme from '../styles/theme';
import LoginFm from "../components/LoginFm"


const Login = () => {
    return (
  
      <ThemeProvider theme={CNtheme}>
       <CssBaseline />
        <Container>
        <Typography variant="h4" textAlign= "center" color="secondary" paddingTop="90px">
         Welcome to CouncilNote
        </Typography>
         <LoginFm />
        </Container>  
      </ThemeProvider>
    );
  };
  
  export default Login;
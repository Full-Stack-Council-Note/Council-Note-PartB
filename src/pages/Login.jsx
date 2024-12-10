import { CssBaseline, GlobalStyles } from '@mui/material/';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
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
         <Typography variant="body1" textAlign= "center" paragraph>
             Don't have an account?{' '}
            <Link component={Link} to="/cn" underline="hover">
             Create an account here...
             </Link>
          </Typography>
        </Container>  
      </ThemeProvider>
    );
  };
  
  export default Login;
//import Login from './components/Login';
import { CssBaseline, GlobalStyles } from '@mui/material/';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import CNtheme from '../styles/theme';
import Register from "../components/Register"

const Home = () => {
  return (

    <ThemeProvider theme={CNtheme}>
     <CssBaseline />
      <Container>
      <Typography variant="h4" textAlign= "center" color="secondary" paddingTop="90px">
       Welcome to CouncilNote
      </Typography>
       <Register />
       <Typography variant="body1" textAlign= "center" paragraph>
             Already have an account?{' '}
            <Link component={Link} to="/auth/login" underline="hover">
             Login here...
             </Link>
        </Typography>
      </Container>  
    </ThemeProvider>
  );
};

export default Home;



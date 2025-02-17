import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material/';
import { Container, Typography, TextField, Button, Grid, Paper, Box, CircularProgress, Pagination } from '@mui/material';
import axios from "axios";
import {useEffect, useState} from "react";
import {
    Link,
    useLocation,
    useParams
} from "react-router-dom";
import.meta.env.REACT_APP_ENDPOINT
import CNtheme from '../styles/theme';
import ProfileFunction from "../components/ProfileFunction"

const Profile = () => {
    return (
  
      <ThemeProvider theme={CNtheme}>
       <CssBaseline />
        <Container >
        <Typography variant="h4" textAlign= "center" color="secondary" paddingTop="90px">
        MyProfile on CouncilNote
        </Typography>
        <ProfileFunction />
        </Container>  
      </ThemeProvider>
    );
  };
  
  export default Profile;
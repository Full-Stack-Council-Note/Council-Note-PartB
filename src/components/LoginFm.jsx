import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
//import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";

import { Link, useNavigate, useLocation } from 'react-router-dom';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import { Container } from "@mui/system";
//import { useState } from 'react';

// Custom hook to manage error state
function useError() {
  const [error, setError] = useState('');

  const clearError = () => setError('');
  
  return {
    error,
    setError,
    clearError,
  };
}

//export default useError;
//http://localhost:5173/auth/login

const LoginFm = () => {
    const {
       
        handleSubmit,
        //formState: { error },
    } = useForm();
    
    const navigate = useNavigate();
    import.meta.env.REACT_APP_ENDPOINT
    //const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // Add the useLoading and useError hooks
    //const { isLoading, setIsLoading } = useLoading();
    const { error, setError, clearError } = useError();
  
    // Add the handleSubmit function
    const onSubmit = async (data) => {
      //event.preventDefault();
      clearError();
  
      try {
        const res = await axios.post("http://localhost:5173/auth/loginfm", {email, password});
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("res", res.data.user._id);
        navigate(`/users/${res.data.user._id}`);
  
        //const { token } = response.data;
        //const { jwt } = response.data;
        if (!password) {
            setError('Please enter a password');
            return;
          }
  
      } catch (error) {
        // Check if the error has a response and a message from the server
        if (error.res && error.res.data && error.res.data.message) {
          setError(`Error: ${error.res.data.message}`);
        } else {
          setError('An error occurred while reaching the database, please try again.');
        }
      } 
    };
  
// const jwt = localStorage.getItem('jwt');
// const jwt = localStorage.setItem('jwt');
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 400, margin: "auto" }}
        >
            <Typography variant="h5" textAlign= "center" gutterBottom>
                Login:
            </Typography>
            <TextField
    
                label="Email"
                value={email}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <Typography color="error">Email is required</Typography>}

            <TextField
                
                label="Password"
                value={password}
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
                <Typography color="error">Password is required</Typography>
            )}
           
            <Button type="submit" variant="contained" color="secondary" fullWidth>
                Login
            </Button>
    
            <Typography variant="body1" paragraph>
             Don't have an account?{' '}
            <Link component={Link} to="/cn" underline="hover">
             Create an account here...
             </Link>
             </Typography>
        </Box>
    );
};

export default LoginFm;

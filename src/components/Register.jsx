import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
//import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
//const url = process.env.REACT_APP_ENDPOINT


function useError() {
    const [error, setError] = useState('');
  
    const clearError = () => setError('');
    
    return {
      error,
      setError,
      clearError,
    };
  }

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const url = import.meta.env.REACT_APP_ENDPOINT
    
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, setError, clearError } = useError();

    const onSubmit = async (data) => {
        clearError();
        try {
            await axios.post(`${url}/auth/register`, data, {
                withCredentials: true,
            });
            localStorage.setItem('token', JSON.stringify(data.access_token))
            //localStorage.setItem('token', JSON.stringify(data.data.token))
            navigate("/auth/");
            if (!password) {
                setError('Please enter a password');
                return;
              }
        } catch (err) {
            console.log(err.response.data.msg);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 400, margin: "auto" }}
        >

            <TextField
                {...register("fullname", { required: true })}
                label="Full Name"
                value={fullname}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setFullname(e.target.value)}
            />
            {error.fullname && 
                <Typography color="error">Full Name is required</Typography>}

            <TextField
                {...register("email", { required: true })}
                label="Email"
                value={email}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <Typography color="error">Email is required</Typography>}

            <TextField
                {...register("password", { required: true, minLength: 6 })}
                label="Password"
                value={password}
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
                <Typography color="error">
                    Password must be at least 6 characters
                </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
                <Typography color="secondary">
                Create Account
                </Typography>
            </Button>
            <Typography variant="body1" paragraph>
             Already have an account?{' '}
            <Link component={Link} to="/auth/" underline="hover">
             Login here...
             </Link>
             </Typography>
        </Box>
    );
};

export default Register;
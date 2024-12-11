import { Container, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import axios from "axios";
//import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
//const url = process.env.REACT_APP_ENDPOINT
import.meta.env.REACT_APP_ENDPOINT

const Register = () => {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = axios.post('http://localhost:8080/auth/register', data);
      setToken(response.data.token);
      console.log('User account created successfully', response.data);
      navigate("auth/login");
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server Error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" textAlign= "center" gutterBottom>
        Create an account:
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Fullname"
          name="fullname"
          value={data.fullname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          color="secondary"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          color="secondary"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          color="secondary"
          required
        />
           {error && <Typography color="error">{error}</Typography>}

            <Button type="submit" variant="contained" color="secondary" fullWidth>
                <Typography color="primary">
                Create Account
                </Typography>
            </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="Your account created successfully"
        onClose={() => setOpenSnackbar(false)}
      />
    </Container>
  );
};


export default Register;
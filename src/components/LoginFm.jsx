import { Container, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import axios from "axios";
//import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";

import { Link, useNavigate, useLocation } from 'react-router-dom';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import.meta.env.REACT_APP_ENDPOINT
//import { Container } from "@mui/system";

//http://localhost:5173/auth/login
// Custom hook to manage error state
const LoginFm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  //const [token, setToken] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/loginfm', data);
      //setToken(response.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/problems");
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server Error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" textAlign= "center" gutterBottom>
        Login:
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          fullWidth
          color="secondary"
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          fullWidth
          color="secondary"
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="secondary" fullWidth>
        <Typography color="primary">
                Log In
          </Typography>
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message="Logged in successfully"
        onClose={() => setOpenSnackbar(false)}
      />
    </Container>
  );
};

export default LoginFm;


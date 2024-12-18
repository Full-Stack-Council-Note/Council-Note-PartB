import { Container, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import axios from "axios";
//import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";

import { Link, useNavigate, useLocation } from 'react-router-dom';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import.meta.env.REACT_APP_ENDPOINT
//import { Container } from "@mui/system";
//const url = process.env.REACT_APP_ENDPOINT
//http://localhost:5173/auth/login
// Custom hook to manage error state
const LoginFm = () => {
  const [formData, setformData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  //const [token, setToken] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  ///const handleChange = (e) => {
   // const { name, value } = e.target;
   // setData({ ...data, [name]: value });
  //};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://council-note-backend-5cf218cede7a.herokuapp.com/auth/loginfm`, formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate("/problems");
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred during login');
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
          value={formData.email}
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
          value={formData.password}
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


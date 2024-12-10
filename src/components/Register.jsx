import { Container, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import axios from "axios";
//import React from "react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
//const url = process.env.REACT_APP_ENDPOINT
import.meta.env.REACT_APP_ENDPOINT

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4173/auth/register', formData);
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
          value={formData.fullname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
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
          margin="normal"
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
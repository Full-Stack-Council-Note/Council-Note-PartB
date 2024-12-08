import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
//import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate, useLocation } from 'react-router-dom';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Container } from "@mui/system";


const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:5173/auth/login", data);
            localStorage.setItem("token", res.data.access_token);
                                  //or users?
            localStorage.setItem("user", JSON.stringify(res.data.user));
            console.log("res", res.data.user._id);
            navigate(`/users/${res.data.user._id}`);
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
            <Typography variant="h5" textAlign= "center" gutterBottom>
                Login:
            </Typography>
            <TextField
                {...register("email", { required: true })}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            {errors.email && <Typography color="error">Email is required</Typography>}

            <TextField
                {...register("password", { required: true })}
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
            />
            {errors.password && (
                <Typography color="error">Password is required</Typography>
            )}

            <Button type="submit" variant="contained" color="secondary" fullWidth>
                Login
            </Button>
            <Typography variant="body1" paragraph>
             Don't have an account?{' '}
            <Link component={Link} to="/home" underline="hover">
             Create an account here...
             </Link>
             </Typography>
        </Box>
    );
};

export default Login;

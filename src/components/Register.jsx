import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:5173/auth/register", data, {
                withCredentials: true,
            });
            navigate("/auth/login");
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
            <Typography variant="h4" gutterBottom>
                Create Account
            </Typography>
            <TextField
                {...register("fullname", { required: true })}
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            {errors.fullname && 
                <Typography color="error">Full Name is required</Typography>}

            <TextField
                {...register("email", { required: true })}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            {errors.email && <Typography color="error">Email is required</Typography>}

            <TextField
                {...register("password", { required: true, minLength: 6 })}
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
            />
            {errors.password && (
                <Typography color="error">
                    Password must be at least 6 characters
                </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Account
            </Button>
            <Typography variant="body1" paragraph>
             Already have an account?{' '}
            <MuiLink component={ReactLink} to="/auth/login" underline="hover">
             Login here...
             </MuiLink>
             </Typography>
        </Box>
    );
};

export default Register;
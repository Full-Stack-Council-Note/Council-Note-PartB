//include button Back to ProbsNotices page
import {
    Email,
    LocationOn,
    People,
   
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Typography,
    CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfileContainer = styled(Box)(
    ({ theme }) => ({
        maxWidth: "800px",
        margin: "20px auto",
        padding: theme.spacing(3),
        backgroundcolor: "#fff",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
    }));

const Profile = () => {
    const { _id } = useParams();
    const [user, setUser] = useState(true);
    const [problemslist, setproblemslist] = useState([]);
    const [noticeslist, setnoticeslist] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                                             //or id ?
                    `http://localhost:8080/users/${_id}/profile`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    });
                setUser(res.data.user);
                // Assuming current user ID is in
                // localStorage or context
                const problemtitle
                    = JSON.parse(
                        localStorage.getItem("problems"))
                        ?._id;
                        setproblemslist(
                    res.data.user?.problems.includes(
                        problemtitle));

                const NoticeTitle
                        = JSON.parse(
                            localStorage.getItem("notices"))
                            ?._id;
                            setproblemslist(
                        res.data.user?.notices.includes(
                            NoticeTitle));
                } catch (error) {
                 console.error('Error fetching posts:', error);
                setLoading(false);
                }
        };

        fetchUser();
    }, [_id]);

    if (loading) return (<CircularProgress />);

    return user ? (
        <ProfileContainer>
            {/* Profile Header */}
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar src={user.avatar} alt={user?.fullname} 
                    sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item>
                    <Typography variant="h5"><People /> {user?.fullname}</Typography>
    
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Profile Details */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        <Email /> {user?.email}
                    </Typography>

                </Grid>
                {
                user?.about
                && (<Box><Typography variant="h6">About Me</Typography>
                    <Typography>{user?.about}</Typography>
                </Box>
                )}
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">{user?.problems?.length} Problem Posts:
                    </Typography>
                    <Typography variant="body1">
                        {user?.notices?.length} Notices Posts:
                    </Typography>
  
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

  
        </ProfileContainer>
                ) : (
        <Typography>Loading...</Typography>);
    };

export default Profile;
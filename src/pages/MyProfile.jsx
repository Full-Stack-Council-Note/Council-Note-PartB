//include button Back to ProbsNotices page
import {
    Email,
    LocationOn,
    People,
    PersonAdd,
    PersonRemove,
    Phone,
    Web
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Typography
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

const MyProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [problemslist, setproblemslist] = useState(false);
    const [noticeslist, setnoticeslist] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5173/users/${id}`,
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
            }
            catch (err) {
                console.log(err.response.data.msg);
            }
        };

        fetchUser();
    }, [id]);

    return user ? (
        <ProfileContainer>
            {/* Profile Header */}
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Avatar src={user.avatar} alt={user?.fullname} 
                    sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item>
                    <Typography variant="h5">{user?.fullname}</Typography>
    

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

export default MyProfile;
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
    Card,
    IconButton,
    Paper,
    Container,
    Typography,
    CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import.meta.env.REACT_APP_ENDPOINT
//const ProfileContainer = styled(Box)(
    //({ theme }) => ({
    //    maxWidth: "800px",
    //    margin: "20px auto",
    //    padding: theme.spacing(3),
    //    backgroundcolor: "#fff",
    //    borderRadius: theme.shape.borderRadius,
   //     boxShadow: theme.shadows[3],
   // }));

const ProfileFunction = () => {
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
                                                                        //or id ?  user?._id
                    `https://council-note-backend-5cf218cede7a.herokuapp.com/users/${_id}/profile`,
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
                            setnoticeslist(
                        res.data.user?.notices.includes(
                            NoticeTitle));
                } catch (error) {
                 console.error('Error fetching user profile:', error);
                setLoading(false);
                }
        };

        fetchUser();
    }, [_id]);

    //this bit needed?
    const [profilephoto, setprofilephoto] = useState(true)
    const [updateuser, setUpdateUser] = useState({ about: '', profilephoto});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateUser({ ...updateuser, [name]: value });
      };

    useEffect(() => {
        const handleSubmit = async () => {
    //or like this?  axios.patch(`http://localhost:8080/users/${_id}/profile/updateUser`, updateuser)
            try {    
                const res = await axios.patch(
                                             //or id ? /:id/profile/updateUser                       
                    `https://council-note-backend-5cf218cede7a.herokuapp.com/users/${_id}/profile/updateUser`,
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
                 console.error('Error updating user profile:', error);
                setLoading(false);
                }
        };

        handleSubmit();
    }, [_id]);

    if (loading) return (<CircularProgress />);

    return user ? (
        <Container>
            {/* Profile Header */}
            <Grid container sx={{ bgcolor: '#DCDCDC', borderRadius: 3, justifyContent: "center",  alignItems: "center" }}>
            <Typography color="secondary" variant="h4" sx={{ mx: 1 }} gutterBottom>
               My Profile
            </Typography>
                <Grid item key={user?._id}>
                    <Typography variant="h5"><People /> {user?.fullname}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            <Box mt={1} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
                {user?.profilephoto}
            </Box>
            <form onSubmit={handleSubmit}>
            <Box mt={1} sx={{ bgcolor: '#DCDCDC' }}>
            <Typography mb={2} sx={{ mx: 1 }} color="secondary" variant="h6">
             Upload a profile photo - JPG, JPEG and PNG accepted:
          </Typography>
            <TextField
            type="file"
            variant="outlined"
            color="secondary"
            inputProps={{ accept: 'image/jpeg'|| 'image/jpg'|| 'image/png' }}
            sx={{ mx: 1, bgcolor: '#fff', width: 400 }}
            margin="normal"
            />
          <Button 
          sx={{ mr: 1, mx: 1, height: 65, width: 400 }} 
          variant="contained" 
          color="primary" 
          type="submit"
          value={updateuser.user?.profilephoto}
          onChange={handleInputChange}
          >
          <Typography color="secondary">
           Upload Photo
          </Typography>          
          </Button>
           </Box>
           </form>
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
                <form onSubmit={handleSubmit}>
                <TextField
                 label="Update your about info"
                 name="updateabout"
                 value={updateuser.user?.about}
                 onChange={handleInputChange}
                 margin="normal"
                 sx={{ bgcolor: '#fff'}}           
                 color="secondary"
                
                 />
                </form>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">{user?.problems?.length} Problem Posts:
                    </Typography>
                    <Typography variant="body1">
                        {user?.notices?.length} Notices Posts:
                    </Typography>
  
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

  
        </Container>
                ) : (
        <Typography>Loading...</Typography>);
    };

export default ProfileFunction;
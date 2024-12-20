import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Typography, TextField, Button, Grid, Paper, Box, FormControlLabel, FormControl, Checkbox, Select, InputLabel, MenuItem, CircularProgress, Pagination } from '@mui/material';
import axios from "axios";
import {useEffect, useState} from "react";
import {
    Link,
    useLocation,
    useParams
} from "react-router-dom";
import.meta.env.REACT_APP_ENDPOINT
//const url = process.env.REACT_APP_ENDPOINT

export default function Problems() {
    const { _id } = useParams();
    //const { search } = useLocation();
   
    const [notices, setNotices] = useState([]);
    const [DateAdded, setDateAdded]= useState(true)
    const [user, setUser] = useState(true);
    const [NoticePhoto, setNoticePhoto] = useState(true)
    const [NoticeComments, setNoticeComments] = useState([]);
    const [newNotice, setNewNotice] = useState({ NoticeTitle: '', NoticeDescription: '', user, DateAdded, NoticePhoto, NoticeComments });

    const [newNoticeComments, setNewNoticeComments] = useState({content:"", user, DateAdded});
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;
    const noticesSearch = new URLSearchParams(search).get("notices/filter");
    
// Ensure notices is always an array (even if it’s empty). I put this in because I was getting error messages in the console log something like "properties of notices map not recognised"
// and putting this in made that error message go away for now. Not needed now I think
    //const Notices = notices || [];
  // Fetch posts with pagination and search
  const fetchPosts = (page, postsPerPage, search) => {
    //e.preventDefault();
    setLoading(true);
  
    axios.get(`https://council-note-backend-5cf218cede7a.herokuapp.com/notices`, {
      params: { page, postsPerPage, search }
    })
    .then((response) => {
    //setUrgentOrSoon(response.data.UrgentOrSoon);

    setNotices( response.data.notices);
    setNoticeComments( response.data.NoticeComments)
    // or? setNoticeComments(response.data.notices.NoticeComments)
    setUser( response.data.user)
    setDateAdded(response.data.DateAdded)
    setNoticePhoto(response.data.NoticePhoto)
    setTotalPosts( response.data.totalPosts);
    setTotalPages(response.data.totalPages);
    setLoading(false);
  })
    .catch((error) => {
    console.error('Error fetching notices:', error);
  });
};

  useEffect(() => {
    fetchPosts(page, postsPerPage, search);
  }, [page, postsPerPage, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);  // Reset to the first page whenever search term changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
    setNewNoticeComments({ ... newNoticeComments, [name]: value });                         
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios.post(`https://council-note-backend-5cf218cede7a.herokuapp.com/notices/addNotice`, newNotice)
      .then((response) => {
        setNotices([...notices, response.data]);
        setNewNotice({ NoticeTitle: '', NoticeDescription: '', user, DateAdded, NoticePhoto, NoticeComments });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error adding this notice:', error);
        setIsSubmitting(false);
      });
  };

  if (loading) return (<CircularProgress />);

  return (
    <Container >

      {/* Display all notices posts */}
      <Grid container mt={9} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}  sx={{ bgcolor: '#DCDCDC', borderRadius: 3, justifyContent: "center",  alignItems: "center" }}>
        <Typography color="secondary" variant="h4" sx={{ mx: 1 }} gutterBottom>
               Notices:
          </Typography>
      {/* Check if notices is an array before calling .map */}
      {Array.isArray(notices) && notices.length > 0 ? (
       notices.map((notices) => (         
          <Grid item xs={12} key={notices._id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5">{notices.NoticeTitle}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {notices.NoticeDescription}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {notices.user}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {notices.DateAdded}
              </Typography>
              <Box mt={1} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
                {notices.NoticePhoto}
              </Box>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {notices.NoticeComments}
              </Typography>
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography>No notices available.</Typography>
      )
      }        
      </Grid>

      {/* Form to add new notice */}
      <Box mt={2} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
        <Typography variant="h4"  color="secondary" textAlign= "center" gutterBottom>
          Add a Notice
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter a title for the Notice"
            name="NoticeTitle"
            value={newNotice.NoticeTitle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            sx={{ bgcolor: '#fff'}}           
            color="secondary"
            required
          />
          <TextField
            label="Enter a description for the notice"
            name="NoticeDescription"
            value={newNotice.NoticeDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            sx={{ bgcolor: '#fff' }}          
            color="secondary"
            multiline
            rows={4}
            required
          />
             
            <Box mt={1} sx={{ bgcolor: '#DCDCDC' }}>
            <Typography mb={2} sx={{ mx: 1 }} color="secondary" variant="h6">
             Upload a photo for the notice - JPG, JPEG and PNG accepted:
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
          value={newNotice.NoticePhoto}
          onChange={handleInputChange}
          >
          <Typography color="secondary">
           Upload Photo
          </Typography>          
          </Button>
           </Box>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
            mt={3}
            sx={{ height: 60, mx: 2 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Notice'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
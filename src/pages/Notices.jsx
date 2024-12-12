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


export default function Problems() {
    const { _id } = useParams();
    //const { search } = useLocation();
   
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState({ NoticeTitle: '', NoticeDescription: '', user, DateAdded, NoticePhoto, NoticeComments });
    const [NoticeComments, setNoticeComments] = useState([]);
    const [newNoticeComments, setNewNoticeComments] = useState({content:"", user, DateAdded});
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;
    const noticesSearch = new URLSearchParams(search).get("notices/filter");
    
    

    //const Problems = ({ problems }) => {
      // Ensure problems is always an array (even if it’s empty)
    const safeNotices = notices || [];
  // Fetch posts with pagination and search
    const fetchPosts = async (page, search) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/notices', {
        params: { page, limit: postsPerPage, search }
      });

      setNotices(response.data.notices);
      setNoticeComments(response.data.NoticeComments)
      // or? setNoticeComments(response.data.notices.NoticeComments)
      setTotalPosts(response.data.totalPosts);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => {
    fetchPosts(page, search);
  }, [page, search]);

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
    axios.post('http://localhost:8080/notices/addNotice', newNotice)
      .then((response) => {
        setNotices([...notices, response.data]);
        setNewNotice({ NoticeTitle: '', NoticeDescription: '', NoticePhoto });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error adding this notice:', error);
        setIsSubmitting(false);
      });
  };

  if (loading) return (<CircularProgress />);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
       Notices:
      </Typography>

      {/* Display all blog posts */}
      <Grid container spacing={3}>
        {safeNotices.map((notices) => (
          <Grid item xs={12} sm={6} md={4} key={notices._id}>
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
        ))}
      </Grid>

      {/* Form to create new post */}
      <Box mt={5} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
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
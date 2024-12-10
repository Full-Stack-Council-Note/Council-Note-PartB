import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Typography, TextField, Button, Grid, Paper, Box, CircularProgress, Pagination } from '@mui/material';
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
   
    const [problems, setProblems] = useState([]);
    const [newProblem, setNewProblem] = useState({ problemtitle: '', problemdescription: '' });
    const [newComment, setNewComment] = useState({content:""});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 5;
    const problemsSearch = new URLSearchParams(search).get("problems/filter");

    const Problems = ({ problems }) => {
      // Ensure problems is always an array (even if it’s empty)
      const safeProblems = problems || [];
  // Fetch posts with pagination and search
    const fetchPosts = async (page, search) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4173/problems', {
        params: { page, limit: postsPerPage, search }
      });
      .then(response => {
      setProblems(response.data.problems);
      setTotalPosts(response.data.totalPosts);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    })
    } catch (error) {
      console.error('Error fetching problem posts:', error);
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
    setNewProblem({ ...newProblem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios.post('http://localhost:4173/problems', newProblem)
      .then((response) => {
        setProblems([...problems, response.data]);
        setNewProblem({ problemtitle: '', problemdescription: '' });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error adding problem post:', error);
        setIsSubmitting(false);
      });
  };

  if (loading) return (<CircularProgress />);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
       Problems:
      </Typography>

      {/* Display all blog posts */}
      <Grid container spacing={3}>
        {safeProblems.map((problems) => (
          <Grid item xs={12} sm={6} md={4} key={problems._id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5">{problems.problemtitle}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problems.problemdescription}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Form to create new post */}
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Add a Problem:
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter a Problem Title"
            name="problemtitle"
            value={newProblem.problemtitle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Enter a Problem Description"
            name="problemdescription"
            value={newProblem.problemdescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
            sx={{ marginTop: 2 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Post'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
}

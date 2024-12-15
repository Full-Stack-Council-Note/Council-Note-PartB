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

import UrgentSymbol from '../assets/URGENT-red-dot.svg';
import SoonSymbol from '../assets/SOON-yellow-dot.svg';

export default function Problems() {
    const { _id } = useParams();
    //const { search } = useLocation();
   
    const [problems, setProblems] = useState([]);
    //const [UrgentOrSoon, setUrgentOrSoon] = useState('Urgent', 'Soon');
    const [DateAdded, setDateAdded]= useState(true)
    const [user, setUser] = useState(true);
    const [IsResolved, setIsResolved]= useState(false);
    const [problemphoto, setproblemhoto] = useState(true)
    const [ProblemComments, setProblemComments] = useState([]);
    const [newProblem, setNewProblem] = useState({ problemtitle: '', problemdescription: '', user, DateAdded, UrgentOrSoon: '', IsResolved, problemphoto, ProblemComments });
   
    const [newProblemComments, setNewProblemComments] = useState({content:"", user, DateAdded});

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;
    const problemsSearch = new URLSearchParams(search).get("problems/filter");
    
    //const Problems = ({ problems }) => {
      // Ensure problems is always an array (even if it’s empty)
    const safeProblems = problems || [];
  // Fetch posts with pagination and search
    const fetchPosts = async (page, search) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/problems', {
        params: { page, limit: postsPerPage, search }
      });
      
      //setUrgentOrSoon(response.data.UrgentOrSoon);

      setProblems(response.data.problems);
      setProblemComments(response.data.ProblemComments)
      // or? setNoticeComments(response.data.notices.NoticeComments)
      setTotalPosts(response.data.totalPosts);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    
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
    setIsResolved(e.target.checked);
    setNewProblemComments({ ... newProblemComments, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios.post('http://localhost:8080/problems/addProblem', newProblem)
      .then((response) => {
        setProblems([...problems, response.data]);
        setNewProblem({ problemtitle: '', problemdescription: '', UrgentOrSoon: '', IsResolved, problemphoto });
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
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problems.user._id}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problems.DateAdded}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problems.UrgentOrSoon}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problems.IsResolved}
              </Typography>
              <Box mt={1} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
                {problems.problemphoto}
              </Box>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problems.ProblemComments}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Form to create new post */}
      <Box mt={5} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
        <Typography variant="h4"  color="secondary" textAlign= "center" gutterBottom>
          Add a Problem
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter a title for the Problem"
            name="problemtitle"
            value={newProblem.problemtitle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            sx={{ bgcolor: '#fff'}}           
            color="secondary"
            required
          />
          <TextField
            label="Enter a description of Problem"
            name="problemdescription"
            value={newProblem.problemdescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            sx={{ bgcolor: '#fff' }}          
            color="secondary"
            multiline
            rows={4}
            required
          />
          <FormControl color="secondary" sx={{ mr: 1, mx: 1, bgcolor: '#fff', width: 500 }}>
          <InputLabel sx={{ bgcolor: '#fff'}} id="demo-simple-select-label">Please select if the problem is Urgent or needs attention Soon:</InputLabel>
          <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           value={newProblem.UrgentOrSoon}
           label="UrgentOrSoon"
           sx={{ bgcolor: '#fff', width: 500 }}
           onChange={handleInputChange}
           >
           <MenuItem sx={{ color: '#FF0000' }} value={'N/A'}>N/A</MenuItem>
           <MenuItem sx={{ color: '#FF0000' }} value={'Urgent'}>Urgent  -<img src={UrgentSymbol} alt="UrgentSymbol" height={20} width={20} sx={{ flexGrow: 1 }}/></MenuItem>
           <MenuItem sx={{ color: '#FF0000' }} value={'Soon'}>Soon  -<img src={SoonSymbol} alt="SoonSymbol" height={20} width={20} sx={{ flexGrow: 1 }}/></MenuItem>
           
           </Select>
           </FormControl>
           <Box mt={2} sx={{ mx: 1, bgcolor: '#DCDCDC'}}>
            <Typography sx={{ mx: 1 }} color="secondary" variant="h6" gutterBottom>
            Select if the problem is resolved:
           </Typography>
            <FormControlLabel
            value={newProblem.IsResolved}
            control={<Checkbox sx={{ mx: 1 }} color="secondary" checked={true} onChange={handleInputChange} />}
            
             />
              </Box>
            <Box mt={1} sx={{ bgcolor: '#DCDCDC' }}>
            <Typography mb={2} sx={{ mx: 1 }} color="secondary" variant="h6">
             Upload a photo of the problem - JPG, JPEG and PNG accepted:
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
           value={newProblem.problemphoto}
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
            {isSubmitting ? 'Submitting...' : 'Submit Problem'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};


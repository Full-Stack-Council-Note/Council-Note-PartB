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

import UrgentSymbol from '../assets/URGENT-red-dot.svg';
import SoonSymbol from '../assets/SOON-yellow-dot.svg';

export default function Problems() {
   const [error, setError] = useState(null);
    const { _id  } = useParams();
    //const { search } = useLocation();
          //or problemData, setProblemData
    const [UrgentOrSoon, setUrgentOrSoon] = useState('Urgent', 'Soon', 'N/A');
    const [DateAdded, setDateAdded]= useState(true)
    const [user, setUser] = useState(true);
    const [IsResolved, setIsResolved]= useState(false);
    const [problemphoto, setproblemhoto] = useState(true)
    const [ProblemComments, setProblemComments] = useState([]);
    const [problems, setProblems] = useState([]);
    //const [problemtitle, setProblemTitle] = useState('');
   
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

// Ensure problems is always an array (even if it’s empty). I put this in because I was getting error messages in the console log something like "properties of problems map not recognised"
// and putting this in made that error message go away for now. Not needed now I think
    //const Problems = problems || [];
  // Fetch posts with pagination and search
    useEffect(() => {
      //e.preventDefault();   
      fetch('https://council-note-backend-5cf218cede7a.herokuapp.com/problems', problems)
      .then(response => response.json())
      .then((data) => {
      //setUrgentOrSoon(response.data.UrgentOrSoon);

      setProblems( data.problems || []);
      //setProblemTitle( data.problemtitle);
      //setProblemComments(data.ProblemComments)
      //setProblemComments([...ProblemComments, data])
      //setUser( data.user)
      //setDateAdded(data.DateAdded)
      //setproblemhoto(data.problemphoto)     
      setPage(data.problems)
      setTotalPosts( data.problems);
      setTotalPages(data.problems);
      setLoading(false);
    })
    .catch(error => {
      console.log('error fetching problem posts', error)
      // update the error state
      setError(error)
    })
  }, []);

  //useEffect(() => {
    //fetchPosts(page, postsPerPage, search);
  //}, [page, postsPerPage, search ]);

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
    axios.post(`https://council-note-backend-5cf218cede7a.herokuapp.com/problems/addProblem`, newProblem)
      .then((response) => {
        setProblems([...problems, response.data]);
        setNewProblem({ problemtitle: '', problemdescription: '', user, DateAdded, UrgentOrSoon: '', IsResolved, problemphoto, ProblemComments });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error adding problem post:', error);
        setIsSubmitting(false);
      });
  };

  if (loading) return (<CircularProgress />);

  return (
    <Container >

      {/* Display all problem posts */}
      <Grid container mt={9} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}  sx={{ bgcolor: '#DCDCDC', borderRadius: 3, justifyContent: "center",  alignItems: "center" }}>
      <Typography color="secondary" variant="h4" sx={{ mx: 1 }} gutterBottom>
       Problems:
      </Typography>
      {/* Check if problems is an array before calling .map */}
      {Array.isArray(problems) && problems.length > 0 ? (
       problems.map((problem) => (
          <Grid item xs={12} key={problem._id }>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5">{problem.problemtitle}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problem.problemdescription}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problem.user}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problem.DateAdded}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problem.UrgentOrSoon}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problem.IsResolved}
              </Typography>
              <Box mt={1} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
                {problem.problemphoto}
              </Box>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {problem.ProblemComments}
              </Typography>
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography>No problems available.</Typography>
      )
      }
      </Grid>

      {/* Form to add new problem post */}
      <Box mt={2} sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
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


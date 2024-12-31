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
  
    const { _id  } = useParams();
    //const { search } = useLocation();
          //or problemData, setProblemData
   //not sure if I need to define or "set" these here also, was giving me "undefined" in console log for a while
    const [UrgentOrSoon, setUrgentOrSoon] = useState('Urgent', 'Soon', 'N/A');
    const [DateAdded, setDateAdded]= useState(true)
    const [user, setUser] = useState(true);
    const [IsResolved, setIsResolved]= useState(false);
    const [problemphoto, setProblemPhoto] = useState(true)
    const [ProblemComments, setProblemComments] = useState([]);
    const [data, setData] = useState([]);
    const [problems, setProblems] = useState([]);
    //const [problemtitle, setProblemTitle] = useState('');
   
    const [newProblem, setNewProblem] = useState({
      problemtitle: '',
      problemdescription: '',
      user: true,
      DateAdded: true,
      UrgentOrSoon: '',
      IsResolved: false,
      problemphoto: true,
      ProblemComments: []
    });
   
    const [newProblemComments, setNewProblemComments] = useState({content:"", user: true, DateAdded: true});

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const [filteredProblems, setFilteredProblems] = useState([]);
    //const [apiProblems, setApiProblems] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 10;
    //const problemsSearch = new URLSearchParams(search).get("problems/filter");

 // Fetch posts with pagination and search (potentially those also)
 useEffect(() => {
  
  fetch('/problems.json')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      setProblems(data.problems); // Set problems data to state
      //setApiProducts(data.problems)
      //setFilteredProducts(data.problems)
      setLoading(false); // Set loading to false
    })
    .catch(error => {
      setError('Error fetching problems');
      setLoading(false);
    });
}, []);

  //useEffect(() => {
    //fetchPosts(page, postsPerPage, search);
  //}, [page, postsPerPage, search ]);
 // const handleSearchChange = (e) => {
 //   const searchTerm = e.target.value;
 //   setSearch(searchTerm)
 //   onChangeCallback && onChangeCallback(inputValue)
 //   if(e.target.value===""){
 //     setSearchShow(false);
 //   }
  //  else {
  //    setSearchShow(true);
 ///   }
   
  //    const filteredItems = apiProblems.filter((problems) =>
   //     problems.problemtitle.toLowerCase().includes(searchTerm.toLowerCase())
        
    //  );
    
   //   setFilteredProblems(filteredItems);
    //  setPage(1);
   // }

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
        setData([response.data])
        setNewProblem({ problemtitle: '', problemdescription: '', user: true, DateAdded: true, UrgentOrSoon: '', IsResolved: false, problemphoto: true, ProblemComments: [] });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error adding problem post:', error);
        setIsSubmitting(false);
      });
  };

  if (loading) return (<CircularProgress />);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
          <Grid xs={12} key={problem._id }>
            <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography color="secondary" variant="h5" sx={{ marginTop: 1 }}>
            <strong>{problem.problemtitle}</strong>
            </Typography>
              <Typography variant="h5" sx={{ marginTop: 1 }}>
              Description: {problem.problemdescription}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
              Added By: {problem.user}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
              Urgency: {problem.UrgentOrSoon}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
              Resolved Status: {problem.IsResolved ? true : false}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
              Added On: {new Date(problem.DateAdded).toLocaleString()}
              </Typography>
              <Typography variant="h5" sx={{ marginTop: 1 }}>
              <strong>Comments:</strong>
              </Typography>
              {problem.ProblemComments.length > 0 ? (
                <ul>
                  {problem.ProblemComments.map(comment => (
                    <li key={comment._id}>
                    <Typography variant="h5" sx={{ marginTop: 1 }}><strong>{comment.user}:</strong> {comment.content}</Typography>
                    <Typography variant="h6" sx={{ marginTop: 1 }}>Added on: {new Date(comment.DateAdded).toLocaleString()}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="h5" sx={{ marginTop: 1 }}>No comments yet</Typography>
              )}

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
       <Typography variant="h4" color="secondary" textAlign="center" gutterBottom>
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
      <FormControl color="secondary" name="UrgentOrSoon" sx={{ mr: 1, mx: 1, bgcolor: '#fff', width: 500 }}>
      <InputLabel sx={{ bgcolor: '#fff'}} name="UrgentOrSoon" label="Please select if the problem is Urgent or needs attention Soon:">
      Please select if the problem is Urgent or needs attention Soon:
      </InputLabel> 
      <Select
        name="UrgentOrSoon"
        value={newProblem.UrgentOrSoon}
        label="Select Urgent or Soon"
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
        name="IsResolved"
        value={newProblem.IsResolved}
        control={<Checkbox sx={{ mx: 1 }} color="secondary" checked={true} onChange={handleInputChange} />}
        label="Is Now Resolved" // Add label here if needed
       />
      </Box>
      <Box mt={1} sx={{ bgcolor: '#DCDCDC' }}>
      <Typography mb={2} sx={{ mx: 1 }} color="secondary" variant="h6">
        Upload a photo of the problem - JPG, JPEG and PNG accepted:
      </Typography>
       <TextField
        type="file"
        name="problemphoto"
        variant="outlined"
        color="secondary"
        inputProps={{ accept: 'image/jpeg, image/jpg, image/png' }} // Fixed the accept attribute
        sx={{ mx: 1, bgcolor: '#fff', width: 400 }}
        margin="normal"
        
       />
       <Button 
        sx={{ mr: 1, mx: 1, height: 65, width: 400 }} 
        variant="contained" 
        color="primary" 
        type="submit"
        name="problemphoto"
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
      name="submitProblem"
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


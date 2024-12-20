import { useState, useEffect } from 'react'
import { Container, Typography, TextField, Button, Grid, Paper, Box, Select, InputLabel, MenuItem, CircularProgress, Pagination } from '@mui/material';
import.meta.env.REACT_APP_ENDPOINT

const SearchPeopleFunction = ({onChangeCallback }) => {
 const [users, setUsers] = useState([])
 const [apiUsers,  setApiUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [filteredUsers, setFilteredUsers] = useState([]);
 const [searchUser, setSearchUser] = useState("");
 const [searchShow, setSearchShow] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();

 useEffect(() => {
  fetch('https://council-note-backend-5cf218cede7a.herokuapp.com/users/searchpeople', users)
    .then(response => response.json())
    .then(data => {
      setApiUsers(data.users)
      setFilteredUsers(data.users)
    })
    .catch(err => {
      console.log(err)
      // update the error state
      setError(err)
    })
    .finally(() => {
      // wether we sucessfully get the users or not, 
      // we update the loading state
      setLoading(false)
    })
}, [])
}

const handleInputChange = e => {
  const searchTerm = e.target.value;
  setSearchItem(searchTerm)
  onChangeCallback && onChangeCallback(inputValue)

  if(e.target.value===""){
    setSearchShow(false);
  }
  else {
    setSearchShow(true);
  }

 
    const filteredUsers = apiUsers.filter((users) =>
        users.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      
    );
  
    setFilteredUsers(filteredUsers);
  }


function searchList() {
  if (searchShow) {
    return (
      <>
        {loading && <p>Loading...</p>}
        {error && <p>There was an error loading the items</p>}
        {!loading && !error && filteredUsers.length === 0
          ? <p>No products found</p>
          : <ul>
            {filteredUsers.map(user => <li key={user.id}>{user.fullname}: Email: {user.email} About: {user.about}</li>)}
          </ul>
        }
      </>
                                             //or _id?
    )
  }
}

return (
<Container margin="normal" sx={{  bgcolor: '#DCDCDC', borderRadius: 3 }}>
<Box mt={5} sx={{ mx:15, bgcolor: '#DCDCDC', borderRadius: 3 }}>
    <form onSubmit={handleSubmit}>
          <TextField
            label="Type a full name to search..."
            name="searchUser"
            value={searchUser}
            onChange={handleInputChange}
            sx={{ bgcolor: '#fff', mt:1, mr: 3, width:380}}           
            color="secondary"
  
          />
            <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ width: 200, height: 62, mx:8 }}
          >
         <Typography color="primary">
           Search People
          </Typography> 
          </Button>
        </form>
        <Box mt={4} sx={{ bgcolor: '#DCDCDC', borderRadius: 3, justifyContent: "center", alignItems: "center" }}>
    {searchList()}
    </Box>
  </Box>
</Container>
 );
}

export default SearchPeopleFunction
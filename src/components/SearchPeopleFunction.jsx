import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from "axios";
import.meta.env.REACT_APP_ENDPOINT

const SearchPeopleFunction = ({ onChangeCallback }) => {
  const [users, setUsers] = useState([]);
  const [apiUsers, setApiUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  // Define handleSubmit outside of useEffect
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();  
    }  // Prevent the default form submission behavior
    

    try {
      const response = await axios.get('https://council-note-backend-5cf218cede7a.herokuapp.com/users/searchpeople', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: { searchUser }, // Send the search query as part of the request
      });

      const data = response.data;
      setApiUsers(data.users);
      setFilteredUsers(data.users);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optionally load users on component mount
     handleSubmit(); 
  }, []); // Empty dependency array means this effect runs once after initial render

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchUser(searchTerm);

    onChangeCallback && onChangeCallback(searchTerm);

    if (searchTerm === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }

    const filteredUsers = apiUsers.filter((user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredUsers);
  };

  function searchList() {
    if (searchShow) {
      return (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>*User profiles unavailable*</p>}
          {!loading && !error && filteredUsers.length === 0
            ? <p>*User profiles unavailable*</p>
            : <ul>
                {filteredUsers.map(user => (
                  <li key={user._id}>
                    {user.fullname}: Email: {user.email} About: {user.about}
                  </li>
                ))}
              </ul>
          }
        </>
      );
    }
  }

  return (
    <Container margin="normal" sx={{ bgcolor: '#DCDCDC', borderRadius: 3 }}>
      <Box mt={5} sx={{ mx: 15, bgcolor: '#DCDCDC', borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Type a full name to search..."
            name="searchUser"
            value={searchUser}
            onChange={handleInputChange}
            sx={{ bgcolor: '#fff', mt: 1, mr: 3, width: 380 }}
            color="secondary"
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ width: 200, height: 62, mx: 8 }}
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

export default SearchPeopleFunction;

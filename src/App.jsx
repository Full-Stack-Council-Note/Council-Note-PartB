import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material/';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import CNtheme from './styles/theme';
import Navbar from './components/Navbar'; // Import Navbar
//import Header from "./components/Header";
import CN from './pages/CN';
//import Register from './components/Register';
import Login from './pages/Login';
//import LoginForm from './components/LoginForm';
import MyProfile from './pages/MyProfile';
//import SearchUsers from './pages/SearchUsers';
//import Problems from './pages/Problems';
//import Notices from './pages/Notices';
//import Redirect from './components/Redirect';
//import ProblemForm from './components/ProblemForm';
//import NoticeForm from './components/NoticeForm';
//import UpdateUser from './components/UpdateUser';

const App = () => {
  return (
    <Router>
      {/* Render Navbar on all pages */}
      <ThemeProvider theme={CNtheme}>
      {/* CssBaseline is used to remove any default CSS styling */}
      <CssBaseline />
      {/* Overrides the background colour and replaces it with theme colour so all pages have theming */}
      <GlobalStyles styles={{ html: { backgroundcolor: CNtheme.palette.background.default } }} />
      
      <Navbar />
      
      {/* The Routes are defined here */}
      
        <Routes>
          <Route path="/cn" element={<CN />} />
          
          <Route path="/auth/" element={<Login />} />
        
          <Route path="/users/:id/" element={<MyProfile />} />
       
        </Routes>
        </ThemeProvider>
      
    </Router>
  );
};

export default App;
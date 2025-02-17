
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Container, Avatar, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";

                                                            //add login or Log In?
const pages = ['Problems', 'Notices', 'Profile', 'SearchPeople'];
const reversedPages = [...pages].reverse(); 
const settings = ['Logout']

import appLogo from '../assets/CN-logoPNG.png';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  //const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
//or access_token?  access_token
  const jwt = localStorage.getItem('jwt');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  //const handleOpenUserMenu = (event) => {
   // setAnchorElUser(event.currentTarget);
  //};

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //const handleCloseUserMenu = () => {
  //  setAnchorElUser(null);
  //};

  const handleNavClick = (page) => {
    if (page === 'Home') {
      navigate('/'); 
    }
    else if (page === 'Profile') {
      navigate('/profile'); 
    }
    else if (page === 'SearchPeople') {
      navigate('/searchpeople'); 
    }
    else {
      navigate('/' + page.toLowerCase().replace('é', 'e')); 
    }

    handleCloseNavMenu();
  };

  const handleNavButtonClick = (navButton) => {
    if (navButton === 'Login') {
     return  navigate('/auth/login');
    
    }
  }

  const handleSettingsClick = (setting) => {
    if (setting === 'Logout') {
      localStorage.removeItem('jwt');
      navigate('/auth/logout');
    } else  {
      navigate('/home'); 
    }
   // handleCloseUserMenu();
  };
  //handleSettingsClick()
  const getCurrentPage = () => {
    const path = location.pathname.substring(1); // Remove leading '/'
    if (path === '') return 'cn';
    return path.toLowerCase().replace('é', 'e').replace('-', ' '); // Replace dashes with spaces and handle special characters
  };
   const navButton = location.pathname === '/auth/login'? 'Login':'Login';
  

  const currentPage = getCurrentPage();

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'rgb(4, 1, 153)' }}>
      
      <Container maxWidth="xl">
        
        <Toolbar disableGutters>
         
          {/* Tablet/Desktop App Icon Rendering */}
          

          <Typography
          
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "Helvetica Neue",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFD700',
              textDecoration: 'none',
              backgroundcolor:'#191970',
              
            }}
          >  
           <img src={appLogo} alt="CN-Logo" height={60} width={60} sx={{ flexGrow: 1 }}/> 
          </Typography>
          
            <Typography  variant="h4" component="div" sx={{ flexGrow: 1 }}>
            CouncilNote
          </Typography>


          <Typography
          
            variant="h6"
            noWrap
            component={Link}
            to="/problems"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "Segoe UI",
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#FFD700',
              textDecoration: 'none',
              backgroundcolor:'#191970',
              
            }}
          >
            
          </Typography>

          <Typography
          
          variant="h6"
          noWrap
          component={Link}
          to="/notices"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: "Segoe UI",
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#FFD700',
            textDecoration: 'none',
            backgroundcolor:'#191970',
            
          }}
        >
          </Typography>
         <Typography
          
          variant="h6"
          noWrap
          component={Link}
          to="/profile"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: "Segoe UI",
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#FFD700',
            textDecoration: 'none',
            backgroundcolor:'#191970',
            
          }}
        >
          
        </Typography>
        <Typography
          
          variant="h6"
          noWrap
          component={Link}
          to="/searchpeople"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: "Segoe UI",
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: '#FFD700',
            textDecoration: 'none',
            backgroundcolor:'#191970',
            
          }}
        >
          
        </Typography>

          {/* Renders dropdown page menu for mobile displays */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <img src={appLogo} alt="CN-Logo" height={50} />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color='#FFD700'
              backgroundcolor='#191970'
              variant="'outlined"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => handleNavClick(page)}
                  sx={{
                    color: currentPage === page.toLowerCase().replace('é', 'e') ? 'primary.main' : '#FFD700', // Highlight the current page
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile App Icon Rendering only when logged in */}
          {jwt && (<Typography
            variant="h5"
            noWrap
            onClick={handleSettingsClick}
            component={Link}
            to="auth/logout"
            sx={{
              ml: 2,
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            
          </Typography>)}

          {/* Renders page links for tablet and desktop displays */}
          <Box sx={{ flexDirection: 'row-reverse', mr: 3, flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {reversedPages.map((page) => (
              <Button
               variant="outlined"
                key={page}
                onClick={() => handleNavClick(page)}
                sx={{
                  my: 2,
                  color: currentPage === page.toLowerCase().replace('é', 'e') ? '#7CFC00' : '#FFD700', // Highlight the current page
                  display: 'block',
                  '&:hover': { color: '#FFD700', backgroundcolor: '#191970' },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          {/* Renders Create Account/Log In button if user is not logged in */}
          {!jwt && (<Button variant="outlined"
          key={navButton}
          onClick={() => handleNavButtonClick(navButton)}
          sx={{
            display: 'block',
            '&:hover': { color: '#7CFC00', backgroundcolor: '#ADD8E6' },
            width: { xs: '30%', md: '12%' },
          }}
          >
            {navButton}
          </Button>)}

        </Toolbar>
      </Container>
    </AppBar>
  );
}


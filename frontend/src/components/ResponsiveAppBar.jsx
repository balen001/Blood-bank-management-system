import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="sticky" style={{ backgroundColor: 'transparent', color: 'gre' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={logo} alt="logo" style={{ height: '2.5em' }} />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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

            </Menu>
          </Box>



          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            <Button color="inherit" style={{ marginRight: '2em', textTransform: 'none', fontSize: '0.9rem' }} component={Link} to="/login">Login</Button>
            <Button color="inherit" style={{ marginRight: '2em', textTransform: 'none', fontSize: '0.9rem' }} onClick={() => navigate('/register', { state: { register_as: 'donor' } })}>Donate</Button>

            <Button color="inherit" style={{ marginRight: '2em', textTransform: 'none', fontSize: '0.9rem' }} onClick={() => navigate('/register', { state: { register_as: 'patient' } })}>Request</Button>
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar;
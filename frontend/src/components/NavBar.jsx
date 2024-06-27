import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useAppStore } from '../appStore';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';


const AppBar = styled(MuiAppBar, {

})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,

}));


// Notification clearing logic

async function clearAllNotifications() {
  try {
    const response = await axios.delete(''); // Add an endpoint to clear all notifications
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}







const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);

  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const navigate = useNavigate()





  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* if its admin or doctor hide it */}
      {localStorage.getItem('user_type') !== 'admin' && localStorage.getItem('user_type') !== 'doctor' && (
        <MenuItem onClick={() => { navigate("/profile") }}>Profile</MenuItem>
      )}

      {/* change the url based on user_type */}
      <MenuItem onClick={() => {
        const isAdmin = localStorage.getItem('user_type') === 'admin';
        if (isAdmin) {
          navigate("/myaccount");
        } else {
          navigate("/account");
        }
      }}>My account</MenuItem>

      <MenuItem onClick={() => { navigate("/logout") }}>Logout</MenuItem>
    </Menu>
  );




  // Added function to close notifications menu
  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  // Added function to open notifications menu
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const notifications = ["Notification 1 ---------------------\n----------------------", "Notification 2", "Notification 3"]; // later this should be fetched from the database

  const notificationsMenuId = 'primary-notifications-menu';
  const renderNotificationsMenu = (
    <Menu
      sx={{ '& .MuiPaper-root': { width: '250px' } }}
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationsMenuOpen}
      onClose={handleNotificationsMenuClose}
    >
      {notifications.map((notification, index) => (
        <MenuItem key={index} onClick={handleNotificationsMenuClose}>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{notification}</div>
        </MenuItem>
      ))}



      <Box display="flex" justifyContent="space-between">
        <MenuItem onClick={() => { navigate("/notifications") }} style={{ whiteSpace: 'pre-wrap', fontSize: 12 }} >
          <VisibilityIcon fontSize="small" />
          View notifications
        </MenuItem>
        <MenuItem onClick={() => { clearAllNotifications(); handleNotificationsMenuClose(); }}> {/*Clear the notifications in the database*/}
          <DeleteIcon fontSize="small" />
          <div style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>Clear all</div>
        </MenuItem>
      </Box>


    </Menu>
  );




  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 10 new notifications"
          color="inherit"
          // Added onClick handler to open notifications menu
          onClick={handleNotificationsMenuOpen}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      {localStorage.getItem('user_type') !== 'admin' && localStorage.getItem('user_type') !== 'doctor' && (
        { renderNotificationsMenu }
      )}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  {/* 040E28   */ }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#FFFFFF", color: "#000000" }}>

        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {/* Home */}
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}

          <Typography variant="h6" noWrap component="div">
            Welcome {(localStorage.getItem('userName') || '').charAt(0).toUpperCase() + (localStorage.getItem('userName') || '').slice(1)}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}


            {localStorage.getItem('user_type') !== 'admin' && localStorage.getItem('user_type') !== 'doctor' && (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                // Added onClick handler to open notifications menu
                onClick={handleNotificationsMenuOpen}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}




            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* Added notifications menu */}
      {renderNotificationsMenu}
      {/* {localStorage.getItem('user_type') !== 'admin' && localStorage.getItem('user_type') !== 'doctor' && (
        { renderNotificationsMenu }
      )} */}

    </Box>
  );
}

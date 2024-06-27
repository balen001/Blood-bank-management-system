import React from 'react';
import NavBar from "../../components/NavBar";
import AdminSideNav from "../../components/AdminSideNav";
import ConfirmDialog from '../../components/ConfirmDialog';
import RequestDetailPopup from '../../components/RequestDetailPopup';


import { Box, Typography, Card, CardContent, Grid, Divider, IconButton, Button, Icon } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

import axios from 'axios';
import DoctorSideNav from '../../components/DoctorSideNav';


function PatientRequests() {

    const [searchQuery, setSearchQuery] = useState(''); // Added line
    const [filteredUsers, setFilteredUsers] = useState([]); // Added line




    // let users = [


    //     { id: 1, email: 'hello@gma.com', userType: 'doctor', userHospital: 'Hospital 1'},
    //     { id: 2, email: 'holoyy@gma.com', userType: 'receptionist' , userHospital: 'Hospital 2' },


    // ];


    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/users/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFilteredUsers(data); // Added line

                // console.log("Fetched data:", data);
                setUsers(data);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        console.log("Updated users:", users);
    }, [users]);


    const handleSearch = () => { // Added function
        if (searchQuery.trim() === '') {
            setFilteredUsers(users); // Added line
        } else {
            const results = users.filter(user =>
                `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(results);
        }
    };




    const [value, setValue] = React.useState(dayjs());

    //deletion operation


    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able undo this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject it!',
            confirmButtonColor: 'red',
            cancelButtonText: 'No, keep it',
            width: '400px',
            heightAuto: true
        }).then((result) => {
            if (result.isConfirmed) {
                const userId = user.id;
                console.log('User ID to delete:', userId);
                const deleteData = {
                    user_id: userId,
                };
                console.log('Delete data:', deleteData);

                const deleteUser = async () => {
                    try {
                        const response = await fetch('http://127.0.0.1:8000/api/admin/deleteuser/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                            },
                            body: JSON.stringify(deleteData),
                        });

                        if (response.ok) {
                            try {
                                const data = await response.json();
                                console.log("User deleted successfully:", data);
                            } catch (e) {
                                console.log("No JSON response, user deleted successfully.");
                            }

                            Swal.fire({
                                title: 'Deleted!',
                                text: 'User has been deleted.',
                                icon: 'success'
                            }).then(() => {
                                // Optionally, you can reload or update your UI after deletion
                                window.location.reload(); // Example: Reload the page
                            });
                        } else {
                            console.error('Failed to delete user');
                            Swal.fire('Error!', 'Failed to delete user.', 'error');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        Swal.fire('Error!', 'An error occurred.', 'error');
                    }
                };

                deleteUser(); // Call the async function

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // handle cancel

                console.log("User delete canceled");
            }
        });
    };


    //-----------------------------------------------------------------------------------

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const handleOpenPopup = (user) => {
        setSelectedUser(user);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };


    return (

        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                {localStorage.getItem('user_type') === 'doctor' ? <DoctorSideNav /> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    <Box height={60}></Box>

                    <Typography variant="h4" component="h4" align="left" gutterBottom ml={1}>
                        Patient requests
                    </Typography>
                    <Box mt={5}></Box>

                    <Box>


                    </Box>


                    <Grid item xs={3} alignItems="center">
                        <Box display="flex" justifyContent="flex-end">



                        </Box>

                        <Box mt={3}></Box>

                        <Box display="flex" flexDirection="row" alignItems="center">

                            <Box>
                                <Box mt={1.5}></Box>
                                <Typography variant="h7" component="div" fontWeight="bold" gutterBottom ml={1}>
                                    Search by name
                                </Typography>
                            </Box>

                            <Box mr={2}></Box>
                            <Box display="flex" alignItems="center">


                                <TextField
                                    label="Search"
                                    variant="outlined"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </Box>



                            <Box mr={3}></Box>
                            {/* Search button */}
                            <Box display="flex" alignItems="right" >


                                <Button startIcon={<SearchIcon />} sx={{
                                    backgroundColor: '#04AA6D', color: 'white', '&:hover': {
                                        backgroundColor: '#038253',
                                    },
                                    marginTop: '10px',
                                }}

                                    onClick={handleSearch}

                                >
                                    Search
                                </Button>

                            </Box>


                        </Box>
                    </Grid>

                    <Box mt={5}></Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        {filteredUsers.map((user) => (
                            <Card variant="outlined" style={{ margin: '5px', width: '100%' }} key={user.id}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        {/* <Grid item xs={2.75} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    ID
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>
                                                <Typography variant="body1" component="div">
                                                    {user.id}
                                                </Typography>
                                            </Box>
                                        </Grid> */}

                                        <Grid item xs={2.75} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Date
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2.75} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Patient name
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                    {user.first_name} {user.last_name}
                                                </Typography>
                                            </Box>
                                        </Grid>



                                        <Grid item xs={2.75} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Patient email
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Grid>


                                        <Grid item xs={2.75}>
                                            <Box display="flex" flexDirection="column" alignItems="center" >
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Status
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>


                                                <Typography variant="body1" component="div">
                                                    {user.userHospital}
                                                </Typography>
                                            </Box>
                                        </Grid>


                                        <Grid item xs={1}>

                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                {/* <Typography variant="h7" component="div" fontWeight="bold">
                                                    End time
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} /> */}
                                                {/* <Box mt={1}></Box> */}

                                                {/* <IconButton aria-label="delete" onClick={() => handleDelete(user)} title='Delete user'>
                                                    <CancelIcon />

                                                </IconButton> */}


                                                <IconButton aria-label="edit" onClick={() => handleOpenPopup(user)} title='change password'>

                                                    <VisibilityIcon />

                                                </IconButton>



                                            </Box>


                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                </Box>
            </Box>



            {isPopupOpen && selectedUser && (
                <RequestDetailPopup open={isPopupOpen} user={selectedUser} onClose={handleClosePopup} />
            )}

        </>


    )


}

export default PatientRequests;
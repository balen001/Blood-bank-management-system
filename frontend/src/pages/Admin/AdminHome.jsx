import React from 'react';
import NavBar from "../../components/NavBar";
import AdminSideNav from "../../components/AdminSideNav";
import ConfirmDialog from '../../components/ConfirmDialog';
import ChangePassPopup from '../../components/ChangePassPopup';


import { Box, Typography, Card, CardContent, Grid, Divider, IconButton, Button, Icon } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

import axios from 'axios';


function AdminHome() {


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




    const [value, setValue] = React.useState(dayjs());

    //deletion operation


    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: 'red',
            cancelButtonText: 'No, keep it',
            width: '400px',
            heightAuto: true
        }).then((result) => {
            if (result.isConfirmed) {
                // handle confirm
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // handle cancel
            }
        })
    }



    // const [openDialog, setOpenDialog] = useState(false);

    // const handleDelete = () => {
    //     setOpenDialog(true);
    // };

    // const handleClose = () => {
    //     setOpenDialog(false);
    // };

    // const handleConfirm = () => {
    //     // Perform the deletion action here
    //     console.log("Item deleted");
    //     setOpenDialog(false);
    // };

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
                {localStorage.getItem('user_type') === 'admin' ? <AdminSideNav /> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    <Box height={60}></Box>

                    <Typography variant="h4" component="h4" align="left" gutterBottom ml={1}>
                        Users
                    </Typography>
                    <Box mt={5}></Box>

                    <Box>


                    </Box>


                    <Grid item xs={3} alignItems="center">
                        <Box display="flex" justifyContent="flex-end">
                            {/* <Typography variant="h7" component="div" fontWeight="bold" gutterBottom ml={1}>
                                Search by ID
                            </Typography> */}

                            {/* <Button startIcon={<AddIcon />} sx={{
                                backgroundColor: '#04AA6D', color: 'white', '&:hover': {
                                    backgroundColor: '#038253',
                                }
                            }}>

                                Set an user
                            </Button> */}


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
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker

                                            label="from"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider> */}

                                <TextField
                                    label="Search"
                                    variant="outlined"
                                    onChange={(e) => { //be carefulllllllllllllll hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                                        const query = e.target.value;
                                        fetchData(query); // Call fetchData with the search query
                                    }}
                                />
                            </Box>

                            {/* <Box mr={1}>
                                <Box mt={1}></Box>
                                <Typography variant="h7" component="div" fontWeight="bold" gutterBottom ml={1}>
                                    to
                                </Typography>
                            </Box> */}

                            {/* <Box display="flex" alignItems="center">
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker

                                            label="to"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box> */}


                            <Box mr={3}></Box>
                            {/* Search button */}
                            <Box display="flex" alignItems="right" >


                                <Button startIcon={<SearchIcon />} sx={{
                                    backgroundColor: '#04AA6D', color: 'white', '&:hover': {
                                        backgroundColor: '#038253',
                                    },
                                    marginTop: '10px',
                                }}

                                    onClick={() => {
                                        // Search logic here
                                    }}

                                >
                                    Search
                                </Button>

                            </Box>


                        </Box>
                    </Grid>

                    <Box mt={5}></Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        {users.map((user) => (
                            <Card variant="outlined" style={{ margin: '5px', width: '100%' }} key={user.id}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={2.75} alignItems="center">
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
                                        </Grid>

                                        <Grid item xs={2.75} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Email
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
                                                    Role
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>


                                                <Typography variant="body1" component="div">
                                                    {user.userType}
                                                </Typography>
                                            </Box>
                                        </Grid>


                                        <Grid item xs={2.75}>
                                            <Box display="flex" flexDirection="column" alignItems="center" >
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Hospital
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

                                                <IconButton aria-label="delete" onClick={handleDelete} title='Delete user'>
                                                    <DeleteIcon />

                                                </IconButton>


                                                <IconButton aria-label="edit" onClick={() => handleOpenPopup(user)} title='change password'>

                                                    <EditIcon />

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
                <ChangePassPopup open={isPopupOpen} user={selectedUser} onClose={handleClosePopup} />
            )}

        </>


    )


}

export default AdminHome;
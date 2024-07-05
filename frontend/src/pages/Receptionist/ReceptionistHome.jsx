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
import NotificationsIcon from '@mui/icons-material/Notifications';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

import axios from 'axios';
import ReceptionistSideNav from '../../components/ReceptionistSideNav';
import SetAppointmentPopup from '../../components/SetAppointmentPopup';


function ReceptionistHome() {

    const [searchQuery, setSearchQuery] = useState(''); // Added line
    const [filteredAppointments, setFilteredAppointments] = useState([]); // Added line




    // let users = [


    //     { id: 1, email: 'hello@gma.com', userType: 'doctor', userHospital: 'Hospital 1'},
    //     { id: 2, email: 'holoyy@gma.com', userType: 'receptionist' , userHospital: 'Hospital 2' },


    // ];


    const [appointments, setAppointments] = useState([{}]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/appointments/today/', {
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
                setFilteredAppointments(data); // Added line

                // console.log("Fetched data:", data);
                setAppointments(data);

            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        console.log("Updated appointments:", appointments);
    }, [appointments]);


    const handleSearch = () => { // Added function
        if (searchQuery.trim() === '') {
            setFilteredAppointments(appointments); // Added line
        } else {
            const results = appointments.filter(appointment =>
                `${appointment.person_first_name} ${appointment.person_last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredAppointments(results);
        }
    };

    function formatTime24To12(time24) {
        const [hours, minutes] = time24.split(':');
        const hours12 = ((hours + 11) % 12 + 1);
        const amPm = hours >= 12 ? 'PM' : 'AM';
        return `${hours12}:${minutes} ${amPm}`;
      }




    const [value, setValue] = React.useState(dayjs());

    //deletion operation


    const handleDelete = (appointment) => {
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
                const appointmentId = appointment.id;
                console.log('Appointment ID to delete:', appointmentId);
    
                const deleteAppointment = async () => {
                    try {
                        
                        const response = await fetch(`http://127.0.0.1:8000/api/deleteappointment/${appointmentId}/`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                            }
                        });
    
                        if (response.ok) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Appointment has been deleted.',
                                icon: 'success'
                            }).then(() => {
                                // Optionally, you can reload or update your UI after deletion
                                window.location.reload(); // Example: Reload the page
                            });
                        } else {
                            console.error('Failed to delete appointment');
                            Swal.fire('Error!', 'Failed to delete appointment.', 'error');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        Swal.fire('Error!', 'An error occurred.', 'error');
                    }
                };
    
                deleteAppointment(); // Call the async function
    
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // handle cancel
    
                console.log("Appointment delete canceled");
            }
        });
    };


    //-----------------------------------------------------------------------------------

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const handleOpenPopup = () => {
        setSelectedAppointment();
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
                {localStorage.getItem('user_type') === 'receptionist' ? <ReceptionistSideNav /> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <Box height={60}></Box>

                    <Typography variant="h4" component="h4" align="left" gutterBottom ml={1}>
                        Appointments
                    </Typography>


                    <Box mt={5}></Box>

                    <Box display="flex" justifyContent="flex-end">
                        {/* <Typography variant="h7" component="div" fontWeight="bold" gutterBottom ml={1}>
                                Search by ID
                            </Typography> */}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Button
                                startIcon={<NotificationsIcon />}
                                sx={{
                                    backgroundColor: '#04AA6D',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#038253',
                                    },
                                }}
                                onClick={() => handleOpenPopup()}  //you should change this later and put something else for send reminders
                            >
                                    Send reminders
                            </Button>

                            <Button
                                startIcon={<AddIcon />}
                                
                                sx={{
                                    backgroundColor: '#04AA6D',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#038253',
                                    },
                                }}
                                onClick={() => handleOpenPopup()}
                            >
                                Set an appointment
                            </Button>
                        </div>





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
                        {filteredAppointments.map((appointment) => (
                            <Card variant="outlined" style={{ margin: '5px', width: '100%' }} key={appointment.id}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={2.75} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    User name
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>
                                                <Typography variant="body1" component="div">
                                                {appointment.person_first_name} {appointment.person_last_name}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2.75} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Date
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                    {appointment.date}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2.75}>
                                            <Box display="flex" flexDirection="column" alignItems="center" >
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Start time
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>


                                                <Typography variant="body1" component="div">
                                                {appointment.start_time ? formatTime24To12(appointment.start_time) : "Time not available"}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={2.75}>
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Box mt={2}></Box>
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    End time
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                {appointment.end_time ? formatTime24To12(appointment.end_time) : "Time not available"}
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

                                                <IconButton aria-label="delete" onClick={() => handleDelete(appointment)} title='Delete appointment'>
                                                    <DeleteIcon />

                                                </IconButton>

                                                {/* <ConfirmDialog
                                                open={openDialog}
                                                onClose={handleClose}
                                                onConfirm={handleConfirm}
                                            /> */}

                                            </Box>


                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                </Box>
            </Box>



            {isPopupOpen && (
                <SetAppointmentPopup open={isPopupOpen} onClose={handleClosePopup} />
            )}

        </>


    )


}

export default ReceptionistHome;
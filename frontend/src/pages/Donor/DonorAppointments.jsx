import React from 'react';
import NavBar from "../../components/NavBar";
import DonorSideNav from "../../components/DonorSideNav";
import ConfirmDialog from '../../components/ConfirmDialog';

import { Box, Typography, Card, CardContent, Grid, Divider, IconButton, Button, Icon } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useState } from 'react';
import Swal from 'sweetalert2';


function DonorAppointments() {
    let appointments = [
        { id: 1, date: '1-10-2023', startTime: '12:00', endTime: '12:30' },
        { id: 2, date: '1-10-2023', startTime: '12:30', endTime: '1:00' }


    ];


    const [value, setValue] = React.useState(dayjs());

    //deletion operation


    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
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




    return (

        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    <Box height={60}></Box>

                    <Typography variant="h4" component="h4" align="left" gutterBottom ml={1}>
                        Appointments
                    </Typography>
                    <Box mt={5}></Box>

                    <Box>


                    </Box>


                    <Grid item xs={3} alignItems="center">
                        <Box display="flex" justifyContent="flex-end">
                            {/* <Typography variant="h7" component="div" fontWeight="bold" gutterBottom ml={1}>
                                Search by ID
                            </Typography> */}

                            <Button startIcon={<AddIcon />} sx={{
                                backgroundColor: '#04AA6D', color: 'white', '&:hover': {
                                    backgroundColor: '#038253',
                                }
                            }}>

                                Set an appointment
                            </Button>


                        </Box>

                        <Box mt={3}></Box>

                        <Box display="flex" flexDirection="row" alignItems="center">

                            <Box>
                                <Box mt={1.5}></Box>
                                <Typography variant="h7" component="div" fontWeight="bold" gutterBottom ml={1}>
                                    Search by date
                                </Typography>
                            </Box>

                            <Box mr={2}></Box>
                            <Box display="flex" alignItems="center">
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker

                                            label="from"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>

                            <Box mr={1}>
                                <Box mt={1}></Box>
                                <Typography variant="h7" component="div" fontWeight="bold" gutterBottom ml={1}>
                                    to
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker

                                            label="to"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
                        {appointments.map((appointment) => (
                            <Card variant="outlined" style={{ margin: '5px', width: '100%' }} key={appointment.id}>
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
                                                    {appointment.id}
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
                                                    {appointment.startTime}
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
                                                    {appointment.endTime}
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

                                                <IconButton aria-label="delete" onClick={handleDelete} title='Delete appointment'>
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
        </>
    )


}

export default DonorAppointments;
import React from 'react';
import NavBar from "../components/NavBar";
import DonorSideNav from "../components/DonorSideNav";
import ConfirmDialog from '../components/ConfirmDialog';

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


function Notifications() {
    let notifications = [

        { id: 1, type: 'Reminder', date: '1-10-2023', time: '12:00', title: 'Someone needs blood', content: 'Someone needs B+ blood type if you can help please contact us' },
        { id: 2, type: 'Help', date: '1-10-2023', time: '12:30', title: 'Someone needs blood', content: 'Someone needs B+ blood type if you can help please contact us' },
        { id: 3, type: 'Info', date: '1-10-2023', time: '12:30', title: 'Someone needs blood', content: 'Someone needs B+ blood type if you can help please contact us' }


    ];


    const [value, setValue] = React.useState(dayjs());

    //bgcolor of the type

    function getBgColor(type) {
        switch(type) {
            case 'Help':
                return '#CF352E';
            case 'Reminder':
                return '#1976d2'; // replace with your preferred color
            case 'Info':
                return '#04AA6D';
            default:
                return 'grey'; // default color for other types
        }
    }

    //deletion operation


    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
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
                        Notifications
                    </Typography>
                    <Box mt={5}></Box>

                    <Grid item xs={3} alignItems="center">

                        <Box mt={3}></Box>

                    </Grid>

                    <Box mt={5}></Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        {notifications.map((notifications) => (
                            <Card variant="outlined" style={{ margin: '5px', width: '100%' }} key={notifications.id}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} display="flex" justifyContent="space-between">
                                            <Box display="flex" alignItems="center">
                                                <Box display="flex" justifyContent="center" component="span" bgcolor={getBgColor(notifications.type)} color="white" width={86}  px={1} py={0.5} borderRadius="4px" mr={2}>
                                                    {notifications.type}
                                                </Box>
                                                <Typography variant="h6" component="div" fontWeight="bold">
                                                    {notifications.title}
                                                </Typography>
                                            </Box>

                                            <Typography variant="body2" color="textSecondary">
                                                {
                                                    new Date(notifications.date + " " + notifications.time)
                                                        .toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true
                                                        })
                                                }

                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" component="div">
                                                {notifications.content}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <IconButton aria-label="delete" onClick={handleDelete} title='Delete notification'>
                                                    <DeleteIcon />
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
        </>
    )


}

export default Notifications;
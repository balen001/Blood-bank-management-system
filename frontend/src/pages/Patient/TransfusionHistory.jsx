import React from 'react';
import NavBar from "../../components/NavBar";
import PatientSideNav from "../../components/PatientSideNav";
import { Box, Typography, Card, CardContent, Grid, Divider } from "@mui/material";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ACCESS_TOKEN } from '../../constants';
import { useEffect, useState } from 'react';







function TransfusionHistory() {

    const [transfusions, setTransfusions] = useState([{}]);


    useEffect(() => {
        const fetchTransfusions = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/transfusions/patient/${localStorage.getItem('userId')}/`, {
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
                setTransfusions(data);

            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchTransfusions();
    }, []);

    useEffect(() => {
        console.log("Updated records:", transfusions);
    }, [transfusions]);



    const [value, setValue] = React.useState(dayjs());


    function formatTimeToAmPm(time) {

        if (typeof time !== 'string') {
            console.error('Invalid time value:', time);
            // Return a default value or handle the error as appropriate
            return 'Invalid time';
        }

        const [hours24, minutes] = time.split(':');
        const hours = parseInt(hours24, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; // Convert 24h to 12h format and handle midnight
        return `${hours12}:${minutes} ${ampm}`;
    }


    return (
        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                {localStorage.getItem('user_type') === 'patient' ? <PatientSideNav /> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    <Box height={60}></Box>

                    <Typography variant="h4" component="h4" align="left" gutterBottom ml={1}>
                        Transfusion history
                    </Typography>
                    <Box mt={5}></Box>


                    <Grid item xs={3} alignItems="center">
                        <Box display="flex" flexDirection="row" alignItems="center" height={50}>

                            {/* <Box>
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
                            </Box> */}

                            
                        </Box>
                    </Grid>

                    <Box mt={5}></Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        {transfusions.map((transfusion) => (
                            <Card variant="outlined" style={{ margin: '5px', width: '100%' }}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={3} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    ID
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>
                                                <Typography variant="body1" component="div">
                                                    {transfusion.id}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={3} alignItems="center">
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Date
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                    {transfusion.date}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box display="flex" flexDirection="column" alignItems="center" >
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Time
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>


                                                <Typography variant="body1" component="div">
                                                    {formatTimeToAmPm(transfusion.time)}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Amount transfused
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                    {transfusion.receivedAmount} bags
                                                </Typography>
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

export default TransfusionHistory;
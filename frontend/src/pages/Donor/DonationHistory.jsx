import React from 'react';
import NavBar from "../../components/NavBar";
import DonorSideNav from "../../components/DonorSideNav";
import { Box, Typography, Card, CardContent, Grid, Divider } from "@mui/material";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




function DonationHistory() {

    let donations = [
        { id: 1, date: '1-10-2023', time: '12:13', amount: 100 },
        { id: 1, date: '1-10-2023', time: '12:13', amount: 100 },


    ];


    const [value, setValue] = React.useState(dayjs());
    return (
        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    <Box height={60}></Box>

                    <Typography variant="h4" component="h4" align="left" gutterBottom ml={1}>
                        Donation history
                    </Typography>
                    <Box mt={5}></Box>


                    <Grid item xs={3} alignItems="center">
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
                        </Box>
                    </Grid>

                    <Box mt={5}></Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        {donations.map((donation) => (
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
                                                    {donation.id}
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
                                                    {donation.date}
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
                                                    {donation.time}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Typography variant="h7" component="div" fontWeight="bold">
                                                    Amount Donated
                                                </Typography>
                                                <Divider sx={{ width: '100%' }} />
                                                <Box mt={1}></Box>

                                                <Typography variant="body1" component="div">
                                                    {donation.amount} bags
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

export default DonationHistory;
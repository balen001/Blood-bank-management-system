import React from 'react';
import Box from '@mui/material/Box';
import DoctorSideNav from '../../components/DoctorSideNav';
import NavBar from '../../components/NavBar';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Icon from '@mui/material/Icon';
import heartImg from '../../assets/heart.png';
import CustomLineChart from '../../components/CustomLineChart';
import BasicPie from '../../components/BasicPie';
import { style } from '@mui/system';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../../constants';



function DoctorHome() {



    // Do a get to receive the number of requests received per month/ day
    const DemandData = [
        ["Month", "Monthly Demand"],
        ["Jan", 8],
        ["Feb", 10],
        ["March", 5],
        ["April", 7],
        ["May", 0],
        ["June", 0],
        ["July", 0],
        ["Aug", 0],
        ["Sep", 0],
        ["Oct", 0],
        ["Nov", 0],
        ["Dec", 0],
    ];

    // const recievedBloodData = [
    //     {value: 10, label: 'A+' },
    //     {value: 10, label: 'A-' },
    //     {value: 15, label: 'B' },
    //     {value: 20, label: 'AB+' },
    // ];



    const [recievedBloodData, setRecievedBloodData] = useState([{}]);

    useEffect(() => {
        const fetchBloodData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/inventory/bloodbagcounts/', {
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
                setRecievedBloodData(data);

                // console.log("Fetched data:", data);
                

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchBloodData();
    }, []);





    // const recievedBloodData = [
    //     { id: 0, value: 10, label: 'A+' },
    //     { id: 1, value: 15, label: 'B' },
    //     { id: 2, value: 20, label: 'AB+' },
    // ];




    return (

        <>

            <NavBar />
            <Box height={70} />
            <Box sx={{ bgcolor: '#ECEFF1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DoctorSideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={10}>
                            <Stack spacing={2} direction='row'>
                                <Card sx={{ maxWidth: 950, width: '100%', height: 250 }}>
                                    <Box display="flex" justifyContent="center" marginTop={2}>
                                        <Typography variant="h8" color="initial">
                                            Inventory insight
                                        </Typography>
                                    </Box>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                        

                                        <Gauge



                                            value={(recievedBloodData.length/100)*100}      //percentage of blood bags available/ total blood bags that inventory can hold
                                            startAngle={-110}
                                            endAngle={110}
                                            height={200}

                                            sx={{
                                                [`& .${gaugeClasses.valueText}`]: {
                                                    fontSize: 20,
                                                    transform: 'translate(0px, 0px)',

                                                },

                                      

                                            }}


                                            text={
                                                
                                                ({ value }) => `${value}% of inventory filled` 
                                            }
                                        />
                                    </Stack>


                                </Card>

                                <Card sx={{ maxWidth: 800, width: '100%', height: 250 }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="center">
                                            <Typography variant="h8" color="initial">
                                                Blood availability by blood type
                                            </Typography>
                                        </Box>
                                        <Box height={15}></Box>



                                        <Box display="flex" justifyContent="center" sx={{ marginTop: '-1em' }}>
                                            {/* <Typography variant="h8" color="initial">Blood inventory</Typography> */}
                                            <BasicPie pieData={recievedBloodData} />

                                        </Box>





                                    </CardContent>
                                </Card>


                            </Stack>
                        </Grid>

                        <Grid item xs={4}>
                            {/* <Item>xs=4</Item> */}
                        </Grid>

                    </Grid>

                    <Box height={20} />
                    <Grid container spacing={2}>

                        <Grid item xs={8}>
                            <Card sx={{ height: 60 + 'vh', width: 146 + 'vh' }}>
                                <CardContent>
                                    <CustomLineChart data={DemandData} title="Monthly Demand" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            {/* <Item>xs=4</Item> */}
                        </Grid>
                    </Grid>

                </Box>
            </Box>



        </>








    );
}

export default DoctorHome;
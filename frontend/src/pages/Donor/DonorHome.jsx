import React from 'react';
import Box from '@mui/material/Box';
import SideNav from '../../components/SideNav';
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
import  CustomLineChart  from '../../components/CustomLineChart';



function DonorHome() {
    // Do a get to receive the number of the bags donated per month
    const Donordata = [
        ["Month", "Bags Donated"],
        ["Jan", 8],
        ["Feb", 3],
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
    return (

        <>
            
            <NavBar />
            <Box height={70} />
            <Box sx={{ bgcolor: '#ECEFF1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={10}>
                            <Stack spacing={2} direction='row'>
                                <Card sx={{ maxWidth: 950, width: '100%', height: 200 }}>

                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                                        {/* <Gauge width={100} height={100} value={60} /> */}

                                        <Gauge
                                            value={100}
                                            startAngle={-110}
                                            endAngle={110}
                                            height={200}
                                            sx={{
                                                [`& .${gaugeClasses.valueText}`]: {
                                                    fontSize: 25,
                                                    transform: 'translate(0px, 0px)',
                                                },
                                            }}
                                            text={
                                                ({ value }) => `${value} bags donated` // retrieve the number of bags and put it in place of value
                                            }
                                        />
                                    </Stack>


                                </Card>

                                <Card sx={{ maxWidth: 800, width: '100%', height: 200 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                                             {} <Box component="span" sx={{ color: 'red', fontWeight: 'bold'}}>124</Box> of lives saved             {/*put the number of lives saved between {} */}
                                        </Typography> 
                                        <Box display="flex" justifyContent="center">
                                            {/* <VolunteerActivismIcon /> */}
                                            <img src={heartImg} alt="My Image" width="100" height="100"/>
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
                        <Card sx={{ height: 60 + 'vh', width: 146 + 'vh'}}>
                                    <CardContent>
                                    <CustomLineChart data={Donordata} title="Bags Donated" />
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

export default DonorHome;
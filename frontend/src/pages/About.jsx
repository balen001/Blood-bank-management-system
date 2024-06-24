import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CodeIcon from '@mui/icons-material/Code';
import { styled } from '@mui/system';
import NavBar from '../components/NavBar';
import DonorSideNav from '../components/DonorSideNav';
import PatientSideNav from '../components/PatientSideNav';
import AdminSideNav from '../components/AdminSideNav';


// Sample data
const skills = ['Python', 'Django', 'JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML'];
const projects = [
    {
        name: 'Project One',
        description: 'A web application built with React and Node.js',
        link: 'https://github.com/username/project-one',
    },
    {
        name: 'Project Two',
        description: 'A Python-based data analysis tool',
        link: 'https://github.com/username/project-two',
    },
];

// Styled components
const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
    width: 150,
    height: 150,
    margin: '0 auto',
}));

const Section = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));



function About() {
    return (
        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
            {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> :
                    localStorage.getItem('user_type') === 'patient' ? <PatientSideNav /> : localStorage.getItem('user_type') === 'admin' ? <AdminSideNav /> : null}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box height={25}></Box>
                    <Typography variant="h3" component="h3" align="center" gutterBottom>
                        About
                    </Typography>

                    <Box display="flex" justifyContent="center" mb={4}>
                        <AvatarStyled alt="Your Name" src="https://via.placeholder.com/150" />
                    </Box>
                    <Typography variant="h6" align="center" paragraph>
                        Hi, I'm [Your Name], a passionate developer with experience in building web applications and tools. I love coding and continuously learning new technologies to improve my skills.
                    </Typography>

                    <Typography variant="h4" component="h2" sx={{ mt: 4 }}>
                        Skills
                    </Typography>
                    <Grid container direction="row" spacing={2} justifyContent={'center'}>
                        {skills.map((skill, index) => (
                            <Grid item key={index}>
                                <Paper elevation={2}>
                                    <List>
                                        <ListItem>
                                            <CodeIcon />
                                            <ListItemText primary={skill} />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>



                    <Grid container spacing={4}>

                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default About;

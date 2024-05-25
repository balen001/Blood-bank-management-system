import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../assets/pexels-karolina.jpg';
import img2 from '../assets/pexels-shvetsa.jpg';
import img3 from '../assets/pexels-pavel.jpg';
import { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';




function Copyright(props) {
    return (
        <Typography variant="body2" color="white" align="center" {...props}>
            {'Copyright © '}
            <Link color="#ffffff" href="/">
                BBMS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (event.target.value.length < 5 || event.target.value.length > 50) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length < 8 || event.target.value.length > 20) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    //submission logic
    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        const values = { email, password };
        const JSONvalues = JSON.stringify(values);




        const response = axios.post('http://localhost:8000/api/token/', JSONvalues, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(response => {

            //console.log(response.data);

            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

            // console.log(values);
            // console.log(values.email);
            // console.log(localStorage.getItem(ACCESS_TOKEN))



        }).then(response => {
            console.log("--------------reached here-----------------------")
            const res = axios.get('http://localhost:8000/api/user/usertype/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`

                },

                params: {
                    email : values.email,
                }


            
            }).then(res => {

                if (res.data.user_type === 'donor') {
                    navigate("/home", { state: { user_type: 'donor' } });
    
                } else if (res.data.user_type === 'patient') {
                    
                    navigate("/home", { state: { user_type: 'donor' } });
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });





        })


    };




    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundColor: '#385296',
                    height: '100vh',
                }}
            >
                {/* <Carousel autoPlay infiniteLoop interval={2000}>
                    <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', height: '100%' }} />
                    <div style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', height: '100vh' }} />
                    <div style={{ backgroundImage: `url(${img3})`, backgroundSize: 'cover', height: '100vh' }} />
                </Carousel> */}
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: '#1e3263' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'white'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#3f51b5' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                            helperText={emailError ? 'Email should be between 5 and 50 characters' : ''}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                },
                            }}
                            inputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                },
                            }}
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                            helperText={passwordError ? 'Password should be between 8 and 20 characters' : ''}
                            inputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}


                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}
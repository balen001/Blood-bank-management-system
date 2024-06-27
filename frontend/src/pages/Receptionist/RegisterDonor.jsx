import React from 'react';
import DonorSideNav from '../../components/DonorSideNav';
import Box from '@mui/material/Box';
import NavBar from '../../components/NavBar';
import { Container, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AdminSideNav from '../../components/AdminSideNav';
import PatientSideNav from '../../components/PatientSideNav';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { redirect } from 'react-router-dom';
import ReceptionistSideNav from '../../components/ReceptionistSideNav';




// {

//   "first_name": "Rebin",
//   "last_name": "Ahmed",
//   "email": "rebin@gmail.com",
//   "password": "Slaw@1212",
//   "contact_no": "+96475027515363",
//   "dateOfBirth": "2000-01-01",
//   "gender": "Male",
//   "speciality": "BDS",
//   "hospital": 17

// }



const FormContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

const bloodOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
];


let message = 'Donor registered successfully';




function RegisterDonor() {

    //initial birthdate
    const [value, setValue] = React.useState(dayjs()); // the format is: '2024-04-17' Don't forget to make the initial value the birthday of the user


    // message close handler
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };



    const [fName, setfName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [gender, setGender] = useState('male');
    const [bloodType, setBloodType] = useState();




    // const [hospitalOptions, setHospitalOptions] = useState([{}]);

    // useEffect(() => {
    //     const fetchHospitals = async () => {
    //         try {
    //             const response = await fetch('http://127.0.0.1:8000/api/user/hospitals/', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             // console.log("Fetched data:", data);
    //             setHospitalOptions(data);

    //         } catch (error) {
    //             console.error('Error fetching hospitals:', error);
    //         }
    //     };

    //     fetchHospitals();
    // }, []);

    // useEffect(() => {
    //     console.log("Updated hospitalOptions:", hospitalOptions);
    // }, [hospitalOptions]);







    const handleSubmit = async (e) => {
        e.preventDefault();

        const donorData = {
            first_name: fName,
            last_name: lName,
            email: email,
            password: password,
            contact_no: contactNo,
            dateOfBirth: value.format('YYYY-MM-DD'),
            gender: gender,
            bloodType: bloodType,
            register_as: 'donor'
        };


        // console.log(donorData)
        if (password === confirmPassword) {

            console.log(values);
            try {
                // const { confirmPassword, ...dataToSend } = values;
                // if (dataToSend.contact_no === '') {
                //     delete dataToSend.contact_no;
                // }
                console.log(JSON.stringify(dataToSend))
                const response = await axios.post('http://127.0.0.1:8000/api/user/register/', JSON.stringify(donorData), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        // setShowMessage(true);
                        setOpen(true);
    
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                // Handle any error actions here
            } finally {
                actions.setSubmitting(false);
            }


        }

        else {
            setOpen(true);
            message = 'Passwords don\'t match.';
        }

    };










    // Handle change for password field
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Handle change for confirm password field
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };





    return (




        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                {localStorage.getItem('user_type') === 'receptionist' ? <ReceptionistSideNav /> : null}
                <Box component="main" sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
                    <FormContainer maxWidth="md">
                        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                            Register Donor
                        </Typography>
                        <Box mt={3}></Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth label="First Name"
                                        required
                                        value={fName}
                                        onChange={(e) => setfName(e.target.value)}
                                        variant="outlined"
                                        placeholder="Enter first name"

                                    />

                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth
                                        required
                                        value={lName}
                                        onChange={(e) => setLName(e.target.value)}
                                        label="Last Name"
                                        variant="outlined"
                                        placeholder="Enter last name"

                                    />


                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <TextField fullWidth label="Birthday" variant="outlined" placeholder="mm/dd/yyyy" type="date" InputLabelProps={{ shrink: true }} /> */}
                                <Box display="flex" alignItems="center">
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker

                                                label="Birthdate"
                                                value={value}
                                                onChange={(newValue) => setValue(newValue)}
                                                slotProps={{ textField: { fullWidth: true } }}


                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>

                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth
                                        required
                                        // value={gender}  //We've set the default when we initialized it so we don't need this
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gender"
                                        variant="outlined"
                                        defaultValue={"male"}

                                        select>
                                        {genderOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth
                                        required
                                        // value={amount}  //We've set the default when we initialized it so we don't need this
                                        onChange={(e) => setBloodType(e.target.value)}
                                        label="Blood type"
                                        variant="outlined"
                                        defaultValue={"A+"}

                                        select>
                                        {bloodOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}></Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth label="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="outlined" placeholder="name@company.com" type="email"

                                    />

                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}></Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth label="Phone"
                                        required
                                        value={contactNo}
                                        onChange={(e) => setContactNo(e.target.value)}
                                        variant="outlined" placeholder="+(964) 7501234567" type="tel"

                                    />

                                </Box>

                            </Grid>
                            


                        </Grid>

                        <Box mt={5}></Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="password" variant="outlined" placeholder="password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    type="password" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Retype new Password" variant="outlined" placeholder="Retype new password"
                                    required
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    type="password" />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleSubmit}>
                            Register donor
                        </Button>
                    </FormContainer>
                </Box>

            </Box>



            <div>


                {

                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert onClose={handleClose} severity={message === "Donor registered successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                }


            </div>

        </>



    );
}

export default RegisterDonor;





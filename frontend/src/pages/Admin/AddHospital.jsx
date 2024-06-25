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
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AdminSideNav from '../../components/AdminSideNav';
import PatientSideNav from '../../components/PatientSideNav';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import {Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';






const FormContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];






function AddHospital() {

    const [value, setValue] = React.useState(dayjs()); // the format is: '2024-04-17' Don't forget to make the initial value the birthday of the user

    const [isFirstNameEditable, setIsFirstNameEditable] = useState(true);
    const [isLastNameEditable, setIsLastNameEditable] = useState(true);
    const [isBirthdateEditable, setIsBirthdateEditable] = useState(true);
    const [isGenderEditable, setIsGenderEditable] = useState(true);
    const [isEmailEditable, setIsEmailEditable] = useState(true);
    const [isPhoneEditable, setIsPhoneEditable] = useState(true);


    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const hospitalData = {
            name,
            contact_no: contactNo,
            city,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/addhospital/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                },
                body: JSON.stringify(hospitalData),
            });

            if (response.ok) {
                setOpen(true);
                const data = await response.json();
                

                // Handle success (e.g., clear form, show message)
            } else {
                // Handle errors (e.g., show error message)
                console.error('Failed to add hospital');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle request error (e.g., show error message)
        }
    };





    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [city, setCity] = useState('');



    return (


        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> :
                    localStorage.getItem('user_type') === 'patient' ? <PatientSideNav /> : localStorage.getItem('user_type') === 'admin' ? <AdminSideNav /> : null}
                <Box component="main" sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
                    <FormContainer maxWidth="md">
                        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                            Add Hospital
                        </Typography>
                        <Box mt={3}></Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth label="Name"
                                        variant="outlined"
                                        placeholder="Enter hospital name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        InputProps={{
                                            disabled: !isFirstNameEditable,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth
                                        required
                                        label="City"
                                        variant="outlined"
                                        placeholder="Enter your address"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        InputProps={{
                                            disabled: !isLastNameEditable,
                                        }}
                                    />


                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Box display="flex" alignItems="center">
                                    <TextField required fullWidth label="Phone" variant="outlined" placeholder="+(964) 7501234567" type="tel"
                                        value={contactNo} // Control the input with state
                                        onChange={(e) => setContactNo(e.target.value)}
                                        InputProps={{
                                            disabled: !isPhoneEditable,
                                        }}
                                    />

                                </Box>

                            </Grid>

                        </Grid>


                        <Box mt={5}></Box>

                        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleSubmit}>
                            Add Hospital
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
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            successfuly added!
                        </Alert>
                    </Snackbar>
                }


            </div>

        </>



    );
}

export default AddHospital;





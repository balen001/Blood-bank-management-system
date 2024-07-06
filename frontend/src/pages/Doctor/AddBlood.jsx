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
import EditIcon from '@mui/icons-material/Edit';
import AdminSideNav from '../../components/AdminSideNav';
import PatientSideNav from '../../components/PatientSideNav';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import DoctorSideNav from '../../components/DoctorSideNav';
import { useEffect, useState } from 'react';






const FormContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

const amountOptions = [
    { value: 1, label: '1 bag' },
    { value: 2, label: '2 bags' },
    { value: 3, label: '3 bags' },
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


let message = ''





function AddBlood() {

    const [value, setValue] = React.useState(dayjs()); // the format is: '2024-04-17' Don't forget to make the initial value the birthday of the user
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };




    const [bloodType, setBloodType] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [hospital, setHospital] = useState('');



    const [hospitalOptions, setHospitalOptions] = useState([{}]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/hospitals/', {
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
                setHospitalOptions(data);

            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    useEffect(() => {
        console.log("Updated hospitalOptions:", hospitalOptions);
    }, [hospitalOptions]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const bloodData = {
            bloodType: bloodType,
            amount: amount,
            donorEmail: email,
            hospital: hospital
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/doctor/addblood/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                },
                body: JSON.stringify(bloodData),
                console: console.log("Stringifyed: ", JSON.stringify(bloodData))
            });

            if (response.ok) {
                message = 'Blood added successfully'
                setOpen(true);
                const data = await response.json();


                // Handle success (e.g., clear form, show message)
            } else {
                // Handle errors (e.g., show error message)
                const errorResponse = await response.json();
                message = errorResponse.error || 'Failed to add blood';
                setOpen(true);
                console.error('Failed to add blood');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle request error (e.g., show error message)
        }
    };







    return (


        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                {<DoctorSideNav />}
                <Box component="main" sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
                    <FormContainer maxWidth="md">
                        <Typography variant="h5" gutterBottom sx={{ mt: 4, textAlign: 'center' }} >
                            Add blood
                        </Typography>
                        <Box mt={3}></Box>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} sm={7}>
                                <Box display="flex" alignItems="center">

                                    <TextField fullWidth
                                        required
                                        // value={amount}  //We've set the default when we initialized it so we don't need this

                                        label="Blood type"
                                        variant="outlined"
                                        defaultValue={""}
                                        value={bloodType}
                                        onChange={(e) => setBloodType(e.target.value)}
                                        select>
                                        {bloodOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>


                                </Box>

                            </Grid>

                            <Grid item xs={12} sm={7}>
                                <Box display="flex" alignItems="center">

                                    <TextField fullWidth
                                        required
                                        value={amount}  //we've set the default when we initialized it so we don't need this
                                        onChange={(e) => setAmount(e.target.value)}
                                        label="Amount"
                                        variant="outlined"
                                        // defaultValue={1}

                                        select>
                                        {amountOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>


                                </Box>

                            </Grid>


                            <Grid item xs={12} sm={7}>
                                <Box display="flex" alignItems="center">
                                    <TextField fullWidth
                                        required
                                        label="Donor email"
                                        variant="outlined"
                                        placeholder="Enter donor email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    />


                                </Box>
                            </Grid>


                            <Grid item xs={12} sm={7}>
                                <Box display="flex" alignItems="center">

                                    <TextField fullWidth
                                        required
                                        value={hospital}  //We've set the default when we initialized it so we don't need this
                                        onChange={(e) => setHospital(e.target.value)}
                                        label="Hospital"
                                        variant="outlined"
                                        defaultValue={""}

                                        select>
                                        {hospitalOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>


                                </Box>

                            </Grid>




                        </Grid>


                        <Box mt={5}></Box>

                        <Box mt={5} display="flex" justifyContent="center" alignItems="center">
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Add Blood
                            </Button>
                        </Box>
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
                        <Alert onClose={handleClose} severity={open && message.includes('Blood added successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                }


            </div>

        </>



    );
}

export default AddBlood;





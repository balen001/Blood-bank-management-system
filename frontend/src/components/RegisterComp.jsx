import React, { useState } from 'react';
import { Grid, Paper, Snackbar, Typography, TextField, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Button, Box, InputLabel, Select, MenuItem, Card, AlertTitle } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios, { formToJSON } from 'axios'; // Import Axios for making HTTP requests


const RegisterComp = ({register_as}) => {

    if (register_as === undefined) {
        register_as = "donor"
    }

    console.log("in RegisterComp: " + register_as)

    // const [showMessage, setShowMessage] = useState(false);


    const paperStyle = { padding: '10px 20px 10px 20px', width: 400, margin: "20px auto", backgroundColor: 'white', opacity: '0.90' }
    const headerStyle = { margin: 0 }
    const marginTop = { marginTop: 3 }

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Invalid email format').required('Email is required').min(5, 'Email must be at least 5 characters').max(50, 'Email must be at most 50 characters'),
        gender: Yup.string().required('Gender is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(20, 'Password must be at most 20 characters'),
        contact_no: Yup.string().matches(/^\+?[0-9]+$/, 'Invalid phone number').test('len', 'Invalid phone number', val => {
            if (!val) return true;
            if (val.startsWith('+') && val.length === 14) return true;
            if (!val.startsWith('+') && [11, 15].includes(val.length)) return true;
            return false;
        }),
        bloodType: Yup.string()
            .required('Blood Type is required')
            .notOneOf(['None'], "Select your blood type"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        // Add more fields as needed
    });

    const handleSubmit = async (values, actions) => {
        console.log(values);
        try {
            const { confirmPassword, ...dataToSend } = values;
            if (dataToSend.contact_no === '') {
                delete dataToSend.contact_no;
            }
            console.log(JSON.stringify(dataToSend))
            const response = await axios.post('http://127.0.0.1:8000/api/user/register/', JSON.stringify(dataToSend), {
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
            actions.setSubmitting(false); // Reset submitting state
        }
    };



    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid >
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Register {register_as} account</h2>
                    <br />
                </Grid>

                <Formik

                    initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        gender: 'male',
                        bloodType: 'None',
                        dob: '',
                        password: '',
                        confirmPassword: '',
                        contact_no: '',
                        register_as: register_as,
                    }}
                    enableReinitialize
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                    validateOnChange={true}
                    onSubmit={handleSubmit}


                >
                    {({ values, handleChange, handleBlur, errors, touched }) => (
                        <Form>
                            
                            <Stack spacing={1.1}>
                                <TextField size="small" name="first_name" type="text" label="First Name" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.first_name} helperText={touched.first_name ? errors.first_name : ""} error={touched.first_name && Boolean(errors.first_name)} />
                                <TextField size="small" name="last_name" type="text" label="Last Name" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.last_name} helperText={touched.last_name ? errors.last_name : ""} error={touched.last_name && Boolean(errors.last_name)} />
                                <TextField size="small" name="email" type="email" label="Email" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.email} helperText={touched.email ? errors.email : ""} error={touched.email && Boolean(errors.email)} />
                                <TextField size="small" name="password" type="password" label="Password" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.password} helperText={touched.password ? errors.password : ""} error={touched.password && Boolean(errors.password)} />
                                <TextField size="small" name="confirmPassword" type="password" label="Confirm Password" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} helperText={touched.confirmPassword ? errors.confirmPassword : ""} error={touched.confirmPassword && Boolean(errors.confirmPassword)} />
                                <TextField size="small" name="contact_no" type="text" label="Phone Number" fullWidth onChange={handleChange} onBlur={handleBlur} value={values.contact_no} helperText={touched.contact_no ? errors.contact_no : ""} error={touched.contact_no && Boolean(errors.contact_no)} />
                                <FormControl size="small" component="fieldset" style={marginTop}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup size="small" name="gender" onChange={handleChange} onBlur={handleBlur} value={values.gender} row>
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                    {touched.gender && <div>{errors.gender}</div>}
                                </FormControl>

                                <TextField
                                    select
                                    name="bloodType"
                                    label="Blood Type"
                                    size="small"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bloodType}
                                    helperText={touched.bloodType ? errors.bloodType : ""}
                                    error={touched.bloodType && Boolean(errors.bloodType)}
                                >
                                    <MenuItem value="None"><em>None</em></MenuItem>
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                </TextField>

                                <TextField size="small" name="dob" type="date" label="Date of Birth" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.dob} helperText={touched.dob ? errors.dob : ""} error={touched.dob && Boolean(errors.dob)} InputLabelProps={{ shrink: true }} />
                                {/* <TextField size="small" name="diseases" type="text" label="Diseases if any (optional)" fullWidth onChange={handleChange} onBlur={handleBlur} value={values.diseases} helperText={touched.diseases ? errors.diseases : ""} error={touched.diseases && Boolean(errors.diseases)} /> */}


                            </Stack >
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button type="submit" variant="contained" color="primary" style={{
                                    cursor: 'pointer', margin: '1em', width: '8em', height: '3em', color: 'white', backgroundColor: 'red'
                                }}>Sign Up</Button>
                            </Box>

                            
                        </Form>
                    )}
                </Formik>
            </Paper>

            <div>

                {

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        sx={{
                            width: '50%',
                            mx: 'auto',
                        }}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Registration successful!
                        </Alert>
                    </Snackbar>

                    /* {showMessage && (
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            This is a success Alert with an encouraging title.
                        </Alert>
                    )} */
                }

            </div>
        </Grid>


    );
}

export default RegisterComp;
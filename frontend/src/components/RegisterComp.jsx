import React from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Button, Box, InputLabel, Select, MenuItem } from '@mui/material';
import AddBox from '@mui/icons-material/AddBox';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterComp = () => {
    const paperStyle = { padding: '30px 20px', width: 400, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#E04625' }
    const marginTop = { marginTop: 5 }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Invalid email format').required('Email is required'),
        gender: Yup.string().required('Gender is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        contact_no: Yup.string().required('Phone Number is required').matches(/^\+?[0-9]+$/, 'Invalid phone number').test('len', 'Invalid phone number', val => {
            if (!val) return false;
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

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddBox />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', gender: 'male', bloodType: 'None', dob: '', diseases: '', password: '', confirmPassword: '', contact_no: '' }}
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                    validateOnChange={true} // add this line
                    onSubmit={(values, { setSubmitting }) => {
                        // handle form submission here
                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, touched }) => (
                        <Form>
                            <Stack spacing={2}>
                                <TextField name="firstName" type="text" label="First Name" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.firstName} helperText={touched.firstName ? errors.firstName : ""} error={touched.firstName && Boolean(errors.firstName)} />
                                <TextField name="lastName" type="text" label="Last Name" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.lastName} helperText={touched.lastName ? errors.lastName : ""} error={touched.lastName && Boolean(errors.lastName)} />
                                <TextField name="email" type="email" label="Email" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.email} helperText={touched.email ? errors.email : ""} error={touched.email && Boolean(errors.email)} />
                                <TextField name="password" type="password" label="Password" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.password} helperText={touched.password ? errors.password : ""} error={touched.password && Boolean(errors.password)} />
                                <TextField name="confirmPassword" type="password" label="Confirm Password" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} helperText={touched.confirmPassword ? errors.confirmPassword : ""} error={touched.confirmPassword && Boolean(errors.confirmPassword)} />
                                <TextField name="contact_no" type="text" label="Phone Number" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.contact_no} helperText={touched.contact_no ? errors.contact_no : ""} error={touched.contact_no && Boolean(errors.contact_no)} />
                                <FormControl component="fieldset" style={marginTop}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup name="gender" onChange={handleChange} onBlur={handleBlur} value={values.gender}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                    {touched.gender && <div>{errors.gender}</div>}
                                </FormControl>
                                <InputLabel>Blood Type</InputLabel>

                                <TextField
                                    select
                                    name="bloodType"
                                    label="Blood Type"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bloodType}
                                    helperText={touched.bloodType ? errors.bloodType : ""}
                                    error={touched.bloodType && Boolean(errors.bloodType)}
                                >
                                    <MenuItem value="None"><em>None</em></MenuItem>
                                    <MenuItem value>A+</MenuItem>
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                </TextField>

                                <TextField name="dob" type="date" label="Date of Birth" fullWidth required onChange={handleChange} onBlur={handleBlur} value={values.dob} helperText={touched.dob ? errors.dob : ""} error={touched.dob && Boolean(errors.dob)} InputLabelProps={{shrink:true}} />
                                <TextField name="diseases" type="text" label="Diseases if any (optional)" fullWidth onChange={handleChange} onBlur={handleBlur} value={values.diseases} helperText={touched.diseases ? errors.diseases : ""} error={touched.diseases && Boolean(errors.diseases)} />


                            </Stack >
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button type="submit" variant="contained" color="primary" style={{ cursor: 'pointer' }}>Sign Up</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    );
}

export default RegisterComp;
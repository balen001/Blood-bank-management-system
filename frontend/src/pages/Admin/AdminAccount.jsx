import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import NavBar from '../../components/NavBar';
import AdminSideNav from '../../components/AdminSideNav';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';



const FormContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));


let message = "";


function AdminAccount() {

    const [open, setOpen] = useState(false);
    


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };


    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_no: '',
    });



    const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
    const [isLastNameEditable, setIsLastNameEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);

    useEffect(() => {
        // Fetch superuser data on component mount
        fetchSuperuserData();
    }, []);

    const fetchSuperuserData = async () => {
        try {
            //   const response = await fetch('http://127.0.0.1:8000/api/admin/getsuperuser/');
            const response = await fetch('http://127.0.0.1:8000/api/admin/getsuperuser/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                },
            });
            if (response.ok) {
                const data = await response.json();

                setUserData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    email: data.email || '',
                    contact_no: data.contact_no || '',
                });


            } else {

                console.error('Failed to fetch superuser data');
            }
        } catch (error) {
            message = `${error}`;
            setOpen(true);
            console.error('Error fetching superuser data:', error);
        }
    };




    const handleUpdate = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/updateadmin/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log('Update successful');
                message = "Account updated successfully";
                setOpen(true);
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            } else {
                message = "Failed to update admin data";
                setOpen(true);
                console.error('Failed to update admin data');
            }
        } catch (error) {
            message = `${error}`;
            setOpen(true);
            console.error('Error updating admin data:', error);
        }
    };


    const [userPass, setUserPass] = useState({
        current_password: '',
        new_password: '',
    });

    const [confUserPass, setConfUserPass] = useState({
        retype_password: '',
    });






    const handleChangePass = async () => {

        if (userPass.new_password !== confUserPass.retype_password) {
            message = "Passwords do not match";
            setOpen(true);
            console.error('Passwords do not match');
            return;
        }
        else {

            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/changesuperuserpassword/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    },
                    body: JSON.stringify(userPass),
                });
                if (response.ok) {
                    console.log('Update pass successful');
                    message = "Password updated successfully";
                    setOpen(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 4000);
                    
                } else {
                    message = "Failed to update admin pass";
                    setOpen(true);
                    console.error('Failed to update admin pass');
                }
            } catch (error) {
                message = `${error}`;
                setOpen(true);
                console.error('Error updating admin pass:', error);
            }

        }

    };

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
                            General Information
                        </Typography>
                        <Box mt={3}></Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        variant="outlined"
                                        placeholder="Enter your first name"
                                        value={userData.first_name}
                                        InputProps={{
                                            readOnly: !isFirstNameEditable,
                                        }}
                                        onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
                                    />
                                    <Button
                                        startIcon={<EditIcon />}
                                        size="small"
                                        onClick={() => setIsFirstNameEditable(!isFirstNameEditable)}
                                        sx={{ width: '10px' }}
                                    ></Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined"
                                        placeholder="Enter your last name"
                                        value={userData.last_name}
                                        InputProps={{
                                            readOnly: !isLastNameEditable,
                                        }}
                                        onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
                                    />
                                    <Button
                                        startIcon={<EditIcon />}
                                        size="small"
                                        onClick={() => setIsLastNameEditable(!isLastNameEditable)}
                                        sx={{ width: '10px' }}
                                    ></Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        placeholder="name@company.com"
                                        type="email"
                                        value={userData.email}
                                        InputProps={{
                                            readOnly: !isEmailEditable,
                                        }}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    />
                                    <Button
                                        startIcon={<EditIcon />}
                                        size="small"
                                        onClick={() => setIsEmailEditable(!isEmailEditable)}
                                        sx={{ width: '10px' }}
                                    ></Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        variant="outlined"
                                        placeholder="+(964) 7501234567"
                                        type="tel"
                                        value={userData.contact_no}
                                        InputProps={{
                                            readOnly: !isPhoneEditable,
                                        }}
                                        onChange={(e) => setUserData({ ...userData, contact_no: e.target.value })}
                                    />
                                    <Button
                                        startIcon={<EditIcon />}
                                        size="small"
                                        onClick={() => setIsPhoneEditable(!isPhoneEditable)}
                                        sx={{ width: '10px' }}
                                    ></Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleUpdate}>
                            Update
                        </Button>

                        <Box mt={5}></Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <Grid item xs={12} sm={5.84}>
                                    <TextField fullWidth label="Current password" variant="outlined"
                                        placeholder="Type current password"
                                        onChange={(e) => setUserPass({ ...userPass, current_password: e.target.value })}
                                        type="password" />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="New password" variant="outlined"
                                    onChange={(e) => setUserPass({ ...userPass, new_password: e.target.value })}
                                    placeholder="Type new password" type="password" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Retype new Password" variant="outlined"
                                    onChange={(e) => setConfUserPass({ ...confUserPass, retype_password: e.target.value })}
                                    placeholder="Retype new password" type="password" />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleChangePass}>
                            Change Password
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
                        <Alert onClose={handleClose} severity={message === "Account updated successfully" || message === "Password updated successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                }


            </div>
        </>
    );
}

export default AdminAccount;

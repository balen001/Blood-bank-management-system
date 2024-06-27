import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';






const SetAppointmentPopup = ({ open, onClose }) => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [adminEmail, setAdminEmail] = useState('');


    const [value, setValue] = React.useState(dayjs());
    const [timeValue, setTimeValue] = useState(dayjs());

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMessage(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confPassword) {
            const hospitalData = {
                admin_email: adminEmail,
                admin_password: adminPass,
                id: user.id,
                password: password,
            };

            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/changeuserpassword/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                    },
                    body: JSON.stringify(hospitalData),
                });

                if (response.ok) {
                    setOpenMessage(true);
                    setMessage("Password changed successfully");
                    setPassword('');
                    setConfPassword('');
                } else {
                    console.error('Failed to change password');
                    setMessage("Failed to change password");
                    setOpenMessage(true);
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage(error.toString());
                setOpenMessage(true);
            }
        } else {
            setMessage("Passwords do not match");
            setOpenMessage(true);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Set appointment
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>




                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Hospital: </Typography>
                        </div>
                    </div> */}

                    <Box display="flex" alignItems="center">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker

                                    label="date"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />

                                <TimePicker
                                    label="Time"
                                    value={timeValue}
                                    onChange={(newValue) => setTimeValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>

                    <Box style={{ height: '10px' }}></Box>

                    <TextField variant="outlined"
                        label="Enter user email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        fullWidth />

                    <Box style={{ height: '5px' }}></Box>



                    <Box style={{ height: '10px' }}></Box>

                    <Box display="flex" justifyContent="flex-end">
                        <Button type="submit" color="primary" variant="contained" style={{ marginTop: '10px' }}>Submit</Button>
                    </Box>
                </form>
            </DialogContent>

            <Snackbar
                open={openMessage}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={message === "Appointment scheduled successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default SetAppointmentPopup;

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const RequestDetailPopup = ({ open, onClose, user }) => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [adminEmail, setAdminEmail] = useState('');

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


    //handle rejection
    const handleReject = (event) => {
        event.preventDefault(); // Prevent form submission if it's part of a form
        // Your rejection logic here
        console.log('Rejected'); // Placeholder logic
        // You might want to update a status, send a request to your backend, etc.
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Request details
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Request Date: {user.first_name + " " + user.last_name}</Typography>
                        </div>

                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Request Amount: {user.userType}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Request Reason: {user.userHospital}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Note: {user.userHospital}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Status: {user.userHospital}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <Button type="button" variant="contained" style={{ backgroundColor: '#f44336', marginTop: '10px' }} 
                        onClick={handleReject}>Reject</Button>
                        <Box width={75}></Box>
                        <Button type="submit" color="primary" variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px' }}>Approve</Button>
                    </div>


                </form>
            </DialogContent>

            <Snackbar
                open={openMessage}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={message === "Request approved successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default RequestDetailPopup;

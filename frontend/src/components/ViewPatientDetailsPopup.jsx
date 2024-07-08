import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const ViewPatientDetailsPopup = ({ open, onClose, user }) => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState("");


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
                Patient profile
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial">User name: {user.first_name + " " + user.last_name}</Typography>
                    </div>

                </div>

                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial">Gender: {user.gender}</Typography>
                    </div>
                </div>

                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial">Date of birth: {user.dateOfBirth}</Typography>
                    </div>
                </div>
                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial">Blood type: {user.bloodType}</Typography>
                    </div>
                </div>

                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial"> Diseases {`(if any)`}: {user.diseases[0]}, {user.diseases[1]}</Typography>
                    </div>
                </div>

                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial"> Allergy {`(if any)`}: {user.allergy}</Typography>
                    </div>
                </div>

                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial">Address: {user.address}, {user.city}</Typography>
                    </div>
                </div>
            
                
                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial">Contact no.: {user.contact_no}</Typography>
                    </div>
                </div>
            
                
                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <Typography variant="h8" color="initial">Emergency Contact no.: {user.emergencyContact}</Typography>
                    </div>
                </div>
            
                
                <Box style={{ height: '15px' }}></Box>

                <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                    <Button type="button" color="primary" variant="contained" style={{marginTop: '10px' }}
                        onClick={onClose}>Close</Button>
                </div>

            

            </DialogContent>

            <Snackbar
                open={openMessage}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={message === "Password changed successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ViewPatientDetailsPopup;

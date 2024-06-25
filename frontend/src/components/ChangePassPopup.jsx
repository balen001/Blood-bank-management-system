import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const ChangePassPopup = ({ open, onClose, user }) => {
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

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Change password
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">User name: {user.first_name + " " + user.last_name}</Typography>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Email: {user.email}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '5px' }}></Box>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Role: {user.userType}</Typography>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Hospital: {user.userHospital}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '10px' }}></Box>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <TextField variant="outlined" label="New Password for the user"
                        type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth style={{ marginRight: '10px' }} />

                        <TextField variant="outlined" label="Confirm the new password user"
                        type="password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            fullWidth />
                    </div>

                    <Box style={{ height: '10px' }}></Box>

                    <TextField variant="outlined"
                        label="Enter your email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        fullWidth />

                    <Box style={{ height: '5px' }}></Box>

                    <TextField variant="outlined"
                        type="password"
                        label="Enter your password"
                        value={adminPass}
                        onChange={(e) => setAdminPass(e.target.value)}
                        fullWidth />

                    <Box style={{ height: '10px' }}></Box>

                    <Button type="submit" color="primary" variant="contained" style={{ marginTop: '10px' }}>Submit</Button>
                </form>
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

export default ChangePassPopup;

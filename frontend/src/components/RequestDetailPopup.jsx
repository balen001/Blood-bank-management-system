import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const RequestDetailPopup = ({ open, onClose, request }) => {
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

    const handleResult = async (e, result) => {
        e.preventDefault();


        const resultData = {
            result: result,
            requestId: request,
            id: request,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/changeuserpassword/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                },
                body: JSON.stringify(resultData),
            });

            if (response.ok) {
                setOpenMessage(true);
                setMessage("Request updated successfully");
                setPassword('');
                setConfPassword('');
            } else {
                console.error('Failed to update request');
                setMessage("Failed to update request");
                setOpenMessage(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.toString());
            setOpenMessage(true);
        }

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
                <form>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Request Date: {request.patientFirstName + " " + request.patientLastName}</Typography>
                        </div>

                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Requested Amount: {request.neededAmount}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Request Reason: {request.requestReason}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Requested blood type: {request.patientBloodType}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <Typography variant="h8" color="initial">Status: {request.status}</Typography>
                        </div>
                    </div>

                    <Box style={{ height: '15px' }}></Box>

                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <Button type="button" variant="contained" style={{ backgroundColor: '#f44336', marginTop: '10px' }}
                            onClick={(e) => handleResult(e, { result: 'Reject' })}>Reject</Button>

                        <Box width={75}></Box>

                        <Button type="button" onClick={(e) => handleResult(e, { result: 'Accept' })} 
                        color="primary" variant="contained" style={{ backgroundColor: '#4CAF50', 
                        color: 'white', marginTop: '10px' }}>Approve</Button>
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

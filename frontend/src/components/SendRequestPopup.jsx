import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, MenuItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const SendRequestPopup = ({ open, onClose, userId }) => {
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [requestReason, setRequestReason] = useState('');
    const [neededAmount, setNeededAmount] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMessage(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            neededAmount: neededAmount,
            patient: userId,
            requestReason: requestReason,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/patient/createrequest/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                setOpenMessage(true);
                setMessage("Request sent successfully");
            } else {
                console.error('Failed to send request');
                setMessage("Failed to send request");
                setOpenMessage(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.toString());
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


                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" color="initial">Request Amount:</Typography>
                        <Select
                            value={neededAmount}
                            onChange={(e) => setNeededAmount(e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </Box>

                    <Box height="15px"></Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" color="initial">Request Reason:</Typography>
                        
                        <TextField
                            value={requestReason}
                            onChange={(e) => setRequestReason(e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline  
                            rows={2} 
                        />
                    </Box>


                    <Box height="15px"></Box>

                    <Box display="flex" justifyContent="center" flexDirection="row" alignItems="center">

                        
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{ backgroundColor: '#4CAF50', color: 'white', marginTop: '10px', width: 100}}
                        >
                            Send
                        </Button>
                    </Box>
                </form>
            </DialogContent>

            <Snackbar
                open={openMessage}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={message === "Request sent successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default SendRequestPopup;

import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ACCESS_TOKEN } from "../constants";

const SetDonorAppointmentPopup = ({ open, onClose, personEmail }) => {

    console.log("person email: ", personEmail)
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeSlots, setTimeSlots] = useState([
        '09:00 AM - 09:25 AM',
        '09:30 AM - 09:55 AM',
        '10:00 AM - 10:25 AM',
        '10:30 AM - 10:55 AM',
        '11:00 AM - 11:25 AM',
        '11:30 PM - 11:55 PM',
        '12:00 PM - 12:25 PM',
        '12:30 PM - 12:55 PM',
        '01:00 PM - 01:25 PM',
        '01:30 PM - 01:55 PM',
        '02:00 PM - 02:25 PM',
        '02:30 PM - 02:55 PM',
        '03:00 PM - 03:25 PM',
        '03:30 PM - 03:55 PM',
    ]);

    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const [date, setDate] = useState(dayjs());
    const [timeValue, setTimeValue] = useState(dayjs());

    useEffect(() => {
        // Fetch initial time slots when component mounts
        fetchTakenTimeslots(date);
    }, []); // Empty dependency array ensures it runs once on mount

    // Fetch time slots whenever date changes
    useEffect(() => {
        fetchTakenTimeslots(date);
    }, [date]); // Runs whenever `date` changes

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMessage(false);
    };

    const fetchTakenTimeslots = async (selectedDate) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/appointments/takentimeslots/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                },
                body: JSON.stringify({ date: selectedDate.format('YYYY-MM-DD') }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched taken timeslots:', data);
                const availableSlots = timeSlots.filter(slot => !data.includes(slot));
                setAvailableTimeSlots(availableSlots);
                console.log('Available timeslots:', availableSlots);
            } else {
                console.error('Failed to fetch taken timeslots');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const appointmentData = {
            date: date.format('YYYY-MM-DD'),
            start_time: startTime,
            end_time: endTime,
            email: personEmail
        };
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/setappointment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                },
                body: JSON.stringify(appointmentData)
            });
    
            const responseData = await response.json(); // This can help debug server response
    
            if (response.ok) {
                setOpenMessage(true);
                setMessage("Appointment set successfully");
                setStartTime('');
                setEndTime('');
            } else {
                console.error('Failed to set appointment:', responseData); // Log detailed error response
                setMessage("Failed to set appointment");
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
                Set appointment
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" alignItems="center">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="date"
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue); // Update date state
                                    }}
                                    minDate={dayjs(new Date())}
                                    maxDate={dayjs(new Date()).add(15, 'day')}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="time-slot-select-label">Time Slot</InputLabel>
                                    <Select
                                        labelId="time-slot-select-label"
                                        id="time-slot-select"
                                        value={timeValue}
                                        onChange={(e) => {
                                            setTimeValue(e.target.value);
                                            setStartTime(e.target.value.split(' - ')[0]);
                                            setEndTime(e.target.value.split(' - ')[1]);
                                        }}
                                    >
                                        {availableTimeSlots.map((slot, index) => (
                                            <MenuItem key={index} value={slot}>{slot}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>

                    <Box style={{ height: '10px' }} />

                    <Box style={{ height: '5px' }} />

                    <Box style={{ height: '10px' }} />

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
                <Alert onClose={handleClose} severity={message === "Appointment set successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default SetDonorAppointmentPopup;

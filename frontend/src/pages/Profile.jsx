import React from 'react';
import DonorProfile from './Donor/DonorProfile';
import PatientProfile from './Patient/PatientProfile';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import { Container, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';




function Profile() {


    const location = useLocation();
    let user_type = location.state ? location.state.user_type : null;
    let userId = location.state ? location.state.userId : null;

    // If user_type is null, try to get it from localStorage
    if (!user_type || !userId) {
        user_type = localStorage.getItem('user_type');
        userId = localStorage.getItem('userId');
    } else {
        // If user_type is not null, store it in localStorage
        localStorage.setItem('user_type', user_type);
        localStorage.setItem('userId', userId);
    }

    if (user_type === 'donor') {
        return <DonorProfile />;
    } else if (user_type === 'patient') {
        return <PatientProfile/>; //for now later we will add patient appointments
    }

    // Return a default component or null if user_type is not 'donor' or 'patient'
    return null;
}

export default Profile;





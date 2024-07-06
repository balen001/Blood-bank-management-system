import React, { useState, useEffect } from 'react';
import DonorSideNav from '../../components/DonorSideNav';
import PatientSideNav from '../../components/PatientSideNav';
import AdminSideNav from '../../components/AdminSideNav';
import NavBar from '../../components/NavBar';
import Box from '@mui/material/Box';
import { Container, Typography, Grid, TextField, Button, MenuItem, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import { ACCESS_TOKEN } from '../../constants';

const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const bloodOptions = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
];





const diseaseOptions = [
  { value: 'None', label: 'None' },
  { value: 'HIV/AIDS', label: 'HIV/AIDS' },
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Hypothyroidism', label: 'Hypothyroidism' },
  { value: 'Hepatitis B', label: 'Hepatitis B' },
  { value: 'Hepatitis C', label: 'Hepatitis C' },
  { value: 'Cancer', label: 'Cancer' },
  { value: 'Heart Disease', label: 'Heart Disease' },
  { value: 'Chronic Kidney Disease', label: 'Chronic Kidney Disease' },
  { value: 'Multiple Sclerosis', label: 'Multiple Sclerosis' },
  { value: 'Lupus', label: 'Lupus' },
  { value: 'Hemophilia', label: 'Hemophilia' },
  { value: 'Sickle Cell Disease', label: 'Sickle Cell Disease' },
  { value: 'Chagas Disease', label: 'Chagas Disease' },
  { value: 'Epilepsy', label: 'Epilepsy' }
];


let message = ''


function DonorProfile() {






  const [loading, setLoading] = useState(true); // State to manage loading state
  const [userData, setUserData] = useState({
    address: '',
    city: '',
    bloodType: '',
    diseases: [''],
    emergencyContact: '',
  });

  const [isEmergencyEditable, setIsEmergencyEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [isCityEditable, setIsCityEditable] = useState(false);
  const [isBloodEditable, setIsBloodEditable] = useState(false);
  const [isDiseaseEditable, setIsDiseaseEditable] = useState(false);
  const [isDisease2Editable, setIsDisease2Editable] = useState(false);



  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchDonorData = async (donorId) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donor/${donorId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData({
            address: data.address || '',
            city: data.city || '',
            email: data.email || '',
            contact_no: data.contact_no || '',
            bloodType: data.bloodType || '',
            emergencyContact: data.emergencyContact || '',
            diseases: [...data.diseases] || [''],
          });
          setLoading(false); // Set loading to false after successful fetch
        } else {
          console.error('Failed to fetch donor data');
        }
      } catch (error) {
        console.error('Error fetching donor data:', error);
      }
    };

    fetchDonorData(localStorage.getItem('userId'));
  }, []);

  const handleDiseaseChange = (event, index) => {
    const newDiseases = [...userData.diseases];
    newDiseases[index] = event.target.value;
    setUserData({ ...userData, diseases: newDiseases });
  };


  //update profile
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/donor/updateprofile/${localStorage.getItem('userId')}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        body: JSON.stringify(userData),
        // console: console.log("userData", JSON.stringify(userData))
      });
      if (response.ok) {
        console.log('Update successful');
        message = "Profile updated successfully"
        setOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        console.error('Failed to update profile');
        message = "Failed to update profile"
        setOpen(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      message = "Error updating profile"
      setOpen(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state until data is fetched
  }

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> :
          localStorage.getItem('user_type') === 'patient' ? <PatientSideNav /> : localStorage.getItem('user_type') === 'admin' ? <AdminSideNav /> : null}
        <Box component="main" sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
          <FormContainer maxWidth="md">
            {/* --- */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Address
            </Typography>
            <Box mt={3}></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth
                    label="Address"
                    variant="outlined"
                    placeholder="Enter your home address"
                    value={userData.address}
                    InputProps={{
                      disabled: !isAddressEditable,
                    }}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => setIsAddressEditable(prev => !prev)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="City" variant="outlined" placeholder="City"
                    value={userData.city}
                    InputProps={{
                      disabled: !isCityEditable,
                    }}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => setIsCityEditable(prev => !prev)}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* medical information */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Medical information 
            </Typography>
            <Box mt={3}></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="Blood type"
                    variant="outlined"
                    value={userData.bloodType}
                    onChange={(e) => setUserData({ ...userData, bloodType: e.target.value })}
                    InputProps={{
                      disabled: !isBloodEditable,
                    }}
                    select>
                    {bloodOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => setIsBloodEditable(prev => !prev)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="Disease-1"
                    variant="outlined"
                    value={userData.diseases[0]}
                    onChange={(e) => handleDiseaseChange(e, 0)}
                    InputProps={{
                      disabled: !isDiseaseEditable,
                    }}
                    select>
                    {diseaseOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => setIsDiseaseEditable(prev => !prev)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="Disease-2"
                    variant="outlined"
                    value={userData.diseases[1]}
                    onChange={(e) => handleDiseaseChange(e, 1)}
                    InputProps={{
                      disabled: !isDisease2Editable,
                    }}
                    select>
                    {diseaseOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => setIsDisease2Editable(prev => !prev)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth
                    label="Emergency contact"
                    variant="outlined"
                    placeholder="+(964) 7501234567"
                    value={userData.emergencyContact}
                    type="tel"
                    onChange={(e) => setUserData({ ...userData, emergencyContact: e.target.value })}
                    InputProps={{
                      disabled: !isEmergencyEditable,
                    }}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => setIsEmergencyEditable(prev => !prev)}
                  />
                </Box>
              </Grid>
            </Grid>

            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleUpdate}>
              Save All
            </Button>
          </FormContainer>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={open && message.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default DonorProfile;

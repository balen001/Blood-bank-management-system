import React from 'react';
import DonorSideNav from '../components/DonorSideNav';
import PatientSideNav from '../components/PatientSideNav';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import { Container, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AdminSideNav from '../components/AdminSideNav';








const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));






function StaffProfile() {



 
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [isCityEditable, setIsCityEditable] = useState(false);
  const [isZipEditable, setIsZipEditable] = useState(false);



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
                <Box display="flex" alignItems="center">  {/*defaultValue={"shaqlawa"}  the default value should be the current info of the user*/}
                  <TextField fullWidth
                    label="Address"
                    variant="outlined"
                    placeholder="Enter your home address"
                    InputProps={{
                      disabled: !isAddressEditable,
                    }} />
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsAddressEditable(isAddressEditable => !isAddressEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>

                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="City" variant="outlined" placeholder="City"
                    InputProps={{
                      disabled: !isCityEditable,
                    }}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsCityEditable(isCityEditable => !isCityEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="ZIP" variant="outlined" placeholder="ZIP"
                    InputProps={{
                      disabled: !isZipEditable,
                    }} />
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsZipEditable(isZipEditable => !isZipEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>
                </Box>
              </Grid>
            </Grid>


            <Button variant="contained" color="primary" sx={{ mt: 4 }}>
              {/* you should check if mandatory fields are empty or not before allowing to save. */}
              Save All
            </Button>
          </FormContainer>
        </Box>

      </Box>

    </>



  );
}

export default StaffProfile;





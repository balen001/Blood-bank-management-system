import React from 'react';
import DonorSideNav from '../components/DonorSideNav';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import { Container, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AdminSideNav from '../components/AdminSideNav';
import PatientSideNav from '../components/PatientSideNav';
import DoctorSideNav from '../components/DoctorSideNav';







const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];






function Account() {

  const [value, setValue] = React.useState(dayjs()); // the format is: '2024-04-17' Don't forget to make the initial value the birthday of the user

  const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
  const [isLastNameEditable, setIsLastNameEditable] = useState(false);
  const [isBirthdateEditable, setIsBirthdateEditable] = useState(false);
  const [isGenderEditable, setIsGenderEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);



  return (


    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
      {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> :
                    localStorage.getItem('user_type') === 'patient' ? <PatientSideNav /> : localStorage.getItem('user_type') === 'admin' ? <AdminSideNav /> :
                    localStorage.getItem('user_type') === 'doctor' ? <DoctorSideNav /> : null}
        <Box component="main" sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
          <FormContainer maxWidth="md">
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              General Information
            </Typography>
            <Box mt={3}></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="First Name"
                    variant="outlined"
                    placeholder="Enter your first name"
                    InputProps={{
                      disabled: !isFirstNameEditable,
                    }}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsFirstNameEditable(isFirstNameEditable => !isFirstNameEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth
                    label="Last Name"
                    variant="outlined"
                    placeholder="Enter your last name"
                    InputProps={{
                      disabled: !isLastNameEditable,
                    }}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsLastNameEditable(isLastNameEditable => !isLastNameEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>

                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <TextField fullWidth label="Birthday" variant="outlined" placeholder="mm/dd/yyyy" type="date" InputLabelProps={{ shrink: true }} /> */}
                <Box display="flex" alignItems="center">
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker

                        label="Birthdate"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                        disabled={!isBirthdateEditable}

                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsBirthdateEditable(isBirthdateEditable => !isBirthdateEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth
                    label="Gender"
                    variant="outlined"
                    defaultValue={"male"}
                    InputProps={{
                      disabled: !isGenderEditable,
                    }}
                    select>
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsGenderEditable(isGenderEditable => !isGenderEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="Email" variant="outlined" placeholder="name@company.com" type="email"
                    InputProps={{
                      disabled: !isEmailEditable,
                    }}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsEmailEditable(isEmailEditable => !isEmailEditable)}
                    sx={{ width: '10px' }}
                  >
                  </Button>

                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="Phone" variant="outlined" placeholder="+(964) 7501234567" type="tel"
                    InputProps={{
                      disabled: !isPhoneEditable,
                    }}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    // sx={{ ml: 1 }}
                    size="small"
                    onClick={() => setIsPhoneEditable(isPhoneEditable => !isPhoneEditable)}
                    sx={{ width: '10px' }}>

                  </Button>
                </Box>

              </Grid>

            </Grid>
            {/* ----- */}

            <Button variant="contained" color="primary" sx={{ mt: 4 }}>
              Update
            </Button>  {/* Note: required info's should not be left emptied if left empty then don't update the required info. Check database for that */}


            <Box mt={5}></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Grid item xs={12} sm={5.84}>
                  <TextField fullWidth label="Current password" variant="outlined" placeholder="Type current password" type="password" />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="New password" variant="outlined" placeholder="Type new password" type="password" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Retype new Password" variant="outlined" placeholder="Retype new password" type="password" />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 4 }}>
              Change Password
            </Button>
          </FormContainer>
        </Box>

      </Box>

    </>



  );
}

export default Account;





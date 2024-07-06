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
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AdminSideNav from '../components/AdminSideNav';
import PatientSideNav from '../components/PatientSideNav';
import DoctorSideNav from '../components/DoctorSideNav';
import ReceptionistSideNav from '../components/ReceptionistSideNav';
import { ACCESS_TOKEN } from '../constants';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';






const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];




let message = ''

function Account() {

  const [open, setOpen] = useState(false);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);

  };

  // const [value, setValue] = React.useState(dayjs()); // the format is: '2024-04-17' Don't forget to make the initial value the birthday of the user

  const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
  const [isLastNameEditable, setIsLastNameEditable] = useState(false);
  const [isBirthdateEditable, setIsBirthdateEditable] = useState(false);
  const [isGenderEditable, setIsGenderEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);


  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    dateOfBirth: '',
    email: '',
    contact_no: '',
    gender: ''
  });

  useEffect(() => {
    // Fetch superuser data on component mount
    fetchUserData();
  }, []);


  const fetchUserData = async () => {
    try {
      //   const response = await fetch('http://127.0.0.1:8000/api/admin/getsuperuser/');
      const response = await fetch(`http://127.0.0.1:8000/api/user/${localStorage.getItem('userId')}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        setUserData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          contact_no: data.contact_no || '',
          dateOfBirth: data.dateOfBirth || '',
          gender: data.gender || ''
        });

        console.log(userData)


      } else {

        console.error('Failed to fetch superuser data');
      }
    } catch (error) {
      message = `${error}`;
      setOpen(true);
      console.error('Error fetching superuser data:', error);
    }
  };






  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/updateuseraccount/${localStorage.getItem('userId')}/`, {
        
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        body: JSON.stringify(userData),
        console: console.log("userData", JSON.stringify(userData))
      });
      if (response.ok) {
        console.log('Update successful');
        message = "Account updated successfully"
        setOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        console.error('Failed to update account');
        message = "Failed to update account"
        setOpen(true);
      }
    } catch (error) {
      console.error('Error updating account:', error);
      message = "Error updating account"
      setOpen(true);
    }
  };



  const [userPass, setUserPass] = useState({
    current_password: '',
    new_password: '',
    id: localStorage.getItem('userId')
});

const [confUserPass, setConfUserPass] = useState({
    retype_password: '',
});






const handleChangePass = async () => {

    if (userPass.new_password !== confUserPass.retype_password) {
        message = "Passwords do not match";
        setOpen(true);
        console.error('Passwords do not match');
        return;
    }
    else {

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/changepassword/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                },
                body: JSON.stringify(userPass),
            });
            if (response.ok) {
                console.log('Update pass successfully');
                message = "Password updated successfully";
                setOpen(true);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                
            } else {
                message = "Failed to update password";
                setOpen(true);
                console.error('Failed to update password');
            }
        } catch (error) {
            message = `${error}`;
            setOpen(true);
            console.error('Error updating password:', error);
        }

    }

};






  return (


    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> :
          localStorage.getItem('user_type') === 'patient' ? <PatientSideNav /> : localStorage.getItem('user_type') === 'admin' ? <AdminSideNav /> :
            localStorage.getItem('user_type') === 'doctor' ? <DoctorSideNav /> : localStorage.getItem('user_type') === 'receptionist' ? <ReceptionistSideNav /> : null}

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
                    value={userData.first_name}
                    onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
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
                    value={userData.last_name}
                    onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
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
                        value={dayjs(userData.dateOfBirth)}
                        onChange={(newValue) => setUserData(prevState => ({ ...prevState, dateOfBirth: newValue.format('YYYY-MM-DD') }))}
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
                    value={userData.gender}
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
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
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
                    value={userData.contact_no}
                    onChange={(e) => setUserData({ ...userData, contact_no: e.target.value })}
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

            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleUpdate}>
              Update
            </Button>  {/* Note: required info's should not be left emptied if left empty then don't update the required info. Check database for that */}


            <Box mt={5}></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Grid item xs={12} sm={5.84}>
                  <TextField fullWidth label="Current password" variant="outlined" placeholder="Type current password" 
                  onChange={(e) => setUserPass({ ...userPass, current_password: e.target.value })}
                  type="password" />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="New password" variant="outlined" placeholder="Type new password" type="password"
                onChange={(e) => setUserPass({ ...userPass, new_password: e.target.value })}
                />
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Retype new Password" variant="outlined" 
                placeholder="Retype new password"
                onChange={(e) => setConfUserPass({ ...confUserPass, retype_password: e.target.value })}
                type="password" />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleChangePass}>
              Change Password
            </Button>
          </FormContainer>
        </Box>

      </Box>


      <div>

        {

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity={message === "Account updated successfully" || message === "Password updated successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        }


      </div>

    </>



  );
}

export default Account;





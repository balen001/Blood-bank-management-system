import React from 'react';
import DonorSideNav from '../../components/DonorSideNav';
import Box from '@mui/material/Box';
import NavBar from '../../components/NavBar';
import { Container, Typography, Grid, TextField, Button, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AdminSideNav from '../../components/AdminSideNav';
import PatientSideNav from '../../components/PatientSideNav';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { redirect } from 'react-router-dom';




//  {

//              "first_name": "Balen",     y
//              "last_name": "Ahmed",       y
//              "email": "receptionist@gmail.com",  y
//              "password": "Slaw@1212",            y
//               "contact_no": "+9647503068963",    y
//               "dateOfBirth": "2000-01-01",   y
//               "gender": "Male",              y
//               "hospital": 17    //Remember 17 is a number NOT string!!!!!!!!!!!!!!!!!!!!!!!

//      }



const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];


let message = 'Account created successfully';












function AddReceptionist() {

  const [value, setValue] = React.useState(dayjs()); // the format is: '2024-04-17' Don't forget to make the initial value the birthday of the user

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);

  };



  const [fName, setfName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [gender, setGender] = useState('male');
  const [hospital, setHospital] = useState();



  const [hospitalOptions, setHospitalOptions] = useState([{}]);




  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/hospitals/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log("Fetched data:", data);
        setHospitalOptions(data);

      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    console.log("Updated hospitalOptions:", hospitalOptions);
  }, [hospitalOptions]);







  const handleSubmit = async (e) => {
    e.preventDefault();

    const receptionistData = {
      first_name: fName,
      last_name: lName,
      email: email,
      password: password,
      contact_no: contactNo,
      dateOfBirth: value.format('YYYY-MM-DD'),
      gender: gender,
      hospital: hospital
    };


    // console.log(receptionistData)
    if (password === confirmPassword) {

      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/addreceptionist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
          },
          body: JSON.stringify(receptionistData),
        });

        if (response.ok) {

          console.log("response ok")
          console.log(response.data)

          // setOpen(true);
          const creationData = await response.json();
          message = "Account created successfully"
          setOpen(true);

          setTimeout(() => window.location.reload(), 5000);  //refresh on success


        } else {
          // Handle errors (e.g., show error message)
          setOpen(true);
          console.error('Failed to add Receptionist');
          message = 'Failed to add Receptionist';
        }
      } catch (error) {
        setOpen(true);
        message = error;
        console.error('Error:', error);

        // Handle request error (e.g., show error message)
      }


    }

    else {
      message = 'Passwords don\'t match.';
      setOpen(true);
      
    }

  };










  // Handle change for password field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle change for confirm password field
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };





  return (




    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        {localStorage.getItem('user_type') === 'donor' ? <DonorSideNav /> :
          localStorage.getItem('user_type') === 'patient' ? <PatientSideNav /> : localStorage.getItem('user_type') === 'admin' ? <AdminSideNav /> : null}
        <Box component="main" sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
          <FormContainer maxWidth="md">
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Add Receptionist
            </Typography>
            <Box mt={3}></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="First Name"
                    value={fName}
                    onChange={(e) => setfName(e.target.value)}
                    variant="outlined"
                    placeholder="Enter first name"

                  />

                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                    label="Last Name"
                    variant="outlined"
                    placeholder="Enter last name"

                  />


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


                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth

                    // value={gender}  //We've set the default when we initialized it so we don't need this
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                    variant="outlined"
                    defaultValue={"male"}

                    select>
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined" placeholder="name@company.com" type="email"

                  />

                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth label="Phone"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    variant="outlined" placeholder="+(964) 7501234567" type="tel"

                  />

                </Box>

              </Grid>

              <Grid item xs={6} sm={6}>
                <Box display="flex" alignItems="center">
                  <TextField fullWidth

                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    label="Hospital"
                    variant="outlined"
                    defaultValue={"Not available"}

                    select>
                    {hospitalOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>

                </Box>

              </Grid>

            </Grid>

            <Box mt={5}></Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="password" variant="outlined" placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                  type="password" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Retype new Password" variant="outlined" placeholder="Retype new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type="password" />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleSubmit}>
              Create Account
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
            <Alert onClose={handleClose} severity={message === "Account created successfully" ? 'success' : 'error'} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        }


      </div>

    </>



  );
}

export default AddReceptionist;





import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Box, Grid, Typography, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './parkingSpaceForm.css';

const defaultTheme = createTheme();

function ParkingSpaceForm() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [flowTokenAddress, setFlowTokenAddress] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [hourlyPrice, setHourlyPrice] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  }, []);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude}, ${longitude}`);
        },
        error => {
          console.error('Error getting current location:', error);
          // Handle error gracefully
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle lack of geolocation support gracefully
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send data to backend to create new parking space
    fetch('http://localhost:8080/parking/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: userName, 
        email: userEmail, 
        location: currentLocation, 
        flowTokenAddress, 
        month: selectedMonth,
        day: selectedDay,
        year: selectedYear,
        startTime: selectedStartTime, 
        endTime: selectedEndTime,
        hourlyPrice
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Parking space added successfully');
          // Redirect user to parking space list or perform any other actions
        } else {
          console.error('Error adding parking space:', response.statusText);
          // Handle errors, e.g., display error message to the user
        }
      })
      .catch(error => console.error('Error adding parking space:', error));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} sm={4} md={7} className="background" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ color: 'black', mt: 2 }}>
              List Your Parking Space
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nameInput"
                label="Name"
                type="text"
                value={userName}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailInput"
                label="Email Address"
                type="email"
                value={userEmail}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="flowTokenAddressInput"
                label="Flow Token Address"
                type="text"
                value={flowTokenAddress}
                onChange={(e) => setFlowTokenAddress(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="locationInput"
                label="Current Location"
                type="text"
                value={currentLocation || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="monthInput"
                label="Select Month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <MenuItem key={month} value={month}>
                    {month < 10 ? `0${month}` : month}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="dayInput"
                label="Select Day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <MenuItem key={day} value={day}>
                    {day < 10 ? `0${day}` : day}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                margin="normal"
                required
                fullWidth
                id="yearInput"
                label="Select Year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="startTimeInput"
                label="Start Time"
                type="time"
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="endTimeInput"
                label="End Time"
                type="time"
                value={selectedEndTime}
                onChange={(e) => setSelectedEndTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="hourlyPriceInput"
                label="Hourly Price"
                type="number"
                value={hourlyPrice}
                onChange={(e) => setHourlyPrice(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ParkingSpaceForm;

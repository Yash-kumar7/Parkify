import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableSortLabel } from '@mui/material';
import './parkingSpaceList.css'; // Import CSS file for styling

function ParkingSpaceList() {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // State to store sorting criteria
  const [sortOrder, setSortOrder] = useState('asc'); // State to store sorting order

  useEffect(() => {
    // Fetch parking spaces data from backend
    // Replace this with your actual backend API call
    fetch('http://localhost:8080/parking/all')
      .then(response => response.json())
      .then(data => {
        // Convert UTC times to local time and calculate total available time
        const updatedData = data.map(parkingSpace => {
          const startDate = new Date(parkingSpace.year, parkingSpace.month - 1, parkingSpace.day,  // Subtract 1 from month to match JavaScript's Date API
            parkingSpace.startTime.split(':')[0], parkingSpace.startTime.split(':')[1]); // Extract hours and minutes
          const endDate = new Date(parkingSpace.year, parkingSpace.month - 1, parkingSpace.day,  // Subtract 1 from month to match JavaScript's Date API
            parkingSpace.endTime.split(':')[0], parkingSpace.endTime.split(':')[1]); // Extract hours and minutes
          const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const totalHours = Math.abs(endDate - startDate) / 36e5; // Calculate total hours
          return {
            ...parkingSpace,
            startTime,
            endTime,
            totalHours
          };
        });
        setParkingSpaces(updatedData);
      })
      .catch(error => console.error('Error fetching parking spaces:', error));
  }, []);

  // Function to handle purchasing the parking space
  const handlePurchase = (id) => {
    // Implement logic to handle the purchase here
    console.log(`Purchasing parking space with ID: ${id}`);
  };

  // Function to handle sorting based on a specific column
  const handleSort = (column) => {
    if (column === sortBy) {
      // Toggle sorting order if the same column is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set sorting criteria to the clicked column and default to ascending order
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Sort the parking spaces based on the selected criteria and order
  const sortedParkingSpaces = parkingSpaces.slice().sort((a, b) => {
    const comparison = sortOrder === 'asc' ? 1 : -1;
    if (a[sortBy] < b[sortBy]) return -comparison;
    if (a[sortBy] > b[sortBy]) return comparison;
    return 0;
  });

  return (
    <div className="table-container">
      <h2 className="text-center">Parking Spaces Available</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortOrder}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={sortOrder}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'location'}
                  direction={sortOrder}
                  onClick={() => handleSort('location')}
                >
                  Location
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'flowTokenAddress'}
                  direction={sortOrder}
                  onClick={() => handleSort('flowTokenAddress')}
                >
                  Flow Token Address
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'year'}
                  direction={sortOrder}
                  onClick={() => handleSort('year')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'startTime'}
                  direction={sortOrder}
                  onClick={() => handleSort('startTime')}
                >
                  Start Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'endTime'}
                  direction={sortOrder}
                  onClick={() => handleSort('endTime')}
                >
                  End Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'totalHours'}
                  direction={sortOrder}
                  onClick={() => handleSort('totalHours')}
                >
                  Total Available Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'hourlyPrice'}
                  direction={sortOrder}
                  onClick={() => handleSort('hourlyPrice')}
                >
                  Hourly Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'parkingAvailable'}
                  direction={sortOrder}
                  onClick={() => handleSort('parkingAvailable')}
                >
                  Parking Availability
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedParkingSpaces.map(parkingSpace => (
              <TableRow key={parkingSpace.id}>
                <TableCell>{parkingSpace.name}</TableCell>
                <TableCell>{parkingSpace.email}</TableCell>
                <TableCell>{parkingSpace.location}</TableCell>
                <TableCell>{parkingSpace.flowTokenAddress}</TableCell>
                <TableCell>{parkingSpace.month}/{parkingSpace.day}/{parkingSpace.year}</TableCell>
                <TableCell>{parkingSpace.startTime}</TableCell>
                <TableCell>{parkingSpace.endTime}</TableCell>
                <TableCell>{isNaN(parkingSpace.totalHours) ? 'Not Available' : parkingSpace.totalHours.toFixed(2)} hours</TableCell>
                <TableCell>${parkingSpace.hourlyPrice}</TableCell>
                <TableCell>{parkingSpace.parkingAvailable ? 'Available' : 'Not Available'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handlePurchase(parkingSpace.id)}
                    disabled={!parkingSpace.parkingAvailable}
                    sx={{ width: '100px', height: '40px', fontSize: '16px', padding: '10px 20px' }} // Adjusted padding
                  >
                    {parkingSpace.parkingAvailable ? 'Buy' : 'Not Available'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ParkingSpaceList;

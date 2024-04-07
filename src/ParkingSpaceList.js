import React, { useState, useEffect } from 'react';
import './parkingSpaceList.css'; // Import CSS file for styling

function ParkingSpaceList() {
  const [parkingSpaces, setParkingSpaces] = useState([]);

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

  return (
    <div>
      <h1 className="text-center">Parking Spaces Available</h1>
      <table className="parking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Flow Token Address</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Available Time</th>
            <th>Hourly Price</th>
            <th>Parking Availability</th>
          </tr>
        </thead>
        <tbody>
          {parkingSpaces.map(parkingSpace => (
            <tr key={parkingSpace.id}>
              <td>{parkingSpace.name}</td>
              <td>{parkingSpace.email}</td>
              <td>{parkingSpace.location}</td>
              <td>{parkingSpace.flowTokenAddress}</td>
              <td>{parkingSpace.month}/{parkingSpace.day}/{parkingSpace.year}</td>
              <td>{parkingSpace.startTime}</td>
              <td>{parkingSpace.endTime}</td>
              <td>{isNaN(parkingSpace.totalHours) ? 'Not Available' : parkingSpace.totalHours.toFixed(2)} hours</td>
              <td>${parkingSpace.hourlyPrice}</td>
              <td>{parkingSpace.parkingAvailable ? 'Available' : 'Not Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParkingSpaceList;

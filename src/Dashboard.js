import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; // Import CSS file for styling

function Dashboard() {
    const [userName, setUserName] = useState('');
  
    useEffect(() => {
      // Retrieve user name from local storage
      console.log(localStorage.getItem('userName'));
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }, []); // Run once on component mount
  
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome to the Parkify Dashboard, {userName}!</h2>
        <div className="options-container">
          <Link to="/add-parking-space" className="option-button" title="Add a Parking Space">
            <img src="../add-parking-space.jpeg" alt="Add Parking Space" />
          </Link>
          <Link to="/see-parking-spaces" className="option-button" title="See Parking Spaces">
            <img src="see-parking-space.jpeg" alt="See Parking Spaces" />
          </Link>
        </div>
      </div>
    );
}

export default Dashboard;

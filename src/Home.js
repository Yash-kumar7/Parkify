import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Parkify App</h1>
      <h3>Find and rent parking spaces near you!</h3>
      <div className="auth-options">
        <Link to="/signup" className="auth-option">Sign Up</Link>
        <Link to="/login" className="auth-option">Sign In</Link>
      </div>
    </div>
  );
}

export default Home;

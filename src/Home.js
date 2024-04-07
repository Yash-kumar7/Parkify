import React, { useState } from 'react';
import './Home.css'; // Import CSS file for styling
import ChatModal from './ChatModal';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom'; // Import Link component for navigation

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([]);

  // Function to send user message
  const sendUserMessage = (message) => {
    setUserMessages([...userMessages, { id: userMessages.length, message }]);
    // Simulate bot response (replace with actual bot response logic)
    const botResponse = `Bot response to "${message}"`;
    setBotMessages([...botMessages, { id: botMessages.length, message: botResponse }]);
  };

  return (
    <div className="home-container">
      <div className="title-container">
        <h1>Welcome to Parkify App</h1>
        <h3 align='center'>Find and rent parking spaces near you!</h3>
      </div>
      {/* Sign-up and Sign-in buttons */}
      <div className="auth-options">
        <Link to="/signup" className="auth-option">Sign Up</Link>
        <Link to="/login" className="auth-option">Sign In</Link>
      </div>
      {/* Conditionally render the chat button */}
      {!isChatOpen && (
        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setIsChatOpen(true)}
          className="chat-button"
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          <ChatIcon />
        </Fab>
      )}
      {/* Render chat window if isChatOpen is true */}
      {isChatOpen && (
        <ChatModal
          onClose={() => setIsChatOpen(false)}
          userMessages={userMessages}
          botMessages={botMessages}
          sendUserMessage={sendUserMessage}
        />
      )}
    </div>
  );
}

export default Home;

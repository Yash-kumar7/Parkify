import React, { useState, useEffect } from 'react';
import './chatModal.css'; // Import CSS file for styling
import { IconButton, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person'; // User icon
import AndroidIcon from '@mui/icons-material/Android'; // Bot icon

function ChatModal({ onClose }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false); // State to track if a message is being sent

  // Function to handle user input and send message to chatbot
  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      setIsSending(true); // Set isSending to true when sending a message

      const response = await fetch('https://api.fireworks.ai/inference/v1/completions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer wqViAYODxfKu4rfG1juQGScxobA2WHlShniIySQMhjG2gOV5'
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v2-70b-chat",
          max_tokens: 512,
          top_p: 0.9,
          top_k: 50,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
          temperature: 0.9,
          prompt: 'Your name is Parky. You are created by Parkify. You will only answer question related to parking.'
        })
      });

      const data = await response.json();
      const botResponse = data.choices[0].text.trim();

      // Update chat messages with user message and chatbot response
      setChatMessages(prevMessages => [
        ...prevMessages,
        { text: messageInput, sender: 'user' },
        { text: botResponse, sender: 'bot' }
      ]);
      setMessageInput('');
      setIsSending(false); // Set isSending back to false after sending the message
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      setIsSending(false); // Ensure isSending is set back to false if there's an error
    }
  };

  // Function to display initial bot message when chat window opens
  useEffect(() => {
    setChatMessages([{ text: 'Hi, I am Parki. How may I help you?', sender: 'bot' }]);
  }, []);

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <div className="header-content">
          <h2>Chat with AI Assistant</h2>
          <IconButton className="close-button" onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-container">
        {chatMessages.map((message, index) => (
          <div key={index} className={`message-wrapper ${message.sender === 'user' ? 'user-message-wrapper' : 'bot-message-wrapper'}`}>
            {message.sender === 'user' ? <PersonIcon className="user-icon" /> : <AndroidIcon className="bot-icon" />}
            <div className={`chat-message ${message.sender === 'user' ? 'user-chat-message' : 'bot-chat-message'}`}>{message.text}</div>
            {isSending && message.sender === 'bot' && ( // Render loading indicator for bot messages when sending
              <div className="loading-indicator">
                <CircularProgress size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default ChatModal;

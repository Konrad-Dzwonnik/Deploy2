import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './MessagePage.css';

const MessagePage = () => {
  const { id: sitterId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = Cookies.get('SESSION'); 
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // const response = await axios.get(`http://localhost:3001/messages/${userId}/${sitterId}`);
        const response = await axios.get(`https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/messages/${userId}/${sitterId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [sitterId, userId]);

  const handleSendMessage = async () => {
    if (!newMessage) return;

    const messageData = {
      senderId: userId,
      recipientId: sitterId,
      content: newMessage,
      timestamp: new Date().toISOString() // Add the current timestamp
    };

    try {
      // await axios.post('http://localhost:3001/sendMessage', messageData);
      await axios.post('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/sendMessage', messageData);
      setMessages([...messages, messageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="chat-container">
      <h1>Chat with {sitterId}</h1>
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={message.senderId === userId ? 'message-outgoing' : 'message-incoming'}>
            <p>{message.content}</p>
            <div className="message-meta">
              <span>{message.senderId === userId ? 'You' : 'Sitter'}</span> - 
              <span>{formatTimestamp(message.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default MessagePage;

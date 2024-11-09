import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [_id, setID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "_id") {
      setID(e.target.value);
    } else if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:3001/register', {
        const response = await axios.post('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/register', {
        _id,
        firstName,
        lastName,
        email,
        phone,
        password
      });
  
      // Check if the response has the correct 
      if (response && response.data) {
        setMessage(response.data.message); // Success message from backend
        alert('Registered successfully');
        navigate('/');
      } else {
        setMessage('Unexpected response format'); // Handle any unexpected response formats
      }
    } catch (error) {
      console.error(error);
  
      // Check if there is a response from the server
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Error occurred');
      } else {
        setMessage('No response from server');
      }
    }
  };
  

  return (
    <div className="container">
      <div className="left-section">
        <img
          src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg" 
          alt="Registration Illustration"
        />
      </div>
      <div className="right-section">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="_id"
              value={_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emptySpace"></div>
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Register;

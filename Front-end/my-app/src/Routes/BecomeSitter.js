//--------------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './BecomeSitterPage.css';

const BecomeSitterPage = () => {
  const [_id, setID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "_id") setID(value);
    else if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "email") setEmail(value);
    else if (name === "phone") setPhone(value);
    else if (name === "state") setState(value);
    else if (name === "suburb") setSuburb(value);
    else if (name === "postcode") setPostcode(value);
    else if (name === "streetAddress") setStreetAddress(value);
  };


  const handleFileChange = (e) => {
    setImage(e.target.files[0]); 
  };

  useEffect(() => {
    const SESSION = Cookies.get('SESSION');
    if (!SESSION) {
      setMessage('Please log in to access this page.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_id', _id);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('state', state);
    formData.append('suburb', suburb);
    formData.append('postcode', postcode);
    formData.append('streetAddress', streetAddress);
    if (image) {
      formData.append('image', image); 
    }

    try {
      const response = await axios.post('https://back-enddeployment.onrender.com/BecomeSitter', formData, {
      //const response = await axios.post('http://localhost:3001/BecomeSitter', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response && response.data) {
        setMessage(response.data.message); 
        navigate('/FindSitter'); 
      } else {
        setMessage('Unexpected response format');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data.message || 'Error occurred');
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
        <h1>Become A Sitter</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="_id" value={_id} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" name="phone" value={phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input type="text" name="state" value={state} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Suburb:</label>
            <input type="text" name="suburb" value={suburb} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Postcode:</label>
            <input type="text" name="postcode" value={postcode} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Street Address:</label>
            <input type="text" name="streetAddress" value={streetAddress} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Select Image:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="file-input" />
            <button type="button" onClick={() => document.getElementById('file-input').click()}>Select Image</button>
          </div>
          <div className="emptySpace"></div>
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default BecomeSitterPage;

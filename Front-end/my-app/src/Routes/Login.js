import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [_id, setID] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "_id") {
      setID(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:3001/login', {_id, password});
      const response = await axios.post('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/login', {_id, password});
      // Store the token in Cookies
      const { SESSION } = response.data;
      Cookies.set('SESSION', SESSION);
      console.log("Login successful");
  
      // Redirect to the home page or dashboard after login
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError("Invalid username or password");
      
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="_id"
            value={_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

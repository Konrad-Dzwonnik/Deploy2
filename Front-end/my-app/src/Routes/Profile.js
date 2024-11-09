import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user1, setUser] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await axios.get('http://localhost:3001/Profile', { 
        //   withCredentials: true 
        // });
        const response = await axios.get('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/Profile', { 
          withCredentials: true 
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  // Handle loading state
  if (user1.length === 0 || !Array.isArray(user1)) { 
    return <div>Loading...</div>;
  }

  const user = user1[0]; 
console.log(user)
  return (
    <div>
      <h1>Profile: {user.firstName} {user.lastName}</h1>
      <div className="container2">
        <ul>
          <li key={user._id}>
            <h2>{user._id} {user.firstName} {user.lastName}</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};



export default ProfilePage; 

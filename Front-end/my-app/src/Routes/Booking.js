import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // You can later use this for getting the user's JWT token or userID
import { useNavigate, useLocation } from 'react-router-dom';

const BookingPage = () => {
    const location = useLocation();
    const { sitterId, sitterName } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch availability if sitterId exists
        if (sitterId) {
            const fetchAvailability = async () => {
                try {
                    const response = await axios.get('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/sitters/${sitterId}/availability');
                    //const response = await axios.get(`http://localhost:3001/sitters/${sitterId}/availability`);
                    // You can set availability if you want to display it, but it's not mandatory
                } catch (error) {
                    console.error('Error fetching availability:', error);
                }
            };

            fetchAvailability();
        }
    }, [sitterId]);

    const handleBooking = async () => {
        try {
            const bookingData = {
                sitterId,
                userId: "USER_ID" // Replace this with the actual user ID, e.g., decoded from JWT token in cookies
            };

            // Send booking request to backend
           // await axios.post('http://localhost:3001/bookings', bookingData);
           await axios.post('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/bookings', bookingData);
            alert('Booking successful!');
            navigate('/confirmation'); // Navigate to confirmation page after successful booking
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please try again.');
        }
    };

    return (
        <div>
            <h1>Booking Page</h1>
            {sitterId ? (
                <div>
                    <h2>Book {sitterName}</h2>
                    {/* You can display additional details here if needed */}
                    <button onClick={handleBooking}>Confirm Booking</button>
                </div>
            ) : (
                <p>No sitter selected.</p>
            )}
        </div>
    );
};

export default BookingPage;
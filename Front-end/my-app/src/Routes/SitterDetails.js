import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SitterDetailsPage.css';

const SitterDetails = () => {
  const [sitter, setSitter] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rating, setRating] = useState(0); // Star rating state
  const [comment, setComment] = useState(''); // Comment state
  const [reviews, setReviews] = useState([]); // Reviews state
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSitterDetails = async () => {
      try {
        // const response = await axios.get(`http://localhost:3001/FindSitter/${id}`);
        const response = await axios.get(`https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/FindSitter/${id}`);
        setSitter(response.data);
        // Fetch reviews for this sitter
        // const reviewsResponse = await axios.get(`http://localhost:3001/reviews/${id}`);
        const reviewsResponse = await axios.get(`https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/reviews/${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching sitter details:', error);
      }
    };
    fetchSitterDetails();
  }, [id]);

  const handleBooking = () => {
    navigate('/booking', {
      state: {
        sitterId: sitter._id,
        sitterName: `${sitter.firstName} ${sitter.lastName}`,
      }
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
  
    if (rating === 0) {
      alert('Please select a rating.');
      return;
    }
  
    try {
      // const response = await axios.post(`http://localhost:3001/reviews`, {
        const response = await axios.post(`https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/reviews`, {
        sitterId: sitter._id,
        rating,
        comment
      });
  
      if (response.status === 201) {
        // Update reviews state with the new review
        setReviews((prevReviews) => [...prevReviews, response.data]);
        // Reset rating and comment
        setRating(0);
        setComment('');
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  
  if (!sitter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sitter-details">
      <div className="sitter-content">
        {sitter.image && (
          <img
            // src={`http://localhost:3001/FindSitter/image/${sitter._id}`}
            src={`https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/FindSitter/image/${sitter._id}`}
            alt={`${sitter.firstName} ${sitter.lastName}`}
            className="sitter2-image"
          />
        )}
        <div className="sitter-info">
          <h1>{sitter.firstName} {sitter.lastName}</h1>
          <p><strong>Email:</strong> {sitter.email}</p>
          <p><strong>Phone:</strong> {sitter.phone}</p>
          <p><strong>State:</strong> {sitter.state}</p>
          <p><strong>Suburb:</strong> {sitter.suburb}</p>
          <p><strong>Postcode:</strong> {sitter.postcode}</p>
          <p><strong>Street Address:</strong> {sitter.streetAddress}</p>
          <h3>Available Slots:</h3>
          {Array.isArray(sitter.availability) && sitter.availability.length > 0 ? (
            <ul>
              {sitter.availability.map((slot, index) => (
                <li key={index}>
                  <strong>Date:</strong> {new Date(slot.date).toLocaleDateString()} <br />
                  <strong>Time:</strong> {slot.startTime} - {slot.endTime}
                </li>
              ))}
            </ul>
          ) : (
            <p>No available slots at this time.</p>
          )}
        </div>
      </div>
      <div className="sitter-actions">
        <button onClick={handleBooking} className="btn book-btn">Book This Sitter</button>
        <button onClick={() => navigate(`/messages/${id}`)} className="btn message-btn">Send Message</button>
      </div>
      <div>
        <h2>Reviews</h2>
        <form onSubmit={handleReviewSubmit}>
          <div>
            <label>Rating: </label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index}>
                <p><strong>Rating:</strong> {review.rating} ★ <strong>Comment:</strong> {review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SitterDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './FindSitterPage.css';

const FindSitterPage = () => {
  const [sitters, setSitters] = useState([]);
  const [filteredSitters, setFilteredSitters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [letterFilter, setLetterFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all'); // New state for rating filter
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSitters = async () => {
      try {
       // const response = await axios.get('http://localhost:3001/FindSitter');
       const response = await axios.get('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/FindSitter');
        const sittersWithRatings = await Promise.all(
          response.data.map(async (sitter) => {
            // Fetch the average rating for each sitter
            //const reviewsResponse = await axios.get(`http://localhost:3001/reviews/${sitter._id}`);
            const reviewsResponse = await axios.get('https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/reviews/${sitter._id}');
            const averageRating =
              reviewsResponse.data.length > 0
                ? reviewsResponse.data.reduce((sum, review) => sum + review.rating, 0) / reviewsResponse.data.length
                : 0;
            return { ...sitter, averageRating }; // Add average rating to sitter object
          })
        );
        setSitters(sittersWithRatings);
        setFilteredSitters(sittersWithRatings);
      } catch (error) {
        console.error('Error fetching sitters:', error);
      }
    };

    fetchSitters();
  }, []);

  useEffect(() => {
    const token = Cookies.get('SESSION');
    if (!token) {
      setMessage('Please log in to access this page.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleLetterFilterChange = (event) => {
    setLetterFilter(event.target.value);
  };

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };

  useEffect(() => {
    const filtered = sitters.filter((sitter) => {
      const fullName = `${sitter.firstName} ${sitter.lastName}`.toLowerCase();
      let filterCondition = true;

      if (letterFilter !== 'all') {
        filterCondition = fullName.includes(letterFilter);
      }

      if (ratingFilter !== 'all') {
        filterCondition = filterCondition && sitter.averageRating >= parseInt(ratingFilter);
      }

      return filterCondition && fullName.includes(searchTerm);
    });
    setFilteredSitters(filtered);
  }, [searchTerm, sitters, letterFilter, ratingFilter]);

  return (
    <div>
      <h1>Find A Sitter</h1>
      <div className="container2">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search Sitters..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select value={ratingFilter} onChange={handleRatingFilterChange}>
            <option value="all">All Ratings</option>
            <option value="1">1 Star & Above</option>
            <option value="2">2 Stars & Above</option>
            <option value="3">3 Stars & Above</option>
            <option value="4">4 Stars & Above</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <ul className="sitter-list">
          {filteredSitters.map((sitter) => (
            <li key={sitter._id} className="sitter-item">
              {sitter.image && (
                <img
                  //src={`http://localhost:3001/FindSitter/image/${sitter._id}`}
                  src={'https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com/image/${sitter._id}'}
                  alt={`${sitter.firstName} ${sitter.lastName}`}
                  className="sitter-image"
                />
              )}
              <h2>{sitter.firstName} {sitter.lastName}</h2>
              <p>State: {sitter.state}</p>
              <p>Suburb: {sitter.suburb}</p>
              <p>Average Rating: {sitter.averageRating.toFixed(1)} ★</p>
              <Link to={`/sitter/${sitter._id}`} className="btn">
                View Details
              </Link>
            </li>
          ))}
        </ul>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default FindSitterPage;

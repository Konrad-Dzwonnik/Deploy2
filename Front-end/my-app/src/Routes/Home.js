import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie';
import './HomePage.css'; // Import the CSS file for styling

// Check to see if someone is logged in; if not, grab the name from the decoded JWT token
const HomePage = () => {
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    const SESSION = Cookies.get("SESSION");
    if (SESSION) {
      const decodedToken = jwtDecode(SESSION); 
      setUsername(decodedToken._id); 
    }
  }, []); 

  return (
    <div className="page">
      <h1>Welcome to Pet Stay!</h1>
      <p>
        Pet Stay is a platform designed to connect pet owners with families or individuals who can care for their pets while they’re away. 
        It’s a simple and convenient way for pet owners to find trusted caregivers, while families can earn a passive income by looking after pets.
      </p>

      {username ? (
       <h2>Welcome back to Pet Stay, {username}!</h2>
      ) : (
        <h2>.</h2>
      )}

      <p>A sitter for every occasion</p>

      <div className="sitting-options">
  <div className="sitting-option">
    <h3>Hosting</h3>
    <img className="sitter-image" src="https://people.com/thmb/0nN_p-1sSabqWWhm3ExIxBKoR7s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(689x509:691x511)/happy-couple-petting-dog-100622-aba23ecfa8804ba9b88afb50ec9e7567.jpg" alt="Hosting" />
    <p>Your pet stays at your sitter’s home. The perfect petcation with all the creature comforts.</p>
  </div>

  <div className="sitting-option">
    <h3>Sitting</h3>
    <img className="sitter-image" src="https://media.istockphoto.com/id/1300658241/photo/young-man-is-playing-with-a-dog-and-do-selfie.jpg?s=612x612&w=0&k=20&c=3GuywLL9CeC7VRRcbH35ZRYLRtvmObrvmFjQqTgNjCE=" alt="Sitting" />
    <p>Your sitter stays with your pet in your home. Best in show care where your pet is most comfortable.</p>
  </div>

  <div className="sitting-option">
    <h3>Day care</h3>
    <img className="sitter-image" src="https://i.ytimg.com/vi/FHytoCvj90w/maxresdefault.jpg" alt="Day care" />
    <p>Busy day, no problems! Leave your pet with your sitter for the day and return to a happy furbaby.</p>
  </div>
</div>




      <h2>Why Choose Pet Stay?</h2>
      <p>
        Our platform is built on the foundation of trust and care. We understand that leaving your pet can be stressful, 
        which is why we thoroughly vet all of our sitters to ensure they meet our high standards of care. 
        We offer flexible options for pet sitting, whether you need a quick day-care solution or a longer-term overnight stay. 
      </p>
      <p>
        Our sitters are pet lovers themselves, and they treat every animal as if it were their own. With a focus on safety 
        and happiness, your furry friend will be well taken care of while you’re away.
      </p>

      <div class="page">
  
  <h1>Our Features</h1>
  <div class="features">
    <div class="feature-box">
      <h3>Trusted Caregivers</h3>
      <p>
        Each of our sitters goes through a rigorous vetting process, including background checks and personal interviews. 
        You can rest easy knowing that your pet is in safe hands.
      </p>
    </div>
    <div class="feature-box">
      <h3>Real-Time Updates</h3>
      <p>
        Stay connected with your pet through our app. Receive updates, photos, and messages from your sitter, so you know how your pet is doing at all times.
      </p>
    </div>
    <div class="feature-box">
      <h3>Flexible Booking</h3>
      <p>
        Whether you need last-minute care or want to schedule ahead of time, our platform allows you to book easily and efficiently.
      </p>
    </div>
    <div class="feature-box">
      <h3>24/7 Support</h3>
      <p>
        Our customer support team is available around the clock to assist you with any questions or concerns you may have about our services.
      </p>
    </div>
  </div>

  <h2>How It Works</h2>
  <div class="features">
    <div class="feature-box">
      <p>
        Getting started with Pet Stay is simple. Just follow these easy steps:
      </p>
      <ol>
        <li>Create an account and fill out your pet's profile.</li>
        <li>Browse through our list of verified sitters in your area.</li>
        <li>Choose a sitter that fits your needs and book your dates.</li>
        <li>Stay in touch with your sitter and enjoy peace of mind while you’re away!</li>
      </ol>
    </div>
  </div>
</div>

      <h2>Join the Pet Stay Community!</h2>
      <p>
        Sign up today and experience the joy of knowing your pet is cared for by someone you trust. 
        With Pet Stay, you can travel with confidence, knowing your furry friend is in good hands.
      </p>
    </div>
  );
};

export default HomePage;

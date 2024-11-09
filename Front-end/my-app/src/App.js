import './App.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AboutPage, LoginPage, ProfilePage, HomePage, BookingFamilyPage, BookingStayPage, RegisterPage, BecomeSitterPage, FindSitterPage, SitterDetailsPage, BookingPage, AddAvailabilityForm } from './Routes';
import { jwtDecode } from 'jwt-decode'; 
import SitterDetails from './Routes/SitterDetails';
import MessagePage from './Routes/MessagePage'

const Home = () => {
  return (
    <div className="page">
      <HomePage />
    </div>
  );
};

// const DisplayName = () => {
//   const [username, setUsername] = useState(null);
//   useEffect(() => {
//     const SESSION = Cookies.get("SESSION");
//     if (SESSION) {
//       const decodedToken = jwtDecode(SESSION); 
//       setUsername(decodedToken._id); 

//     }
//   }, []); 
// }

const About = () => {
  return (
    <div className="page">
      <AboutPage /> 
    </div>
  );
};

const Profile = () => {
  return (
    <div className="page">
      <ProfilePage />
    </div>
  );
};

const Login = () => {
  return (
    <div className="page">
      <LoginPage />
    </div>
    );
};

const BecomeSitter = () => {
  return (
    <div className="page">
      <BecomeSitterPage />
    </div>
  );
}

const FindSitter = () => {
  return (
    <div className="page">
      <FindSitterPage />
    </div>
  );
}

const Booking = () => {
  return (
    <div className="page">
      <BookingPage />
    </div>
  )
}

const AddAvailability = () => {
  return (
    <div className="page">
      <AddAvailabilityForm />
    </div>
  )
}

const Register = () => {
  return (
    <div className="page">
      <RegisterPage />
    </div>
  );
}

const Logout = () => {
  Cookies.remove('SESSION');
  
  window.location.href = '/';
};

const App = () => {

  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const SESSION = Cookies.get("SESSION");
    if (SESSION) {
      setloggedIn(true);
      console.log('true')
    } else {
      setloggedIn(false);
      console.log('false')
    }
  }, []);
 
  return (
    <div className="App">

      <Router>
        <header className="App-header">
          <h1>Pet Stay</h1>

          <nav>
            <ul>
              <li key='a'><Link to="/">Home</Link></li>
              <li key ='b'><Link to="/About">About</Link></li>
              <li key ='c'><Link to="/FindSitter">Find A Sitter</Link></li>
              <li key ='d'><Link to="/BecomeSitter">Become A Sitter</Link></li>
              <li key ='e'><Link to="/Register">Register</Link></li>
            </ul>
          </nav>
          <nav>
          <ul style={{ display: 'flex', justifyContent: 'flex-end' }}>

          {!loggedIn && <li key ='a'><Link to="/Login">Login</Link></li>}
          {loggedIn && <li key ='b'><Link to="/Profile">
          Profile</Link></li>}
          {loggedIn && <li><button onClick={Logout}>Logout</button></li>}

             {/* {DisplayName ? (
        <p>Welcome back to Pet Stay {DisplayName}!</p>
      ) : (
        <p>Welcome to our pet stay.</p>
      )} */}
          </ul>
          </nav>
        </header>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/FindSitter" element={<FindSitter />} />
          <Route path="/BecomeSitter" element={<BecomeSitter />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/find-sitter" element={<FindSitterPage />} />
          <Route path="/sitter/:id" element={<SitterDetails />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/sitter/:id/add-availability" element={<AddAvailability />} />
          <Route path="/messages/:id" element={<MessagePage />} />
        </Routes>

      </Router>
    </div>
  );
};

export default App;
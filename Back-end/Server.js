const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const loginData = require('./LoginSchema');
const Booking = require('./BookingSchema');
const SitterData = require('./BecomeSitterSchema');
require('dotenv').config();


//---------------------------------------------


const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    res.send({ message: 'Image uploaded successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



//----------------

app.get('/FindSitter/image/:id', async (req, res) => {
  try {
    const sitter = await SitterData.findById(req.params.id);
    if (!sitter || !sitter.image) {
      return res.status(404).send('Image not found');
    }
    res.set('Content-Type', sitter.image.contentType); 
    res.send(sitter.image.data); 
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Server error');
  }
});


app.post('/:id/add-availability', async (req, res) => {
  try {
    const { availability } = req.body;
    const sitterId = req.params.id; 

    const sitter = await SitterData.findById(sitterId);
    if (!sitter) {
      return res.status(404).json({ error: 'Sitter not found' });
    }

    sitter.availability = [...sitter.availability, ...availability];
    await sitter.save();

    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


//----------------
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 
    'https://group-project-gwdp-wednesday-5pm-idk-how-4bid.onrender.com', 
    'https://group-project-gwdp-wednesday-5pm-idk-how-djw7.onrender.com', 
    'https://group-project-gwdp-wednesday-5pm-idk-how-b10i.onrender.com',
    'https://group-project-gwdp-wednesday-5pm-idk-how-cx5n.onrender.com',
    'https://deploy2-en89.onrender.com',
    'https://back-enddeployment.onrender.com'],
  credentials: true,
}

));
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET; 

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

/* LOGIN */
app.post('/login', async (req, res) => {
  const { _id, password } = req.body;

  try {
    const user = await loginData.findOne({ _id });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

 const SESSION = jwt.sign({ _id: user._id }, SECRET_KEY);
 console.log('wehazcookie2')
 return res.json({ SESSION: SESSION, message: "Login successful" });
} catch (error) {
 console.error('Login error:', error);
 res.status(500).json({ message: "An error occurred" });
}
});

app.post('/logout', (req, res) => {
  res.json({ message: "Logout successful" });
});

/* Port */
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.get('/react', (req, res) => {
    console.log("console")
    res.status('404').send("Page not found")
})

app.post('/register', async (req, res) => {
    const { _id, firstName, lastName, email, phone, password } = req.body;
  
    const existingUser = await loginData.findOne({ _id });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const newUser = new loginData({
      _id, 
      firstName, 
      lastName,
      email,
      phone,
      password: hashedPassword
    });
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  });

  //---------------------------

  app.post('/BecomeSitter', upload.single('image'), async (req, res) => {
    const { _id, firstName, lastName, email, phone, state, suburb, postcode, streetAddress } = req.body;
    
    const existingUser = await loginData.findOne({ _id });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    const image = req.file ? {
      data: req.file.buffer,
      contentType: req.file.mimetype
    } : null;
  
    const newSitterUser = new SitterData({
      _id, 
      firstName, 
      lastName,
      email,
      phone,
      state,
      suburb,
      postcode,
      streetAddress,
      image
    });
  
    try {
      await newSitterUser.save();
      res.redirect('/FindSitter');
    } catch (error) {
      res.status(500).json({ message: 'Error registering sitter', error });
    }
  });
  

  //---------------------------
  app.get('/FindSitter', async (req, res) => {
    try {
      const sitters = await SitterData.find({});
      res.status(200).json(sitters);
    } catch (error) {
      console.error('Error fetching sitters:', error.message);
      res.status(500).json({ message: 'An error occurred while fetching sitters', error: error.message });
    }
  });

  app.post('/bookings', async (req, res) => {
    const { userId, sitterId } = req.body;

    
    if (!userId || !sitterId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newBooking = new Booking({
            userId,
            sitterId
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking successful!' });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(500).json({ message: 'Server error during booking' });
    }
});



  app.get('/Profile', async (req, res) => { // TRYING TO GET A SINGLE USER TO DISPLAY
    try {
      const userID = req.cookies.SESSION
      const Dtoken = jwt.verify(userID, process.env.JWT_SECRET);
      console.log(Dtoken._id);
      USER = ({_id: Dtoken._id})
      console.log(USER)
      const user1 = await loginData.find(USER);
      res.status(200).json(user1);
      console.log(user1);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      res.status(500).json({ message: 'An error occurred while fetching profile', error: error.message })
      }
    });

    app.get('/FindSitter/:id', async function(req, res) {
      const sitterId = req.params.id;
  
      try { 
        const sitter = await SitterData.findById(sitterId);
    
        if (!sitter) { 
          return res.status(404).send("Sitter not found");
        }
    
        res.status(200).json(sitter);
      } catch (error) {
        console.error('Error fetching sitter:', error.message);
        res.status(500).send("Error fetching sitter");
      }
    });

//---------------



const Message = require('./messageSchema');




app.post('/sendMessage', async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  const newMessage = new Message({
    senderId,
    recipientId,
    content
  });

  try {
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
});

app.get('/messages/:userId/:sitterId', async (req, res) => {
  const { userId, sitterId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: sitterId },
        { senderId: sitterId, recipientId: userId }
      ]
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

//--------------------------------
const router = express.Router();
const Review = require('./Models/ReviewSchema'); // Assume you have a Review model

// Fetch reviews for a sitter
app.get('/reviews/:sitterId', async (req, res) => {
  try {
    const reviews = await Review.find({ sitterId: req.params.sitterId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});


app.post('/reviews', async (req, res) => {
  const { sitterId, rating, comment } = req.body;

  try {
    const newReview = new Review({ sitterId, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Failed to save review', error: error.message });
  }
});

module.exports = router;

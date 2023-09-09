const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const Pet = require('./models/Pet');
const fs = require('fs'); // Import the built-in 'fs' module
const path = require('path')
const adoptRoutes = require('./routes/adoptRoutes'); // Import your adoption route
// const bodyParser = require('body-parser'); // Import bodyParser

const app = express();



app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/adopt', adoptRoutes);
app.use('/api/pets', petRoutes);
// Add more routes here

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectMongo = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');
require('./config/passportConfig');

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const mongoStore = new connectMongo({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
});



// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection }), // Using MongoDB for session store
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/api', apiRoutes);

// Start Server
app.listen(3000, () => console.log('Server started on 3000'));

const express = require('express');
const dotenv =require("dotenv")
const mongoose = require('mongoose');
const bodyParser =require("body-parser")
const helmet = require('helmet');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes'); 
const userRoutes = require('./routes/userRoutes');
const app = express();

dotenv.config();
app.use(bodyParser.json());


// Use helmet to set security-related HTTP headers, including CSP
// app.use(helmet());

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes 
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

// Custom CSP settings
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://localhost:3000"
  );
  next();
});

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Example endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Expense Tracker API!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An unexpected error occurred' });
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);  // Logs the request method and URL
  next();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

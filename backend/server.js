// Copyright 2024 Cherag Saxena
// All Rights Reserved.
// This code is for personal use only. Unauthorized use, copying, or distribution is prohibited.

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const expenseRoutes = require('./routes/expenseRoutes');
// const budgetRoutes = require('./routes/budgetRoutes');
// const billRoutes = require('./routes/billRoutes');
// const savingsGoalRoutes = require('./routes/savingsGoalRoutes');

// app.use('/api/expenses', expenseRoutes);
// app.use('/api/budget', budgetRoutes);
// app.use('/api/bills', billRoutes);
// app.use('/api/savings-goals', savingsGoalRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Routes
const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

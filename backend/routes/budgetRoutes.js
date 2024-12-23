const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// Get all budget
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new budget
router.post('/', async (req, res) => {
  const budget = new Budget(req.body);
  try {
    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

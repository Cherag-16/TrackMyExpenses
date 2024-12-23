const express = require('express');
const router = express.Router();
const SavingsGoal = require('../models/SavingsGoal');

// Get all savingsGoals
router.get('/', async (req, res) => {
  try {
    const savingsGoals = await SavingsGoal.find();
    res.json(savingsGoals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new savingsGoal
router.post('/', async (req, res) => {
  const savingsGoal = new SavingsGoal(req.body);
  try {
    const savedSavingsGoal = await savingsGoal.save();
    res.status(201).json(savedSavingsGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

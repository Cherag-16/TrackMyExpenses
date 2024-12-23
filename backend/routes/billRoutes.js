const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const bill = await Bill.find();
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const expense = new Bill(req.body);
  try {
    const savedBill = await bill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

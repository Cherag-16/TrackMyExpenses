const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense')
const expenseController = require('../controllers/expenseController'); // Adjust the path based on your folder structure

// Route to create a new expense
router.post('/', expenseController.createExpense);

// Route to get all expenses
router.get('/', expenseController.getExpenses);

// Route to get a single expense by ID
router.get('/:id', expenseController.getExpenseById);

// Route to update an expense by ID
router.put('/:id', expenseController.updateExpense);

// Route to delete an expense by ID
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;

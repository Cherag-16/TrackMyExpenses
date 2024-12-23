const mongoose = require('mongoose');

const SavingsGoalSchema = new mongoose.Schema({
  id: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('SavingsGoal', SavingsGoalSchema);

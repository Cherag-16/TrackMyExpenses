import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'; 
import './App.css';

const HomePage = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'Select',
    description: '',
    date: dayjs().format('DD-MM-YYYY HH:mm:ss'), 
  });

  const [categories] = useState([
    'Food',
    'Transportation',
    'Housing',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
  ]);

  const todaysExpenses = expenses
    .filter((expense) =>
      dayjs(expense.date).isSame(dayjs(), 'day') 
    )
    .sort((a, b) => dayjs(b.date).diff(dayjs(a.date))); 

  const todaysTotal = todaysExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (newExpense.amount && newExpense.category !== 'Select' && newExpense.description) {
      setExpenses([
        ...expenses,
        {
          ...newExpense,
          id: Date.now(),
          amount: parseFloat(newExpense.amount),
          date: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Save consistent format
        },
      ]);
      setNewExpense({
        amount: '',
        category: 'Select',
        description: '',
        date: '',
      });
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h2>Add New Expense</h2>
        <form onSubmit={addExpense}>
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            placeholder="Amount (INR)"
          />
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          >
            <option value="Select">Select</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            placeholder="Description"
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>

      <div className="card">
        <h2>Today's Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {todaysExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>₹{expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{dayjs(expense.date).format('HH:mm:ss')}</td> {/* Format time */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <h3>Today's Spent: ₹{todaysTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default HomePage;

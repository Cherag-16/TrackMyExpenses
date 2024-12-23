import React, { useState } from 'react';
import './App.css'


const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');  
  const month = (d.getMonth() + 1).toString().padStart(2, '0');  
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const MyExpenses = () => {
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem('expenses')) || []);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isEditing, setIsEditing] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [hoveredExpenseId, setHoveredExpenseId] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const categories = [
    'Food', 'Transportation', 'Housing', 'Entertainment', 'Shopping', 
    'Healthcare', 'Education'
  ];

  const filteredExpenses = expenses
    .filter((expense) => new Date(expense.date).getMonth() === selectedMonth)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const monthlyTotal = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    }
  };

  const handleEdit = (expense) => {
    setIsEditing(true);
    setEditExpense(expense);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editExpense.amount || !editExpense.category || editExpense.category === 'Select') {
      alert('Please fill all fields correctly.');
      return;
    }

    if (!editExpense.description) {
      editExpense.description = editExpense.category; 
    }

    const updatedExpenses = expenses.map((expense) =>
      expense.id === editExpense.id ? editExpense : expense
    );

    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setIsEditing(false);
    setEditExpense(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditExpense({ ...editExpense, [name]: value });
  };

  return (
    <div className="App">
      <header>
        <h1>My Expenses</h1>
        <div className="calendar">
          {months.map((month, index) => (
            <button
              key={index}
              className={selectedMonth === index ? 'active' : ''}
              onClick={() => setSelectedMonth(index)}
            >
              {month}
            </button>
          ))}
        </div>
      </header>

      {isEditing && (
        <div className="edit-form">
          <h2>Edit Expense</h2>
          <form onSubmit={saveEdit}>
            <input
              type="number"
              name="amount"
              value={editExpense.amount}
              onChange={handleChange}
              placeholder="Amount"
            />
            <select
              name="category"
              value={editExpense.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              value={editExpense.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="card">
        <h2>{months[selectedMonth]} Expenses</h2>

        {/* Display message if no expenses */}
        {filteredExpenses.length === 0 ? (
          <p>No expenses for this month.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => {
                const expenseDate = new Date(expense.date);
                return (
                  <tr
                    key={expense.id}
                    onMouseEnter={() => setHoveredExpenseId(expense.id)}
                    onMouseLeave={() => setHoveredExpenseId(null)}
                  >
                    <td>₹{expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.description}</td>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expenseDate.toLocaleTimeString()}</td>
                    <td>
                      {hoveredExpenseId === expense.id && (
                        <div className="expense-icons">
                          <button onClick={() => handleEdit(expense)} aria-label="Edit Expense">
                            ✏️
                          </button>
                          <button onClick={() => handleDelete(expense.id)} aria-label="Delete Expense">
                            🗑️
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <h3>Total Spent: ₹{monthlyTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default MyExpenses;

// Copyright 2024 Cherag Saxena
// All Rights Reserved.
// This code is for personal use only. Unauthorized use, copying, or distribution is prohibited.

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';  
import HomePage from './HomePage';
import MyExpenses from './MyExpenses';
import AnalyticsPage from './AnalyticsPage';
import Settings from './Settings';
import Footer from './Footer'
import './App.css';
import axios from 'axios';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <Router>
      <div>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>{expense.name} - ${expense.amount}</li>
        ))}
      </ul>
      </div>
      <div className="App">
      <header className="App-header">
        <img src="/logo.webp" alt="Logo" className="logo" />
        <h1 className="title">TrackMyExpenses</h1>
      </header>
      </div>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expenses" element={<MyExpenses />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [salary, setSalary] = useState(localStorage.getItem('salary') || '');

  const handleSave = () => {
    if (!salary || isNaN(salary) || salary <= 0) {
      alert('Please enter a valid salary.');
      return;
    }
    localStorage.setItem('salary', salary);
    alert('Profile updated successfully!');
  };
  

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings-form">
      <p>Current Salary: ₹{salary}</p>
        <label htmlFor="salary">Monthly Salary (₹):</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter your salary"
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => {
            localStorage.removeItem('salary');
            setSalary('');
            alert('Salary cleared!');
            }}>
                Clear Salary
        </button>

      </div>
    </div>
  );
};

export default Settings;


import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const AnalyticsPage = () => {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Sample data for graph
  const monthlyData = Array(12).fill(0);
  const weeklyData = Array(12).fill(0);
  expenses.forEach((expense) => {
    const month = new Date(expense.date).getMonth();
    monthlyData[month] += expense.amount;
    weeklyData[month] += expense.amount / 4; // Dummy weekly logic
  });

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Reach',
        data: monthlyData,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.5)',
        fill: true,
      },
      {
        label: 'Weekly Reach',
        data: weeklyData,
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.5)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="analytics">
      <h1>Analytics</h1>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsPage;

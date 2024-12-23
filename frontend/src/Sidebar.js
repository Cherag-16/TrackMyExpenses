import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Your styles

const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Hide sidebar when a link is clicked
  const handleLinkClick = () => {
    setSidebarVisible(false);
  };

  return (
    <div>
      {/* Sidebar Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="sidebar">
          <div className="sidebar-content">
            <br/>
            <br/>
            <br/>
            <br/>
            <Link to="/" className="sidebar-link" onClick={handleLinkClick}>🏠 Home</Link>
            <Link to="/expenses" className="sidebar-link" onClick={handleLinkClick}>💵 Expenses</Link>
            <Link to="/analytics" className="sidebar-link" onClick={handleLinkClick}>📊 Analytics</Link>
            <Link to="/settings" className="sidebar-link" onClick={handleLinkClick}>⚙️ Settings</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

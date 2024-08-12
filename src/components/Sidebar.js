import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  // Function to check if the current path matches or starts with a given path
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/home') ? 'active' : ''}`} to="/home">
              <span data-feather="home"></span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/payment-terms') ? 'active' : ''}`} to="/payment-terms">
              <span data-feather="file"></span>
              Payment Terms
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/companies') ? 'active' : ''}`} to="/companies">
              <span data-feather="file"></span>
              Company
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive('/commercial-invoices') ? 'active' : ''}`} to="/commercial-invoices">
              <span data-feather="shopping-cart"></span>
              Commercial Invoice
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

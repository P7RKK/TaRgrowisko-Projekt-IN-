import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Panel Administratora</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/users">Zarządzanie użytkownikami</Link>
          </li>
          <li>
            <Link to="/admin/auctions">Zarządzanie aukcjami</Link>
          </li>
          <li>
            <Link to="/admin/reports">Raporty</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;

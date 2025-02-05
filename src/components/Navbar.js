import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUserPlus, FaEye, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ isLoggedIn, user, cartItemsCount = 0, messagesCount = 0, onLogout, products }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="/images/logo.png" alt="TarGrowisko Logo" className="navbar-logo-img" />
        </a>
      </div>

      <div className="navQuote">"Veni, Emi, Vici."</div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Szukaj gier..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={() => navigate('/search-results', { state: { query } })}>
          <FaSearch />
        </button>
      </div>

      <div className="navbar-icons">
        <Link to="/register" className="navbar-link">
          <FaUserPlus />
        </Link>
        <Link to="/watched-auctions" className="navbar-link">
          <FaEye />
        </Link>

        {isLoggedIn ? (
          <div className="navbar-user" style={{ position: 'relative' }}>
            <div className="navbar-user-avatar" onClick={toggleDropdown}>
              <img
                src={user?.avatar || 'https://via.placeholder.com/150'}
                alt="Avatar"
                className="user-avatar"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
            </div>
            {dropdownOpen && (
              <div className="navbar-user-dropdown">
                <Link to="/profile">Profil</Link>
                <Link to="/my-auctions">Moje Aukcje</Link>
                <Link to="/cart">Koszyk ({cartItemsCount})</Link>
                <button onClick={onLogout}>Wyloguj</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="navbar-link">
            <FaUser />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

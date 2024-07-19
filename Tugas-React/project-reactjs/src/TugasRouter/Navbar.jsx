import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/tugas-crud-hooks" className="navbar-link">CRUD Hooks</Link>
        <Link to="/tugas-axios" className="navbar-link">Axios</Link>
        <Link to="/tugas-context" className="navbar-link">Context</Link>
        <Link to="/tugas-router" className="navbar-link">Router</Link>
      </div>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        Klik untuk ganti tema : {theme === 'light-theme' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
};

export default Navbar;

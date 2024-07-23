import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const {user, logout} = useContext(AuthContext)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl text-white">
          <Link to="/">Culinary Review</Link>
        </div>
        <div>
          <Link to="/" className="mx-2 text-white">Home</Link>
          {user ? (
          <>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button onClick={logout} className="mr-4">Logout</button>
          </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Register</Link>
            </>
          )}
        </div>
        <button onClick={toggleTheme} className="text-white">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

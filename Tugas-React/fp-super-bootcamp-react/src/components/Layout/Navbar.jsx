import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/recipes" className="mr-4">Recipes</Link>
        <Link to="/reviews" className="mr-4">Reviews</Link>
      </div>
      <div>
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
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

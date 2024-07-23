import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import ikon dari react-icons

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center">
        {/* Logo di Pojok Kiri */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-white text-2xl font-bold">CulinaryReview</Link>
        </div>
        
        {/* Navigasi di Tengah */}
        <div className="flex-grow flex justify-center">
          <div className="flex items-center">
            <Link to="/" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Home</Link>
            <Link to="/recipes" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Recipes</Link>
            <Link to="/reviews" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Reviews</Link>
            <Link to="/faq" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">FAQ</Link>
          </div>
        </div>
        
        {/* Tombol Login di Pojok Kanan */}
        <div className="flex-shrink-0 ml-auto flex items-center">
          {user ? (
            <>
              <Link to="/profile" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Profile</Link>
              <button onClick={logout} className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:bg-gray-700 p-2 rounded mr-5">Login</Link>
          )}
          <button 
            onClick={toggleTheme} 
            className={`text-white transition-transform duration-300 ${theme === 'light' ? 'rotate-0' : 'rotate-180'} hover:bg-white hover:text-gray-800 p-2 rounded-full`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

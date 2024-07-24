import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FaSun, FaMoon, FaUserCircle } from 'react-icons/fa'; // Import ikon dari react-icons

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, profile, logout } = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center">
        <div className="flex-shrink-0">
          <Link to="/" className="text-white text-2xl font-bold">CulinaryReview</Link>
        </div>
        
        <div className="flex-grow flex justify-center">
          <div className="flex items-center">
            <Link to="/" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Home</Link>
            <Link to="/recipes" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Recipes</Link>
            <Link to="/reviews" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">Reviews</Link>
            <Link to="/faq" className="mr-4 text-white hover:bg-gray-700 p-2 rounded">FAQ</Link>
          </div>
        </div>
        
        <div className="flex-shrink-0 ml-auto mr-4 flex items-center">
        {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center text-white hover:text-gray-500 mr-4 rounded-full">
                {profile && profile.avatar ? (
                  <img src={profile.avatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
                ) : (
                  <FaUserCircle className="w-8 h-8 rounded-full mr-2" />
                )}
                <span>{user.username}</span>
              </button>             
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Profile</Link>
                  <Link to="/change-password" className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Change Password</Link>
                  <button onClick={logout} className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-b-lg">Logout</button>
                </div>
              )}
            </div>
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

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import Api from '../../service/api';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await Api.get('/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'Please log in to view your profile.',
            confirmButtonText: 'Login',
            confirmButtonColor: '#3FA2F6',
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login';
            }
          })
        } else {
          console.error("Error can't get profile:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-zinc-50 dark:bg-slate-950 p-4 fixed w-full top-0 left-0 right-0 z-50 border-b border-black dark:border-slate-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/" className="hover:text-gray-500 dark:text-white text-2xl font-bold">CulinaryReview</Link>
        </div>
        
        <div className="hidden md:flex items-center">
          <Link to="/" className="mr-4 hover:bg-slate-900 hover:text-white p-2 dark:text-white dark:hover:text-black dark:hover:bg-slate-50 rounded">Home</Link>
          <Link to="/recipes" className="mr-4 hover:bg-slate-900 hover:text-white p-2 dark:text-white dark:hover:text-black dark:hover:bg-slate-50 rounded">Recipes</Link>
          <Link to="/reviews" className="mr-4 hover:bg-slate-900 hover:text-white p-2 dark:text-white dark:hover:text-black dark:hover:bg-slate-50 rounded">Reviews</Link>
          <Link to="/faq" className="mr-4 hover:bg-slate-900 hover:text-white p-2 dark:text-white dark:hover:text-black dark:hover:bg-slate-50 rounded">FAQ</Link>
        </div>
        
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center hover:text-gray-500 mr-4 rounded-full" // Gunakan flex untuk penyelarasan
              >
                {profile && profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="User Avatar" 
                    className="w-10 h-10 rounded-full mr-2" // Ukuran dan margin gambar
                  />
                ) : (
                  <img 
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                    alt="User Avatar" 
                    className="w-10 h-10 rounded-full mr-2" // Ukuran dan margin gambar
                  />
                )}
                <span className="hidden md:block dark:text-white dark:hover:text-gray-400 text-center">
                  {user.username}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-950 shadow-lg rounded-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-lg" onClick={toggleDropdown}>Profile</Link>
                  <Link to="/change-password" className="block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={toggleDropdown}>Change Password</Link>
                  <button onClick={() => {logout(); toggleDropdown();}} className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-b-lg">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:bg-slate-900 hover:text-white p-2 dark:text-white dark:hover:text-black dark:hover:bg-slate-50 rounded mr-5">Login</Link>
          )}
          <button 
            onClick={toggleTheme} 
            className={`transition-transform duration-500 ${theme === 'light' ? 'rotate-0' : 'rotate-180'} text-black dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black p-2 rounded-full`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button 
            onClick={toggleMenu} 
            className={`md:hidden ml-4 dark:text-white transition-transform duration-200 hover:text-gray-500 ${menuOpen ? 'rotate-180' : 'rotate-0'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden ">
          <Link to="/" className="block hover:bg-gray-700 p-4 dark:text-white" onClick={toggleMenu}>Home</Link>
          <Link to="/recipes" className="block hover:bg-gray-700 p-4 dark:text-white" onClick={toggleMenu}>Recipes</Link>
          <Link to="/reviews" className="block hover:bg-gray-700 p-4 dark:text-white" onClick={toggleMenu}>Reviews</Link>
          <Link to="/faq" className="block hover:bg-gray-700 p-4 dark:text-white" onClick={toggleMenu}>FAQ</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

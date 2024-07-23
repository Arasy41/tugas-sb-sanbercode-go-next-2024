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
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl text-white">
          <Link to="/">Home</Link>
        </div>
        <div>
          {user ? (
            <>
              <Link to="/profile" className="mr-4 text-white">Profile</Link>
              <button onClick={logout} className="mr-4 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-white">Login</Link>
              <Link to="/register" className="mr-4 text-white">Register</Link>
            </>
          )}
        </div>
        <button onClick={toggleTheme} className="text-white">
          {theme === 'light' ? <FaMoon /> : <FaSun />} {/* Ganti teks dengan ikon */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
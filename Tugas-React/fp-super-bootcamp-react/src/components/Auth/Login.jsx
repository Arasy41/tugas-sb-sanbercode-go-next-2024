import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm ">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Email  or Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          <p className="mt-4 text-gray-700 text-center dark:text-gray-300">
            Don't have an account?{' '}
          </p>
            <Link
              to="/register"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Register
            </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

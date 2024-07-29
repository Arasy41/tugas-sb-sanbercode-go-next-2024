import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login, loginForm, setLoginForm, loading } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginForm;

    if (!username || !password) {
      return Swal.fire({
        icon: 'warning',
        title: 'Username dan password kosong',
        text: 'Tolong isi username dan password',
        timer: 2000
      });
    }

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email or Username</label>
            <input
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading && 'opacity-50 cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

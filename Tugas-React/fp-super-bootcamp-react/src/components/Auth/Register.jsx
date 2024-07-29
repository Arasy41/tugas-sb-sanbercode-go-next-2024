import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, registerForm, setRegisterForm, loading } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = registerForm;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
      });
      return;
    }

    try {
      await register(email, username, password, confirmPassword);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You can now log in.',
        confirmButtonText: 'OK',
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={registerForm.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={registerForm.username}
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
              value={registerForm.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerForm.confirmPassword}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';

const ChangePassword = () => {
  const { changePassword, changePasswordForm, setChangePasswordForm, loading } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordForm({
      ...changePasswordForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = changePasswordForm;

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New passwords do not match.',
      });
      return;
    }

    try {
      await changePassword(oldPassword, newPassword, confirmPassword);
      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Your password has been changed successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Change Password Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={changePasswordForm.oldPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={changePasswordForm.newPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={changePasswordForm.confirmPassword}
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
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

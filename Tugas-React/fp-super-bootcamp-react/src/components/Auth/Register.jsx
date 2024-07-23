import React, { useState } from "react";
import Api from "../../service/api";

const Register = () => {
    const [credentials, setCredentials] = useState({ email: "", username: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.post('/api/register', credentials);
            setCredentials({ email: "", username: "", password: "" });
        } catch (error) {
            console.log('Register Error', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;

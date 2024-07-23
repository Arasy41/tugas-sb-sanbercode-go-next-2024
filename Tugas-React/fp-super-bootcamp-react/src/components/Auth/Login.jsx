import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            setCredentials({ username: "", password: "" });
            window.location.reload();
        } catch (error) {
            console.log('Login Error', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
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
                        />
                    </div>
                        <div className="mb-4 text-right text-sm ">
                            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                        </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <Link to={"/"}>Login</Link>
                    </button>
                    <div className="mt-4 text-center">
                        <h4 className="text-gray-700 dark:text-gray-300 mb-2 mt-4">Anda belum mempunyai akun?</h4>
                        <Link to="/register" className="text-blue-500">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

const Login = () => {
    const { theme } = useContext(ThemeContext);
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
        } catch (error) {
            console.log('Login Error', error);
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <div className={`p-6 rounded-lg shadow-md w-full max-w-sm ${theme === "dark" ? "bg-gray-800" : "bg-white border-2 border-gray-300"} `}>
                <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className={`block ${theme === "dark" ? "text-white" : "text-black"}`}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${theme === "dark" ? "text-white" : "text-black"}`}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>                        
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <h4 className="text-gray-700 mb-2 mt-4">Anda belum mempunyai akun?</h4>
                        <Link to="/register" className="text-blue-500">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

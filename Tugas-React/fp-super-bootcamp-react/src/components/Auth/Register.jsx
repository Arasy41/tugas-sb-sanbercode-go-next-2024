import React, { useContext, useState } from "react";
import Api from "../../service/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Register = () => {
    const { theme } = useContext(ThemeContext);
    const { register } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", username: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(credentials);
            setCredentials({ email: "", username: "", password: "" });
            navigate("/login");
        } catch (error) {
            console.log('Register Error', error);
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <div className={`p-6 rounded-lg shadow-md w-full max-w-sm ${theme === "dark" ? "bg-gray-800" : "bg-white border-2 border-gray-300"} `}>
                <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label className={`block ${theme === "dark" ? "text-white" : "text-black"}`}>
                            <span class="block text-sm font-medium">Email</span>
                            <input type="email" class="peer w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                            <p class="mt-1 invisible peer-invalid:visible text-pink-600 text-sm">
                            Please provide a valid email address.
                            </p>
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className={`block ${theme === "dark" ? "text-white" : "text-black"}`}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
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
                            required
                        />
                    </div>
                    <button                        
                        type="submit"
                        className="w-full bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;

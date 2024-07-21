import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {

    const { login } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(credentials)
            setCredentials({ username: "", password: "" })
        } catch (error) {
            console.log('Login Error', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>            
        </div>
    )
}

export default Login
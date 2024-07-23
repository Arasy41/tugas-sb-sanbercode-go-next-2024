import { useState } from "react";
import Api from "../../service/api";

const Register = () => {
    const [credentials, setCredentials] = useState({ email: "", username: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Api.post('/api/register', credentials)
            setCredentials({ email: "", username: "", password: "" })
        } catch (error) {
            console.log('Register Error', error);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} value={credentials.email} placeholder="Email" required />
            <input type="text" name="username" onChange={handleChange} value={credentials.username} placeholder="Username" required />
            <input type="password" name="password" onChange={handleChange} value={credentials.password} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        </>
    )
}

export default Register;
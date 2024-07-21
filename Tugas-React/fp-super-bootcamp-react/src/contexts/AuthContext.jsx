import { createContext, useEffect, useState } from "react";
import api from "../service/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        token = localStorage.getItem("token");

        if (token) {
            api.get("/detail-user").then(response => setUser(response.data));
        }
    }, []);

    const login = async (credentials) => {
        const response = await api.post("/login", credentials);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
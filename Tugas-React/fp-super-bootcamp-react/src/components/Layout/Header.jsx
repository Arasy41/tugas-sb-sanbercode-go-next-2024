import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
    const {user, logout} = useContext(AuthContext)
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/reviews">Reviews</Link>
                {user ? (
                    <>
                        <Link to="/create-review">Create Review</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header
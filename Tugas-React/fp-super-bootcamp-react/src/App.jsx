import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/Pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import ChangePassword from "./components/Auth/ChangePassword";
import Profile from "./components/Pages/Profile";
import EditProfile from "./components/Pages/Profile_Edit";
import Recipes from "./components/Pages/Recipe";
import RecipeDetail from "./components/Pages/RecipeDetail";
import Faq from "./components/Pages/Faq";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
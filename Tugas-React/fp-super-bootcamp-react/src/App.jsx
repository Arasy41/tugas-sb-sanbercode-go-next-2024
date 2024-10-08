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
import Reviews from "./components/Pages/Review";
import RecipeForm from "./components/Pages/RecipeForm";
import { CulinaryReviewProvider } from "./contexts/CulinaryReviewContext";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CulinaryReviewProvider>
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
              <Route path="/recipes/create" element={<RecipeForm />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/faq" element={<Faq />} />
            </Routes>
          </BrowserRouter>
        </CulinaryReviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
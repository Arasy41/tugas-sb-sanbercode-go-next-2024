import React, { createContext, useState, useEffect } from 'react';
import Api from '../service/api';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';

export const CulinaryReviewContext = createContext();

export const CulinaryReviewProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})
  const [reviews, setReviews] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await Api.get('/api/recipes');
        setRecipes(response.data);
        console.log('Recipes:', response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Api.get('/api/reviews');
        console.log('Reviews:', response.data.data);
        setReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (token) {
        try {
          const response = await Api.get('/api/favorites', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFavoriteRecipes(response.data);
          console.log('Favorite recipes:', response.data);
        } catch (error) {
          console.error('Error fetching favorite recipes:', error);
        }
      }
    };

    fetchFavorites();
  }, [token]);

  const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await Api.get('/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'Please log in to view your profile.',
            confirmButtonText: 'Login',
            confirmButtonColor: '#3FA2F6',
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login';
            }
          });
        } else {
          console.error("Error can't get profile:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  const handleFavorite = async (recipeId) => {
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You need to log in to manage favorites!',
      });
      return;
    }

    const favorite = favoriteRecipes.find(fav => fav.recipe_id === recipeId);

    try {
      if (favorite) {
        await Api.delete(`/api/favorites/${favorite.ID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Favorite removed');
        setFavoriteRecipes(favoriteRecipes.filter(fav => fav.recipe_id !== recipeId));
      } else {
        const response = await Api.post(`/api/favorites`, { recipe_id: recipeId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Favorite added');
        setFavoriteRecipes([...favoriteRecipes, response.data]);
      }
    } catch (error) {
      console.error('Error managing favorite:', error);
    }
  };

  const getTimeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <CulinaryReviewContext.Provider
      value={{
        user,
        profile,
        recipes,
        reviews,
        favoriteRecipes,
        dropdownOpen,
        menuOpen,
        setUser,
        toggleDropdown,
        toggleMenu,
        handleFavorite,
        getTimeAgo,
        setToken,
      }}
    >
      {children}
    </CulinaryReviewContext.Provider>
  );
};

export default CulinaryReviewContext;

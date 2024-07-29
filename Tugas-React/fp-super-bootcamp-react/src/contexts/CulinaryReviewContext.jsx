import React, { createContext, useState, useEffect } from 'react';
import Api from '../service/api';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';

export const CulinaryReviewContext = createContext();

export const CulinaryReviewProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

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
        recipes,
        reviews,
        favoriteRecipes,
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

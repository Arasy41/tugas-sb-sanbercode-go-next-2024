import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import Swal from 'sweetalert2';
import Api from '../../service/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await Api.get('/api/recipes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecipes(response.data);
        console.log('Recipes:', response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [token]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Api.get('/api/reviews');
        if (Array.isArray(response.data)) {
          setReviews(response.data);
          console.log('Reviews:', response.data);
        } else {
          console.error('Error: Reviews data is not an array');
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
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

  return (
    <div className="container mx-auto mt-16 px-4 py-8 text-center md:text-left md:px-8 md:py-16 dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <h1 className="text-4xl font-bold text-left mb-8">New Culinary Inspiration</h1>      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8">
        {recipes.map((recipe) => {
          const image = recipe.images.length > 0 ? recipe.images[0].url : 'default-image-url';
          const isFavorite = favoriteRecipes.some(fav => fav.recipe_id === recipe.ID);
          return (
            <div key={recipe.ID} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200 relative">
              <Link to={`/recipes/${recipe.ID}`} className="block">
                <img
                  src={image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-2xl mt-4 text-gray-900">{recipe.title}</h2>
                <p className="mt-2 text-gray-700">{recipe.description}</p>
              </Link>          
              <AiFillHeart
                size={35}
                className={`absolute top-5 right-5 cursor-pointer transition-all duration-200 ${
                  isFavorite ? 'text-red-500' : 'text-gray-500'
                }`}
                onClick={() => handleFavorite(recipe.ID)}
              />
            </div>
          );
        })}
      </div>

      <h1 className="text-4xl font-bold text-left mt-12 mb-8">New Update Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8">
        {Array.isArray(reviews) && reviews.map((review) => (
          <Link to={`/reviews/${review.ID}`} key={review.ID} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200">
            <h2 className="text-2xl mt-4 text-gray-900">{review.title}</h2>
            <p className="mt-2 text-gray-700">{review.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

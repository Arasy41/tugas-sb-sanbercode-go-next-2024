import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../service/api';
import { AiFillHeart } from "react-icons/ai";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await Api.get('/api/recipes');
        setRecipes(response.data);
        setFilteredRecipes(response.data);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleFavorite = async (recipeId) => {
    try {
      const response = await Api.post(`/api/reviews/${recipeId}/favorite`);
      console.log('Favorite added:', response.data);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  return (
    <div className="container mx-auto mt-16 px-4 py-8 text-center md:text-left md:px-8 md:py-16 dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <h1 className="text-4xl font-bold text-left mb-8">Find Your Culinary Inspiration</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200 w-1/2"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredRecipes.map((recipe) => {
          const image = recipe.images.length > 0 ? recipe.images[0].url : 'default-image-url';
          return (
            <div key={recipe.ID} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200">
              <Link to={`/recipes/${recipe.ID}`} key={recipe.ID} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200">
                <img
                  src={image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-2xl mt-4 text-gray-900">{recipe.title}</h2>
                <p className="mt-2 text-gray-700">{recipe.description}</p>
              </Link>          
              <AiFillHeart size={20} className="text-red-500" />
            </div>
          );
        })}
      </div>

      <h1 className="text-4xl font-bold text-left mt-12 mb-8">New Update Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
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

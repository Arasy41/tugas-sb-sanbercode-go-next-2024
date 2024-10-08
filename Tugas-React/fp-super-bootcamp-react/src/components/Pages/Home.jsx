// src/pages/Home.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import { CulinaryReviewContext } from '../../contexts/CulinaryReviewContext';

const Home = () => {
  const { recipes, reviews, favoriteRecipes, handleFavorite, getTimeAgo } = useContext(CulinaryReviewContext);

  if (!reviews.length && !recipes.length) {
    return (
      <div className="min-h-screen mx-auto mt-16 px-4 py-8 justify-center md:text-left md:px-8 md:py-16 dark:bg-gray-950 dark:text-white dark:border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-8">Loading...</h1>
        <p className="text-lg text-gray-500 text-center">There are currently no recipes & reviews to display.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-auto mt-16 px-4 py-8 text-center md:text-left md:px-8 md:py-16 dark:bg-gray-950 dark:text-white dark:border-gray-700">
      <h1 className="text-4xl font-bold mb-8 ml-4">New Culinary Inspiration</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8 ml-4">
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mt-12 mb-8">New Update Reviews</h1>
        <div className="overflow-y-auto max-h-screen">
          <div className="flex flex-col gap-6">
            {reviews.map((review) => (
              <div key={review.ID} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200">
                <h2 className="text-xl text-gray-950 font-bold">{review.user.profile.full_name === null ? 'Anonymous' : review.user.profile.full_name}</h2>
                <p className="text-gray-700">{review.content}</p>
                <p className="text-gray-500">{getTimeAgo(review.created_at)} at {review.recipe.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

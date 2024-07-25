import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../service/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div className="container mx-auto mt-16 px-4 py-8 text-center md:text-left md:px-8 md:py-16">
      <h1 className="text-4xl font-bold text-left mb-8">Best Culinary Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => {
          const image = recipe.images.length > 0 ? recipe.images[0].url : 'default-image-url';
          return (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200">
              <img 
                src={image} 
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg" 
              />
              <h2 className="text-2xl mt-4 text-gray-900">{recipe.title}</h2>
              <p className="mt-2 text-gray-700">{recipe.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

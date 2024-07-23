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
    <div className="container mx-auto">
      <h1 className="text-4xl text-center my-8">Culinary Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => {
          const image = recipe.images.length > 0 ? recipe.images[0].url : 'default-image-url';
          return (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="border p-4 rounded hover:shadow-lg">
              <img 
                src={image} 
                alt={recipe.title} 
                className="w-full h-48 object-cover rounded" 
              />
              <h2 className="text-2xl mt-4">{recipe.title}</h2>
              <p className="mt-2">{recipe.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

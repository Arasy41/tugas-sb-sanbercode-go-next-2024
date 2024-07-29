import React, { useContext, useEffect, useState } from "react";
import Api from "../../service/api";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import Swal from "sweetalert2";
import CulinaryReviewContext from "../../contexts/CulinaryReviewContext";

const Recipes = () => {
    const { recipes, favoriteRecipes } = useContext(CulinaryReviewContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const token = localStorage.getItem('token');    

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    const handleFavorite = async (id) => {
        if (!token) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'You need to log in to manage favorites!',
            confirmButtonText: 'Login',
            confirmButtonColor: '#3FA2F6',
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login';
            }
          });
          return;
        }
    
        const favorite = favoriteRecipes.find(fav => fav.recipe_id === id);
    
        try {
          if (favorite) {
            await Api.delete(`/api/favorites/${favorite.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Favorite removed');
            setFavoriteRecipes(favoriteRecipes.filter(fav => fav.recipe_id !== id));
          } else {
            const response = await Api.post(`/api/favorites`, { recipe_id: id }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Favorite added');
            setFavoriteRecipes([...favoriteRecipes, response.data]);
          }
        } catch (error) {
          console.error('Error managing favorite:', error);
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'You need to log in to manage favorites!',
            confirmButtonText: 'Login',
            confirmButtonColor: '#3FA2F6',
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login';
            }
          });
        }
      };

      if (!recipes.length) {
        return (
          Swal.isLoading() ? (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white transition-colors duration-300">
              <div className="container mx-auto mt-16 px-4 py-8 md:px-8 md:py-16">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-4xl font-bold">All Recipes in Here</h1>
                  <Link
                    to="/recipes/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Create Recipe
                  </Link>
                </div>
                <div className="flex justify-center items-center">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white transition-colors duration-300">
              <div className="container mx-auto mt-16 px-4 py-8 md:px-8 md:py-16">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-4xl font-bold">All Recipes in Here</h1>
                  <Link
                    to="/recipes/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Create Recipe
                  </Link>
                </div>
                <input
                    type="text"
                    placeholder="Search Recipes..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200 w-full mb-4 text-gray-900"
                />
                <div className="flex justify-center mt-20 items-center">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                  ></div>
                </div>
              </div>
            </div>
          )
        );
      }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white transition-colors duration-300">
            <div className="container mx-auto mt-16 px-4 py-8 md:px-8 md:py-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">All Recipes in Here</h1>
                    <Link
                        to="/recipes/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Create Recipe
                    </Link>
                </div>
                <input
                    type="text"
                    placeholder="Search Recipes..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200 w-full mb-4 text-gray-900"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8">
                    {filteredRecipes.map((recipe) => {
                        const image = recipe.images.length > 0 ? recipe.images[0].url : 'default-image-url';
                        return (
                            <div key={recipe.ID} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white dark:bg-gray-950 transition-all duration-200 relative">
                                <Link to={`/recipes/${recipe.ID}`} className="block">
                                    <img
                                        src={image}
                                        alt={recipe.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <h2 className="text-2xl mt-4 text-gray-950 dark:text-white">{recipe.title}</h2>
                                    <p className="mt-2 text-gray-700 dark:text-gray-400">{recipe.description}</p>
                                </Link>
                                <AiFillHeart
                                    size={35}
                                    className={`absolute top-5 right-5 cursor-pointer transition-all duration-200 ${
                                        favoriteRecipes.some(fav => fav.recipe_id === recipe.ID) ? 'text-red-500' : 'text-gray-500'
                                    }`}
                                    onClick={() => handleFavorite(recipe.ID)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Recipes;

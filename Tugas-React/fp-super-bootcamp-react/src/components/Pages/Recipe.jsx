import React, { useEffect, useState } from "react";
import Api from "../../service/api";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import Swal from "sweetalert2";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await Api.get('/api/recipes');
                if (Array.isArray(response.data)) {
                    setRecipes(response.data);
                    setFilteredRecipes(response.data);
                } else {
                    console.error('Error: Recipes data is not an array');
                    setRecipes([]);
                }
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

    return (
        <div className="container mx-auto mt-16 px-4 py-8 text-center md:text-left md:px-8 md:py-16 dark:bg-gray-900 dark:text-white dark:border-gray-700">
            <h1 className="text-4xl font-bold text-center mb-8">All Recipes in Here</h1>
            <input
                type="text"
                placeholder="Search Recipes..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200 w-full mb-4"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8">
                {filteredRecipes.map((recipe) => {
                    const image = recipe.images.length > 0 ? recipe.images[0].url : 'default-image-url';
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
                                    favoriteRecipes.some(fav => fav.recipe_id === recipe.ID) ? 'text-red-500' : 'text-gray-500'
                                }`}
                                onClick={() => handleFavorite(recipe.ID)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Recipes;

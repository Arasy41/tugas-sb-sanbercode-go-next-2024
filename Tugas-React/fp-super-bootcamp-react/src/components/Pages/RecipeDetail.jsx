import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../../service/api";
import { AiFillHeart } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const token = localStorage.getItem('token');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await Api.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    const fetchOtherRecipes = async () => {
      try {
        const response = await Api.get('/api/recipes');
        setOtherRecipes(response.data.filter(r => r.ID !== parseInt(id)));
      } catch (error) {
        console.error("Error fetching other recipes:", error);
      }
    };

    const fetchFavoriteRecipes = async () => {
      if (!token) return;
      try {
        const response = await Api.get('/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoriteRecipes(response.data);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    fetchRecipe();
    fetchOtherRecipes();
    fetchFavoriteRecipes();
  }, [id, token]);

  const handleFavorite = async (recipeId) => {
    if (!token) {
        return (
            Swal.fire({
            icon: "error",
            title: "You're not authorized",
            text: "Please login first",
            confirmButtonText: "Login",
            confirmButtonColor: "#3FA2F6",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";
            }
          })
        );
    }

    const isFavorite = favoriteRecipes.some(fav => fav.recipe_id === recipeId);

    try {
      if (isFavorite) {
        const favorite = favoriteRecipes.find(fav => fav.recipe_id === recipeId);
        await Api.delete(`/api/favorites/${favorite.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoriteRecipes(favoriteRecipes.filter(fav => fav.recipe_id !== recipeId));
      } else {
        const response = await Api.post(`/api/favorites`, { recipe_id: recipeId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoriteRecipes([...favoriteRecipes, response.data]);
      }
    } catch (error) {
      console.error('Error managing favorite:', error);
    }
  };

  const handleSlideChange = (direction) => {
    if (!recipe || recipe.images.length === 0) return;
    
    const totalSlides = recipe.images.length;
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    } else {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-16 px-4 py-8 text-center md:text-left md:px-8 md:py-16 dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <h1 className="text-4xl font-bold mb-8">{recipe.title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative md:w-1/2">
          {recipe.images.length > 0 && (
            <div className="relative overflow-hidden">
              <div className="carousel relative">
                <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {recipe.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`${recipe.title} ${index}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
                <button className="carousel-button prev" onClick={() => handleSlideChange('prev')}>
                  <FaChevronLeft size={30} />
                </button>
                <button className="carousel-button next" onClick={() => handleSlideChange('next')}>
                  <FaChevronRight size={30} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-lg mb-4">{recipe.description}</p>
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="text-lg mb-4 list-decimal list-inside whitespace-pre-wrap break-words">{recipe.ingredients}</ul>
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <ul className="text-lg mb-4 list-decimal list-inside whitespace-pre-wrap break-words">{recipe.instructions}</ul>
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <span key={tag.ID} className="bg-gray-200 mr-2 px-2 py-1 rounded">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-8 border-2 border-gray-900"/>

      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {recipe.reviews.length > 0 ? (
            recipe.reviews.map((review) => (
              <div key={review.ID} className="mb-4">
                <h3 className="text-lg font-bold">{review.user.username}</h3>
                <p className="text-gray-700">{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Other Recipes</h2>
          <div className="grid grid-cols-1 gap-6">
            {otherRecipes.slice(0, 5).map((otherRecipe) => {
              const image = otherRecipe.images.length > 0 ? otherRecipe.images[0].url : 'default-image-url';
              const isFavorite = favoriteRecipes.some(fav => fav.recipe_id === otherRecipe.ID);
              return (
                <div key={otherRecipe.ID} className="border-2 p-4 rounded-lg hover:shadow-lg bg-white transition-all duration-200 relative">
                  <Link to={`/recipes/${otherRecipe.ID}`} className="block">
                    <img
                      src={image}
                      alt={otherRecipe.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <h2 className="text-2xl mt-4 text-gray-900">{otherRecipe.title}</h2>
                    <p className="mt-2 text-gray-700">{otherRecipe.description}</p>
                  </Link>          
                  <AiFillHeart
                    size={35}
                    className={`absolute top-5 right-5 cursor-pointer transition-all duration-200 ${
                      isFavorite ? 'text-red-500' : 'text-gray-500'
                    }`}
                    onClick={() => handleFavorite(otherRecipe.ID)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

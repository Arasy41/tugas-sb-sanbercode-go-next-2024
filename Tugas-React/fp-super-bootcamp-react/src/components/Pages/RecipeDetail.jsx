import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../../service/api";
import { AiFillHeart } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { id as idLocale } from "date-fns/locale";
import { AuthContext } from "../../contexts/AuthContext";

const RecipeDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const token = localStorage.getItem('token');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await Api.get(`/api/recipes/${id}`);
        const reviewsWithEditingState = response.data.reviews.map(review => ({
          ...review,
          isEditing: false,
        }));
        setRecipe({
          ...response.data,
          reviews: reviewsWithEditingState,
        });
        const userReview = reviewsWithEditingState.find(review => review.user_id === user?.ID);
        setUserReview(userReview || null);
        console.log("User review:", userReview);
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
  }, [id, token, user?.ID]);

  const handleFavorite = async (recipeId) => {
    if (!token) {
      return Swal.fire({
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
      });
    }

    const isFavorite = favoriteRecipes.some(fav => fav.recipe_id === recipeId);

    try {
      if (isFavorite) {
        const favorite = favoriteRecipes.find(fav => fav.recipe_id === recipeId);
        await Api.delete(`/api/favorites/${favorite.ID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoriteRecipes(favoriteRecipes.filter(fav => fav.recipe_id !== recipeId));
      } else {
        const response = await Api.post('/api/favorites', { recipe_id: recipeId }, {
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

  const handleReviewSubmit = async () => {
    if (!token) {
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
      });
      return;
    }

    if (userReview) {
      Swal.fire({
        icon: "info",
        title: "You have already submitted a review",
        text: "You can only edit your existing review.",
      });
      return;
    }

    try {
      const response = await Api.post('/api/reviews', {
        recipe_id: recipe.ID,
        content: reviewContent,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: [response.data, ...prevRecipe.reviews]
      }));
      setReviewContent("");
      setUserReview(response.data);
      Swal.fire({
        icon: "success",
        title: "Review submitted successfully",
        text: "Thank you for your review!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3FA2F6",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReviewEdit = async (reviewId, newContent) => {
    if (!token) return;
    
    try {
      await Api.put(`/api/reviews/${reviewId}`, { content: newContent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecipe({
        ...recipe,
        reviews: recipe.reviews.map(review =>
          review.ID === reviewId ? { ...review, content: newContent, isEditing: false } : review
        )
      });
      setUserReview({ ...userReview, content: newContent, isEditing: false });
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (!token) return;
    try {
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#3FA2F6",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Api.delete(`/api/reviews/${reviewId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          setRecipe((prevRecipe) => ({            
            ...prevRecipe,
            reviews: prevRecipe.reviews.filter(
              (review) => (review.user_id !== user?.ID && review.ID !== reviewId) || review.user_id === user?.ID
            )
          }));
          // Clear the user review if it matches the deleted review
          if (userReview && userReview.ID === reviewId) {
            setUserReview(null);
          }
  
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your review has been deleted.",
            confirmButtonText: "OK",
            confirmButtonColor: "#3FA2F6",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
          console.log("Review deleted successfully");
        } else if (result.isDenied) {
          console.log("Review deletion cancelled");          
        } else {
          console.log("Review deletion cancelled");
        }
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };  

  const handleReviewEditToggle = (reviewID) => {
    const review = recipe.reviews.find((rev) => rev.ID === reviewID);
    setEditContent(review.content);
    setUserReview({ ...review, isEditing: !review.isEditing });
  };

  const formatDate = (date) => {
    if (!date) return "Invalid date";
    try {
      const parsedDate = parseISO(date);
      return format(parsedDate, "EEEE, dd MMMM yyyy", {locale: idLocale});
    } catch (error) {
      return "Invalid date";
    }
  };

  const getTimeAgo = (date) => {
    if (!date) return "Invalid date";
    try {
      const parsedDate = new Date(date);
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  if (!recipe) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto mt-12 px-4 py-8 md:px-8 md:py-16 text-center md:text-left dark:bg-gray-950 dark:text-white dark:border-zinc-50">
      <h1 className="text-4xl font-bold mb-8">{recipe.title}</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        <div className="relative md:w-1/2">
          {recipe.images.length > 0 && (
            <div className="relative overflow-hidden">
              <div className="carousel relative w-full">
                <div className="carousel-slides self-center" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {recipe.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`${recipe.title} ${index}`}
                      className="min-w-full object-fill rounded-lg"
                    />
                  ))}
                </div>
                <button className="carousel-button prev" onClick={() => handleSlideChange('prev')}>
                  <FaChevronLeft size={30} />
                </button>
                <button className="carousel-button next" onClick={() => handleSlideChange('next')}>
                  <FaChevronRight size={30} />
                </button>
                <p className="text-sm justify-center text-center mb-2 mt-2 left-0">{currentSlide + 1}/{recipe.images.length}</p>
              </div>
              <p className="text-base justify-center text-center text-gray-500 mb-2 mt-2 left-0">Dibuat Oleh : {recipe.user.profile.full_name}, pada : {formatDate(recipe.created_at)}</p>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-semibold mb-4">Description</h2>
          <p className="text-base leading-relaxed mb-6">{recipe.description}</p>
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="text-lg mb-4 list-decimal list-inside whitespace-pre-wrap break-words">{recipe.ingredients}</ul>
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <ul className="text-lg mb-4 list-decimal list-inside whitespace-pre-wrap break-words">{recipe.instructions}</ul>
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <span key={tag.ID} className="mr-2 px-2 py-1 border-2 rounded">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <button
              onClick={() => handleFavorite(recipe.ID)}
              className={`px-4 py-2 rounded-lg text-white ${favoriteRecipes.some(fav => fav.recipe_id === recipe.ID) ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-75 transition duration-200`}
            >
              <AiFillHeart 
                size={18}
                className="inline mr-2"
              />
              {favoriteRecipes.some(fav => fav.recipe_id === recipe.ID) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>

      <hr className="my-8 border-2 border-gray-950 dark:border-white" />

      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {userReview ? (
            <div className="mb-4">
              {userReview.isEditing && (
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 border rounded-md text-black"
                    value={userReview.content}
                    onChange={(e) => setUserReview({ ...userReview, content: e.target.value })}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-black rounded-md mt-2"
                    onClick={() => handleReviewEdit(userReview.ID, userReview.content)}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <textarea
                className="w-full p-2 border rounded-md text-black"
                placeholder="Write your review..."
                rows="4"
                value={reviewContent}
                required
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
                onClick={handleReviewSubmit}
              >
                Submit
              </button>
            </div>
          )}
          {recipe.reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review this recipe!</p>
          ) : (
            <ul className="space-y-4">
              {[
                ...recipe.reviews.filter((review) => review.user_id === user?.ID),
                ...recipe.reviews.filter((review) => review.user_id !== user?.ID),
              ].map((review) => (
                <li key={review.ID} className="border-b border-gray-300 pb-4 mb-4 dark:border-gray-700">
                  {review.isEditing ? (
                    <>
                      <textarea
                        className="w-full p-2 border rounded-md text-black"
                        value={review.content}
                        onChange={(e) => handleReviewEdit(review.ID, e.target.value)}
                      />
                      <button
                        className="px-4 py-2 bg-blue-500 rounded-md mt-2"
                        onClick={() => handleReviewEdit(review.ID, review.content)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold">{review.user?.profile.full_name === user?.profile?.full_name ? "Your Review" : review.user?.profile.full_name || "Unknown User"}</p>
                      <p className="text-sm text-gray-500">{getTimeAgo(review.created_at)}</p>
                      <p className="mt-2">{review.content}</p>
                    </>
                  )}
                  {review.user_id === user?.ID && !review.isEditing && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="text-sm text-blue-500"
                        onClick={() => handleReviewEditToggle(review.ID)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm text-red-500"
                        onClick={() => handleReviewDelete(review.ID)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Other Recipes</h2>
          <div className="flex flex-col gap-4">
            {otherRecipes.map((otherRecipe) => (
              <Link
                key={otherRecipe.ID}
                to={`/recipes/${otherRecipe.ID}`}
                className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-slate-400 transition"
              >
                <img
                  src={otherRecipe.images.length > 0 ? otherRecipe.images[0].url : 'default-image-url'}
                  alt={otherRecipe.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <br />
                <h3 className="text-lg font-semibold">{otherRecipe.title}</h3>
                <p className="text-gray-600">{otherRecipe.description}</p>
              </Link>
            ))}            
          </div>
        </div>  
      </div>
    </div>
  );
};

export default RecipeDetail;

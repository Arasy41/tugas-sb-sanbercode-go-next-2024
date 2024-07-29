import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from '../service/api';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';
import AuthContext from './AuthContext';

export const CulinaryReviewContext = createContext();

export const CulinaryReviewProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    fullName: '',
    bio: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [reviews, setReviews] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const token = localStorage.getItem('token');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  const getProfile = async () => {
    if (token) {
      try {
        const response = await Api.get('/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile({
          fullName: response.data.data.full_name,
          bio: response.data.data.bio,
          avatar: response.data.data.avatar_url,
        });
        setPreviewUrl(response.data.data.avatar_url);
      } catch (error) {
        console.error("Error fetching profile:", error);        
      }
      setLoadingProfile(false);
    } else {
      console.warn("No token found");
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    } else {
      setLoadingProfile(false);
    }
  }, [user]);

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

  const handleFileChange = (file) => {
    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', profile.fullName);
    formData.append('bio', profile.bio);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    try {
      await Api.put('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = '/profile';
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error updating profile',
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <CulinaryReviewContext.Provider
      value={{
        user,
        token,
        profile,
        recipes,
        reviews,
        favoriteRecipes,
        dropdownOpen,
        menuOpen,
        loadingProfile,
        openFaq,
        setOpenFaq,
        toggleDropdown,
        toggleMenu,
        handleFavorite,
        getTimeAgo,
        handleFileChange,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </CulinaryReviewContext.Provider>
  );
};

export default CulinaryReviewContext;

import React, { useState, useEffect, useContext } from 'react';
import Api from '../../service/api';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';

const RecipeForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [images, setImages] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await Api.get('/api/tags');
        setAllTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    
    fetchTags();
  }, []);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setSearchTerm(''); // Clear search term after selection
    }
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    images.forEach((image, index) => {
      formData.append('images', image);
    });
    formData.append('tag_names', JSON.stringify(selectedTags));

    try {
      if (!token) {        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please log in to add recipes',
        });
        return;
      }
      const response = await Api.post('/api/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Recipe added successfully:', response.data);
      Swal.fire('Success', 'Recipe added successfully!', 'success');
      window.location.href = '/recipes';
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'There was an error submitting the form.', 'error');
    }
  };

  const filteredTags = allTags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Recipe Title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Recipe Description"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Ingredients</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="List of Ingredients"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Cooking Instructions"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">You can select multiple images.</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Tags</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                placeholder="Type to search tags..."
              />
              {searchTerm && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 dark:bg-gray-800 dark:border-gray-600">
                  {filteredTags.map((tag) => (
                    <li
                      key={tag.id}
                      onClick={() => handleTagSelect(tag.name)}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="text-xs text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;

import React, { useContext } from 'react';
import { BookContext } from './BookContext';
import axios from 'axios';

const FormBook = () => {
  const { formData, setFormData, fetchBooks, editIndex, setEditIndex, setCurrentPage } = useContext(BookContext);
  const API_URL = import.meta.env.VITE_BASE_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'release_year' || name === 'total_page' ? (value === '' ? '' : Number(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image_url, release_year, price, total_page } = formData;

    if (!title || !description || !image_url || !release_year || !price || !total_page) {
      alert("Semua inputan wajib diisi");
      return;
    }

    try {
      if (editIndex === null) {
        await axios.post(`${API_URL}/books`, {
          title,
          description,
          image_url,
          release_year,
          price,
          total_page,
        });
      } else {
        await axios.put(`${API_URL}/books/${books[editIndex].id}`, {
          title,
          description,
          image_url,
          release_year,
          price,
          total_page,
        });
      }
      fetchBooks();
      setFormData({ title: "", description: "", image_url: "", release_year: "", price: "", total_page: "" });
      setEditIndex(null);
      setCurrentPage('table');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container-form-ctx">
      <h2>Form Buku</h2>
      <form className="form-ctx" onSubmit={handleSubmit}>
        <div className="form-group-ctx">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group-ctx">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <div className="form-group-ctx">
          <label>Image URL:</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} />
        </div>
        <div className="form-group-ctx">
          <label>Release Year:</label>
          <input type="number" name="release_year" value={formData.release_year} onChange={handleInputChange} />
        </div>
        <div className="form-group-ctx">
          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        <div className="form-group-ctx">
          <label>Total Page:</label>
          <input type="number" name="total_page" value={formData.total_page} onChange={handleInputChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit-ctx">Submit</button>
          <button type="button" className="btn-back-ctx" onClick={() => setCurrentPage('table')}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default FormBook;

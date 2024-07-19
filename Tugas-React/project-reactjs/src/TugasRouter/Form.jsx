import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TugasRouter.css';

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    release_year: "",
    price: "",
    total_page: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  const fetchBook = async (bookId) => {
    try {
      const response = await axios.get(`${API_URL}/books/${bookId}`);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

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

    if (!isValidUrl(image_url)) {
      alert("Image URL harus berupa URL yang valid");
      return;
    }

    if (release_year < 1980 || release_year > 2021) {
      alert("Release Year harus di antara tahun 1980 dan 2021");
      return;
    }

    if (!title || !description || !image_url || !release_year || !price || !total_page) {
      alert("Semua inputan wajib diisi");
      return;
    }

    try {
      if (id) {
        await axios.put(`${API_URL}/books/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/books`, formData);
      }
      navigate('/tugas-router');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="container-form-route">
      <h2>{id ? "Edit Buku" : "Tambah Buku"}</h2>
      <form onSubmit={handleSubmit} className="form-crud-route">
        <div className="form-group-route">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group-route">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <div className="form-group-route">
          <label>Image URL:</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} />
        </div>
        <div className="form-group-route">
          <label>Release Year:</label>
          <input type="number" name="release_year" value={formData.release_year} onChange={handleInputChange} />
        </div>
        <div className="form-group-route">
          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        <div className="form-group-route">
          <label>Total Page:</label>
          <input type="number" name="total_page" value={formData.total_page} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn-submit-route">Submit</button>
      </form>
    </div>
  );
};

export default Form;

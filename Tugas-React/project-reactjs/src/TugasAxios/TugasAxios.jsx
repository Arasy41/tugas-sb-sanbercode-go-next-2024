import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const TugasAxios = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    release_year: "",
    price: "",
    total_page: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const API_URL = import.meta.env.VITE_BASE_API_URL

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      console.log('API Response:', response.data);
      setBooks(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const handleEdit = (index) => {
    setFormData(books[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${API_URL}/books/${books[index].id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container-crud">
      <h1>Daftar Buku</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Release Year</th>
            <th>Price</th>
            <th>Total Page</th>
            <th>Thickness</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td><img src={book.image_url} alt={book.title} width="50" /></td>
              <td>{book.release_year}</td>
              <td>{book.price}</td>
              <td>{book.total_page}</td>
              <td>{book.thickness}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-form">
        <h2>Form Buku</h2>
        <form onSubmit={handleSubmit} className="form-crud">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Release Year:</label>
            <input type="number" name="release_year" value={formData.release_year} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Total Page:</label>
            <input type="number" name="total_page" value={formData.total_page} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TugasAxios;
